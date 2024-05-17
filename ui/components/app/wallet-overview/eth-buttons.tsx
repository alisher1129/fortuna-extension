import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory,
  ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
  useLocation,
  ///: END:ONLY_INCLUDE_IF
} from 'react-router-dom';

import { EthMethod } from '@metamask/keyring-api';
///: BEGIN:ONLY_INCLUDE_IF(build-mmi)
import {
  getMmiPortfolioEnabled,
  getMmiPortfolioUrl,
} from '../../../selectors/institutional/selectors';
///: END:ONLY_INCLUDE_IF
import { I18nContext } from '../../../contexts/i18n';
///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
import {
  BUILD_QUOTE_ROUTE,
  SEND_ROUTE,
} from '../../../helpers/constants/routes';
///: END:ONLY_INCLUDE_IF
import {
  getCurrentChainId,
  getCurrentKeyring,
  getIsBridgeChain,
  getIsBuyableChain,
  getIsSwapsChain,
  getMetaMetricsId,
  getSelectedInternalAccount,
  ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
  getSwapsDefaultToken,
  getUseExternalServices,
  ///: END:ONLY_INCLUDE_IF
} from '../../../selectors';
import Tooltip from '../../ui/tooltip';
///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
import { setSwapsFromToken } from '../../../ducks/swaps/swaps';
import { isHardwareKeyring } from '../../../helpers/utils/hardware';
///: END:ONLY_INCLUDE_IF
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
  ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
  MetaMetricsSwapsEventSource,
  ///: END:ONLY_INCLUDE_IF
} from '../../../../shared/constants/metametrics';
import { AssetType } from '../../../../shared/constants/transaction';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { startNewDraftTransaction } from '../../../ducks/send';
import {
  Display,
  IconColor,
  JustifyContent,
} from '../../../helpers/constants/design-system';
import { Box, Icon, IconName } from '../../component-library';
import IconButton from '../../ui/icon-button';
///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
import { getPortfolioUrl } from '../../../helpers/utils/portfolio';
import useRamps from '../../../hooks/experiences/useRamps';
///: END:ONLY_INCLUDE_IF

const EthButtons = () => {
  const dispatch = useDispatch();
  const t = useContext(I18nContext);
  const trackEvent = useContext(MetaMetricsContext);
  const history = useHistory();
  ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
  const location = useLocation();
  const isBridgeChain = useSelector(getIsBridgeChain);
  const isBuyableChain = useSelector(getIsBuyableChain);
  const metaMetricsId = useSelector(getMetaMetricsId);
  const keyring = useSelector(getCurrentKeyring);
  const usingHardwareWallet = isHardwareKeyring(keyring?.type);
  const defaultSwapsToken = useSelector(getSwapsDefaultToken);
  ///: END:ONLY_INCLUDE_IF
  const chainId = useSelector(getCurrentChainId);

  const account = useSelector(getSelectedInternalAccount);
  const isExternalServicesEnabled = useSelector(getUseExternalServices);
  const isSwapsChain = useSelector(getIsSwapsChain);
  const isSigningEnabled =
    account.methods.includes(EthMethod.SignTransaction) ||
    account.methods.includes(EthMethod.SignUserOperation);

  const buttonTooltips = {
    buyButton: [
      ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
      { condition: !isBuyableChain, message: '' },
      ///: END:ONLY_INCLUDE_IF
      { condition: !isSigningEnabled, message: 'methodNotSupported' },
    ],
    sendButton: [
      { condition: !isSigningEnabled, message: 'methodNotSupported' },
    ],
    swapButton: [
      { condition: !isSwapsChain, message: 'currentlyUnavailable' },
      { condition: !isSigningEnabled, message: 'methodNotSupported' },
    ],
    bridgeButton: [
      ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
      { condition: !isBridgeChain, message: 'currentlyUnavailable' },
      ///: END:ONLY_INCLUDE_IF
      { condition: !isSigningEnabled, message: 'methodNotSupported' },
    ],
  };

  const generateTooltip = (
    buttonKey: keyof typeof buttonTooltips,
    contents: JSX.Element,
  ) => {
    const conditions = buttonTooltips[buttonKey];
    const tooltipInfo = conditions.find(({ condition }) => condition);
    if (tooltipInfo?.message) {
      return (
        <Tooltip title={t(tooltipInfo.message)} position="bottom">
          {contents}
        </Tooltip>
      );
    }
    return contents;
  };

  ///: BEGIN:ONLY_INCLUDE_IF(build-mmi)
  const mmiPortfolioEnabled = useSelector(getMmiPortfolioEnabled);
  const mmiPortfolioUrl = useSelector(getMmiPortfolioUrl);

  const portfolioEvent = () => {
    trackEvent({
      category: MetaMetricsEventCategory.Navigation,
      event: MetaMetricsEventName.MMIPortfolioButtonClicked,
    });
  };

  const stakingEvent = () => {
    trackEvent({
      category: MetaMetricsEventCategory.Navigation,
      event: MetaMetricsEventName.MMIPortfolioButtonClicked,
    });
  };

  const renderInstitutionalButtons = () => {
    return (
      <>
        <IconButton
          className="eth-overview__button"
          Icon={<Icon name={IconName.Stake} color={IconColor.primaryInverse} />}
          label={t('stake')}
          tooltipRender={null}
          onClick={() => {
            stakingEvent();
            global.platform.openTab({
              url: `${mmiPortfolioUrl}/stake`,
            });
          }}
        />
        {mmiPortfolioEnabled && (
          <IconButton
            className="eth-overview__button"
            Icon={
              <Icon name={IconName.Diagram} color={IconColor.primaryInverse} />
            }
            label={t('portfolio')}
            tooltipRender={null}
            onClick={() => {
              portfolioEvent();
              global.platform.openTab({
                url: mmiPortfolioUrl,
              });
            }}
          />
        )}
      </>
    );
  };
  ///: END:ONLY_INCLUDE_IF

  ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
  const { openBuyCryptoInPdapp } = useRamps();
  ///: END:ONLY_INCLUDE_IF

  return (
    <Box display={Display.Flex} justifyContent={JustifyContent.spaceEvenly}>
      {
        ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
        <IconButton
          className="eth-overview__button"
          Icon={
            <Icon name={IconName.PlusMinus} color={IconColor.primaryInverse} />
          }
          disabled={!isBuyableChain || !isSigningEnabled}
          data-testid="eth-overview-buy"
          label={t('buyAndSell')}
          onClick={() => {
            openBuyCryptoInPdapp();
            trackEvent({
              event: MetaMetricsEventName.NavBuyButtonClicked,
              category: MetaMetricsEventCategory.Navigation,
              properties: {
                location: 'Home',
                text: 'Buy',
                chain_id: chainId,
                token_symbol: defaultSwapsToken,
              },
            });
          }}
          tooltipRender={(contents: JSX.Element) =>
            generateTooltip('buyButton', contents)
          }
        />
        ///: END:ONLY_INCLUDE_IF
      }

      {
        ///: BEGIN:ONLY_INCLUDE_IF(build-mmi)
        renderInstitutionalButtons()
        ///: END:ONLY_INCLUDE_IF
      }

      <IconButton
        className="eth-overview__button"
        data-testid="eth-overview-send"
        Icon={
          <Icon
            name={IconName.Arrow2UpRight}
            color={IconColor.primaryInverse}
          />
        }
        disabled={!isSigningEnabled}
        label={t('send')}
        onClick={async () => {
          trackEvent({
            event: MetaMetricsEventName.NavSendButtonClicked,
            category: MetaMetricsEventCategory.Navigation,
            properties: {
              token_symbol: 'ETH',
              location: 'Home',
              text: 'Send',
              chain_id: chainId,
            },
          });
          await dispatch(startNewDraftTransaction({ type: AssetType.native }));
          history.push(SEND_ROUTE);
        }}
        tooltipRender={(contents: JSX.Element) =>
          generateTooltip('sendButton', contents)
        }
      />
      <IconButton
        className="eth-overview__button"
        disabled={
          !isSwapsChain || !isSigningEnabled || !isExternalServicesEnabled
        }
        Icon={
          <Icon
            name={IconName.SwapHorizontal}
            color={IconColor.primaryInverse}
          />
        }
        onClick={() => {
          ///: BEGIN:ONLY_INCLUDE_IF(build-mmi)
          global.platform.openTab({
            url: `${mmiPortfolioUrl}/swap`,
          });
          ///: END:ONLY_INCLUDE_IF

          ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
          if (isSwapsChain) {
            trackEvent({
              event: MetaMetricsEventName.NavSwapButtonClicked,
              category: MetaMetricsEventCategory.Swaps,
              properties: {
                token_symbol: 'ETH',
                location: MetaMetricsSwapsEventSource.MainView,
                text: 'Swap',
                chain_id: chainId,
              },
            });
            dispatch(setSwapsFromToken(defaultSwapsToken));
            if (usingHardwareWallet) {
              // todo 2nd and 3rd arguments?
              global.platform.openExtensionInBrowser?.(
                BUILD_QUOTE_ROUTE,
                undefined,
                false,
              );
            } else {
              history.push(BUILD_QUOTE_ROUTE);
            }
          }
          ///: END:ONLY_INCLUDE_IF
        }}
        label={t('swap')}
        data-testid="token-overview-button-swap"
        tooltipRender={(contents: JSX.Element) =>
          generateTooltip('swapButton', contents)
        }
      />
      {
        ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
        <IconButton
          className="eth-overview__button"
          disabled={!isBridgeChain || !isSigningEnabled}
          data-testid="eth-overview-bridge"
          Icon={
            <Icon name={IconName.Bridge} color={IconColor.primaryInverse} />
          }
          label={t('bridge')}
          onClick={() => {
            if (isBridgeChain) {
              const portfolioUrl = getPortfolioUrl(
                'bridge',
                'ext_bridge_button',
                metaMetricsId,
              );
              global.platform.openTab({
                url: `${portfolioUrl}${
                  location.pathname.includes('asset') ? '&token=native' : ''
                }`,
              });
              trackEvent({
                category: MetaMetricsEventCategory.Navigation,
                event: MetaMetricsEventName.BridgeLinkClicked,
                properties: {
                  location: 'Home',
                  text: 'Bridge',
                  chain_id: chainId,
                  token_symbol: 'ETH',
                },
              });
            }
          }}
          tooltipRender={(contents: JSX.Element) =>
            generateTooltip('bridgeButton', contents)
          }
        />
        ///: END:ONLY_INCLUDE_IF
      }
      {
        ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
        <IconButton
          className="eth-overview__button"
          data-testid="eth-overview-portfolio"
          Icon={
            <Icon name={IconName.Diagram} color={IconColor.primaryInverse} />
          }
          label={t('portfolio')}
          tooltipRender={null}
          onClick={() => {
            const url = getPortfolioUrl(
              '',
              'ext_portfolio_button',
              metaMetricsId,
            );
            global.platform.openTab({ url });
            trackEvent({
              category: MetaMetricsEventCategory.Navigation,
              event: MetaMetricsEventName.PortfolioLinkClicked,
              properties: {
                location: 'Home',
                text: 'Portfolio',
                chain_id: chainId,
                token_symbol: 'ETH',
              },
            });
          }}
        />
        ///: END:ONLY_INCLUDE_IF
      }
    </Box>
  );
};

export default EthButtons;