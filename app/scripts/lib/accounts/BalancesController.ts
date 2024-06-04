import { type AccountsControllerListAccountsAction } from '@metamask/accounts-controller';
import { JsonRpcRequest } from '@metamask/utils';
import {
  BaseController,
  type ControllerGetStateAction,
  type ControllerStateChangeEvent,
  type RestrictedControllerMessenger,
} from '@metamask/base-controller';
import {
  InternalAccount,
  KeyringRpcMethod,
  type Balance,
  type CaipAssetType,
} from '@metamask/keyring-api';
import type { HandleSnapRequest } from '@metamask/snaps-controllers';
import type { SnapId } from '@metamask/snaps-sdk';
import { HandlerType } from '@metamask/snaps-utils';
import type { Draft } from 'immer';
import { v4 as uuid } from 'uuid';
import { Poller } from './Poller';

const controllerName = 'BalancesController';

/**
 * State used by the {@link BalancesController} to cache account balances.
 */
export type BalancesControllerState = {
  balances: {
    [account: string]: {
      [asset: string]: {
        amount: string;
        unit: string;
      };
    };
  };
};

/**
 * Default state of the {@link BalancesController}.
 */
const defaultState: BalancesControllerState = { balances: {} };

/**
 * Returns the state of the {@link BalancesController}.
 */
export type GetBalancesControllerState = ControllerGetStateAction<
  typeof controllerName,
  BalancesControllerState
>;

/**
 * Returns the balances of an account.
 */
export type GetBalances = {
  type: `${typeof controllerName}:getBalances`;
  handler: BalancesController['getBalances'];
};

/**
 * Event emitted when the state of the {@link BalancesController} changes.
 */
export type BalancesControllerStateChange = ControllerStateChangeEvent<
  typeof controllerName,
  BalancesControllerState
>;

/**
 * Actions exposed by the {@link BalancesController}.
 */
export type BalancesControllerActions =
  | GetBalancesControllerState
  | GetBalances;

/**
 * Events emitted by {@link BalancesController}.
 */
export type BalancesControllerEvents = BalancesControllerStateChange;

/**
 * Actions that this controller is allowed to call.
 */
export type AllowedActions =
  | HandleSnapRequest
  | AccountsControllerListAccountsAction;

/**
 * Messenger type for the BalancesController.
 */
export type BalancesControllerMessenger = RestrictedControllerMessenger<
  typeof controllerName,
  BalancesControllerActions | AllowedActions,
  BalancesControllerEvents,
  AllowedActions['type'],
  never
>;

/**
 * {@link BalancesController}'s metadata.
 *
 * This allows us to choose if fields of the state should be persisted or not
 * using the `persist` flag; and if they can be sent to Sentry or not, using
 * the `anonymous` flag.
 */
const balancesControllerMetadata = {
  balances: {
    persist: true,
    anonymous: false,
  },
};

const ASSETS_LIST = ['bip122:000000000019d6689c085ae165831e93/slip44:0'];

/**
 * The BalancesController is responsible for fetching and caching account
 * balances.
 */
export class BalancesController extends BaseController<
  typeof controllerName,
  BalancesControllerState,
  BalancesControllerMessenger
> {
  #poller: Poller;

  constructor({
    messenger,
    state,
  }: {
    messenger: BalancesControllerMessenger;
    state: BalancesControllerState;
  }) {
    super({
      messenger,
      name: controllerName,
      metadata: balancesControllerMetadata,
      state: {
        ...defaultState,
        ...state,
      },
    });

    this.#poller = new Poller(() => this.#updateBalances(), 1000);
    this.#poller.start();
  }

  async #listAccounts(): Promise<InternalAccount[]> {
    return await this.messagingSystem.call('AccountsController:listAccounts');
  }

  async #updateBalances() {
    const accounts = await this.#listAccounts();
    for (const account of accounts) {
      if (account.metadata.snap) {
        this.getBalances(account.id, account.metadata.snap.id, ASSETS_LIST);
      }
    }
  }

  /**
   * Get the balances for an account.
   *
   * @param accountId - ID of the account to get balances for.
   * @param snapId - ID of the Snap which manages the account.
   * @param assetTypes - Array of asset types to get balances for.
   * @returns A map of asset types to balances.
   */
  async getBalances(
    accountId: string,
    snapId: string,
    assetTypes: CaipAssetType[],
  ): Promise<Record<CaipAssetType, Balance>> {
    const balances = (await this.#handleRequest(snapId, {
      method: KeyringRpcMethod.GetAccountBalances,
      params: {
        id: accountId,
        assets: assetTypes,
      },
    })) as Record<CaipAssetType, Balance>;

    this.update((state: Draft<BalancesControllerState>) => {
      state.balances[accountId] = {
        ...state.balances[accountId],
        ...balances,
      };
    });

    return balances;
  }

  /**
   * Call a Snap to handle a JSON-RPC request.
   *
   * @param snapId - ID of the Snap to call.
   * @param request - JSON-RPC request to execute. The fields `id` and
   * `jsonrpc` of the request can optionally be omitted.
   * @returns The JSON-RPC response from the Snap.
   */
  async #handleRequest(
    snapId: string,
    request: Omit<JsonRpcRequest, 'id' | 'jsonrpc'>,
  ) {
    return await this.messagingSystem.call('SnapController:handleRequest', {
      snapId: snapId as SnapId,
      origin: 'metamask',
      handler: HandlerType.OnRpcRequest,
      request: {
        id: uuid(),
        jsonrpc: '2.0',
        ...request,
      },
    });
  }
}
