import { TransactionMeta } from '@metamask/transaction-controller';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConfirmInfoRow,
  ConfirmInfoRowText,
} from '../../../../../../../components/app/confirm/info/row';
import {
  Box,
  Icon,
  IconName,
} from '../../../../../../../components/component-library';
import Tooltip from '../../../../../../../components/ui/tooltip';
import {
  BlockSize,
  BorderColor,
  IconColor,
} from '../../../../../../../helpers/constants/design-system';
import { useCopyToClipboard } from '../../../../../../../hooks/useCopyToClipboard';
import { useI18nContext } from '../../../../../../../hooks/useI18nContext';
import {
  currentConfirmationSelector,
  getCustomNonceValue,
  getNextSuggestedNonce,
  getUseNonceField,
} from '../../../../../../../selectors';
import {
  getNextNonce,
  showModal,
  updateCustomNonce,
} from '../../../../../../../store/actions';
import { useKnownMethodDataInTransaction } from '../../hooks/known-method-data-in-transaction';

// TODO(Pedro): Localization
// TODO(Pedro): Unit test for advanced details

export const AdvancedDetails = () => {
  return (
    <>
      <NonceDetails />
      <DataDetails />
      <HexDetails />
    </>
  );
};

const NonceDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNextNonce());
  }, [dispatch]);

  const useNonceField = useSelector(getUseNonceField);
  const nextNonce = useSelector(getNextSuggestedNonce);
  const customNonceValue = useSelector(getCustomNonceValue);

  const openEditNonceModal = () =>
    dispatch(
      showModal({
        name: 'CUSTOMIZE_NONCE',
        useNonceField,
        nextNonce,
        customNonceValue,
        updateCustomNonce: (value: string) => {
          dispatch(updateCustomNonce(value));
        },
        getNextNonce,
      }),
    );

  const displayedNonce = customNonceValue || nextNonce;

  return (
    <Box padding={2}>
      <ConfirmInfoRow label={'Nonce'} tooltip={'Nonce tooltip text'}>
        <ConfirmInfoRowText
          text={`${displayedNonce}`}
          onEditCallback={() => openEditNonceModal()}
        />
      </ConfirmInfoRow>
    </Box>
  );
};

const DataDetails = () => {
  const currentConfirmation = useSelector(
    currentConfirmationSelector,
  ) as TransactionMeta;

  const { knownMethodData } =
    useKnownMethodDataInTransaction(currentConfirmation);

  if (!knownMethodData?.name) {
    return null;
  }

  const getMethodDataString = (rawMethodData: {
    name: string;
    params: { type: string }[];
  }): string => {
    const paramsStr = rawMethodData.params.map((param) => param.type).join(',');
    const result = `FUNCTION TYPE: ${rawMethodData.name} (${paramsStr})`;

    return result;
  };

  const methodDataString = getMethodDataString(knownMethodData);

  return (
    <>
      <Divider />
      <Box padding={2}>
        <ConfirmInfoRow label={'Data'} tooltip={'Data tooltip text'}>
          <ConfirmInfoRowText text={methodDataString} />
        </ConfirmInfoRow>
      </Box>
    </>
  );
};

const HexDetails = () => {
  const t = useI18nContext();

  const currentConfirmation = useSelector(
    currentConfirmationSelector,
  ) as TransactionMeta;

  const [copied, handleCopy] = useCopyToClipboard();

  if (!currentConfirmation?.txParams?.data) {
    return null;
  }

  return (
    <>
      <Divider />
      <Box padding={2}>
        <ConfirmInfoRow label={'Hex'} tooltip={'Hex tooltip text'}>
          <ConfirmInfoRowText text={currentConfirmation.txParams.data || ''} />
        </ConfirmInfoRow>

        <Tooltip position="right" title={copied ? t('copiedExclamation') : ''}>
          <button
            onClick={() => {
              (handleCopy as (text: string) => void)?.(
                currentConfirmation.txParams.data || '',
              );
            }}
            className="copy-raw-data__button"
          >
            <div className="copy-raw-data__icon">
              <Icon
                name={copied ? IconName.CopySuccess : IconName.Copy}
                color={IconColor.iconDefault}
              />
            </div>
            <div className="copy-raw-data__label">
              {t('copyRawTransactionData')}
            </div>
          </button>
        </Tooltip>
      </Box>
    </>
  );
};

const Divider = () => (
  <Box
    borderColor={BorderColor.borderMuted}
    borderWidth={1}
    width={BlockSize.Full}
  />
);
