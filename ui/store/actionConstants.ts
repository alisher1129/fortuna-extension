export const GO_HOME = 'GO_HOME';
// modal state
export const MODAL_OPEN = 'UI_MODAL_OPEN';
export const MODAL_CLOSE = 'UI_MODAL_CLOSE';
export const SET_CONFIRMATION_EXCHANGE_RATES =
  'SET_CONFIRMATION_EXCHANGE_RATES';
// alert state
export const ALERT_OPEN = 'UI_ALERT_OPEN';
export const ALERT_CLOSE = 'UI_ALERT_CLOSE';
export const QR_CODE_DETECTED = 'UI_QR_CODE_DETECTED';
// network dropdown open
export const NETWORK_DROPDOWN_OPEN = 'UI_NETWORK_DROPDOWN_OPEN';
export const NETWORK_DROPDOWN_CLOSE = 'UI_NETWORK_DROPDOWN_CLOSE';
export const IMPORT_NFTS_MODAL_OPEN = 'UI_IMPORT_NFTS_MODAL_OPEN';
export const IMPORT_NFTS_MODAL_CLOSE = 'UI_IMPORT_NFTS_MODAL_CLOSE';
export const SHOW_IPFS_MODAL_OPEN = 'UI_IPFS_MODAL_OPEN';
export const SHOW_IPFS_MODAL_CLOSE = 'UI_IPFS_MODAL_CLOSE';
export const IMPORT_TOKENS_POPOVER_OPEN = 'UI_IMPORT_TOKENS_POPOVER_OPEN';
export const IMPORT_TOKENS_POPOVER_CLOSE = 'UI_IMPORT_TOKENS_POPOVER_CLOSE';

// remote state
export const UPDATE_METAMASK_STATE = 'UPDATE_METAMASK_STATE';
export const SELECTED_ADDRESS_CHANGED = 'SELECTED_ADDRESS_CHANGED';
export const SELECTED_ACCOUNT_CHANGED = 'SELECTED_ACCOUNT_CHANGED';
export const ACCOUNT_CHANGED = 'ACCOUNT_CHANGED';
export const CHAIN_CHANGED = 'CHAIN_CHANGED';
export const ADDRESS_BOOK_UPDATED = 'ADDRESS_BOOK_UPDATED';
export const GAS_FEE_ESTIMATES_UPDATED = 'GAS_FEE_ESTIMATES_UPDATED';
export const CLOSE_WELCOME_SCREEN = 'CLOSE_WELCOME_SCREEN';
// unlock screen
export const UNLOCK_IN_PROGRESS = 'UNLOCK_IN_PROGRESS';
export const UNLOCK_FAILED = 'UNLOCK_FAILED';
export const UNLOCK_SUCCEEDED = 'UNLOCK_SUCCEEDED';
export const LOCK_METAMASK = 'LOCK_METAMASK';
// error handling
export const DISPLAY_WARNING = 'DISPLAY_WARNING';
export const HIDE_WARNING = 'HIDE_WARNING';
export const CAPTURE_SINGLE_EXCEPTION = 'CAPTURE_SINGLE_EXCEPTION';
// accounts screen
export const SHOW_ACCOUNTS_PAGE = 'SHOW_ACCOUNTS_PAGE';
export const SHOW_CONF_TX_PAGE = 'SHOW_CONF_TX_PAGE';
// account detail screen
export const SHOW_SEND_TOKEN_PAGE = 'SHOW_SEND_TOKEN_PAGE';
export const SHOW_PRIVATE_KEY = 'SHOW_PRIVATE_KEY';
export const SET_ACCOUNT_LABEL = 'SET_ACCOUNT_LABEL';
export const CLEAR_ACCOUNT_DETAILS = 'CLEAR_ACCOUNT_DETAILS';
export const SET_ACCOUNT_DETAILS_ADDRESS = 'SET_ACCOUNT_DETAILS_ADDRESS';
// tx conf screen
export const COMPLETED_TX = 'COMPLETED_TX';
export const TRANSACTION_ERROR = 'TRANSACTION_ERROR';
export const UPDATE_TRANSACTION_PARAMS = 'UPDATE_TRANSACTION_PARAMS';
export const SET_NEXT_NONCE = 'SET_NEXT_NONCE';
// config screen
export const SET_HARDWARE_WALLET_DEFAULT_HD_PATH =
  'SET_HARDWARE_WALLET_DEFAULT_HD_PATH';
// loading overlay
export const SHOW_LOADING = 'SHOW_LOADING_INDICATION';
export const HIDE_LOADING = 'HIDE_LOADING_INDICATION';

export const TOGGLE_ACCOUNT_MENU = 'TOGGLE_ACCOUNT_MENU';
export const TOGGLE_NETWORK_MENU = 'TOGGLE_NETWORK_MENU';

// deprecated network modal
export const DEPRECATED_NETWORK_POPOVER_OPEN =
  'DEPRECATED_NETWORK_POPOVER_OPEN';
export const DEPRECATED_NETWORK_POPOVER_CLOSE =
  'DEPRECATED_NETWORK_POPOVER_CLOSE';

// preferences
export const UPDATE_CUSTOM_NONCE = 'UPDATE_CUSTOM_NONCE';

export const SET_PARTICIPATE_IN_METAMETRICS = 'SET_PARTICIPATE_IN_METAMETRICS';

// locale
export const SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE';

// Onboarding
export const COMPLETE_ONBOARDING = 'COMPLETE_ONBOARDING';
export const ONBOARDED_IN_THIS_UI_SESSION = 'ONBOARDED_IN_THIS_UI_SESSION';

// Ledger

export const SET_WEBHID_CONNECTED_STATUS = 'SET_WEBHID_CONNECTED_STATUS';
export const SET_LEDGER_TRANSPORT_STATUS = 'SET_LEDGER_TRANSPORT_STATUS';

// Network
export const SET_PENDING_TOKENS = 'SET_PENDING_TOKENS';
export const CLEAR_PENDING_TOKENS = 'CLEAR_PENDING_TOKENS';

export const SET_FIRST_TIME_FLOW_TYPE = 'SET_FIRST_TIME_FLOW_TYPE';

export const SET_SELECTED_NETWORK_CONFIGURATION_ID =
  'SET_SELECTED_NETWORK_CONFIGURATION_ID';
export const SET_NEW_NETWORK_ADDED = 'SET_NEW_NETWORK_ADDED';

export const SET_NEW_NFT_ADDED_MESSAGE = 'SET_NEW_NFT_ADDED_MESSAGE';
export const SET_REMOVE_NFT_MESSAGE = 'SET_REMOVE_NFT_MESSAGE';

export const LOADING_METHOD_DATA_STARTED = 'LOADING_METHOD_DATA_STARTED';
export const LOADING_METHOD_DATA_FINISHED = 'LOADING_METHOD_DATA_FINISHED';

export const SET_REQUEST_ACCOUNT_TABS = 'SET_REQUEST_ACCOUNT_TABS';
export const SET_OPEN_METAMASK_TAB_IDS = 'SET_OPEN_METAMASK_TAB_IDS';

// Home Screen
export const HIDE_WHATS_NEW_POPUP = 'HIDE_WHATS_NEW_POPUP';
export const TOGGLE_GAS_LOADING_ANIMATION = 'TOGGLE_GAS_LOADING_ANIMATION';

// Smart Transactions
export const SET_SMART_TRANSACTIONS_ERROR = 'SET_SMART_TRANSACTIONS_ERROR';
export const DISMISS_SMART_TRANSACTIONS_ERROR_MESSAGE =
  'DISMISS_SMART_TRANSACTIONS_ERROR_MESSAGE';

export const TOGGLE_CURRENCY_INPUT_SWITCH = 'TOGGLE_CURRENCY_INPUT_SWITCH';

// Token detection v2
export const SET_NEW_TOKENS_IMPORTED = 'SET_NEW_TOKENS_IMPORTED';

export const SET_NEW_TOKENS_IMPORTED_ERROR = 'SET_NEW_TOKENS_IMPORTED_ERROR';

// Token allowance
export const SET_CUSTOM_TOKEN_AMOUNT = 'SET_CUSTOM_TOKEN_AMOUNT';

///: BEGIN:ONLY_INCLUDE_IF(desktop)
export const FORCE_DISABLE_DESKTOP = 'FORCE_DISABLE_DESKTOP';
///: END:ONLY_INCLUDE_IF

///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
export const SHOW_KEYRING_SNAP_REMOVAL_RESULT =
  'SHOW_KEYRING_SNAP_REMOVAL_RESULT';
export const HIDE_KEYRING_SNAP_REMOVAL_RESULT =
  'HIDE_KEYRING_SNAP_REMOVAL_RESULT';
///: END:ONLY_INCLUDE_IF