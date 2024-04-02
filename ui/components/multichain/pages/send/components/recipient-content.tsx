import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BannerAlert,
  BannerAlertSeverity,
  Box,
} from '../../../../component-library';
import { getSendHexDataFeatureFlagState } from '../../../../../ducks/metamask/metamask';
import {
  Asset,
  acknowledgeRecipientWarning,
  getCurrentDraftTransaction,
  getSendAsset,
} from '../../../../../ducks/send';
import { AssetType } from '../../../../../../shared/constants/transaction';
import { CONTRACT_ADDRESS_LINK } from '../../../../../helpers/constants/common';
import { Display } from '../../../../../helpers/constants/design-system';
import { useI18nContext } from '../../../../../hooks/useI18nContext';
import { AssetPickerAmount } from '../../..';
import { SendHexData, SendPageRow } from '.';

export const SendPageRecipientContent = ({
  requireContractAddressAcknowledgement,
  onAssetChange,
}: {
  requireContractAddressAcknowledgement: boolean;
  onAssetChange: (newAsset: Asset) => void;
}) => {
  const t = useI18nContext();

  // Hex data
  const showHexDataFlag = useSelector(getSendHexDataFeatureFlagState);
  const asset = useSelector(getSendAsset);
  const showHexData =
    showHexDataFlag &&
    asset &&
    asset.type !== AssetType.token &&
    asset.type !== AssetType.NFT;

  const { receiveAsset, amount } = useSelector(getCurrentDraftTransaction);

  // Gas data
  const dispatch = useDispatch();

  // FIXME: these should all be resolved before marking the PR as ready
  // TODO: SWAP+SEND impl steps (all but step 6 correlate to a PR in the merge train):
  // TODO: 1. create/add data flows for swap+send
  // TODO: 2. enable destination swap button (i.e., allow 1-to-any swaps) on send page; integrate data flows; update modals and swaps flow
  // TODO: 3. add error states
  // TODO: 4. begin design review + revisions
  //          - fix modal scroll behavior
  //          - remove background for 721/1155 images
  //          - double border weight for dropdowns
  //          - ensure all NFTs show up in modal
  //          - ensure selected token in modal is correct
  //          - limit dest options
  //          - add delay and polling
  //          - tooltips showing after upstream change
  // TODO: 5. add analytics + e2e tests
  //       - use transaction lifecycle events once
  // TODO: 6. final design and technical review + revisions
  return (
    <Box>
      {requireContractAddressAcknowledgement ? (
        <SendPageRow>
          <BannerAlert
            severity={BannerAlertSeverity.Danger}
            data-testid="send-warning"
            actionButtonLabel={t('tooltipApproveButton')}
            actionButtonOnClick={() => {
              dispatch(acknowledgeRecipientWarning());
            }}
            actionButtonProps={{ display: Display.Block, marginTop: 4 }}
          >
            {t('sendingToTokenContractWarning', [
              <a
                key="contractWarningSupport"
                target="_blank"
                rel="noopener noreferrer"
                className="send__warning-container__link"
                href={CONTRACT_ADDRESS_LINK}
              >
                {t('learnMoreUpperCase')}
              </a>,
            ])}
          </BannerAlert>
        </SendPageRow>
      ) : null}
      <SendPageRow>
        <AssetPickerAmount
          asset={receiveAsset}
          onAssetChange={onAssetChange}
          amount={amount} // TODO - this should be the amount of the asset being sent
        />
      </SendPageRow>
      {showHexData ? <SendHexData /> : null}
    </Box>
  );
};