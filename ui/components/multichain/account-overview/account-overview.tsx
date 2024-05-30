import React from 'react';
import { EthOverview } from '../../../components/app/wallet-overview';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  BannerAlert,
  BannerAlertSeverity,
} from '../../../components/component-library';
import { AccountOverviewTabs } from './account-overview-tabs';

export type AccountOverviewOptions = {
  onTabClick: (tabName: string) => void;
  setBasicFunctionalityModalOpen: () => void;
  onSupportLinkClick: () => void;
  useExternalServices: boolean;
  defaultHomeActiveTabName: string;
};

export const AccountOverview = (options: AccountOverviewOptions) => {
  const t = useI18nContext();

  const {
    onTabClick,
    onSupportLinkClick,
    defaultHomeActiveTabName,
    useExternalServices,
    setBasicFunctionalityModalOpen,
  } = options;

  const showTokens = true;
  const showNfts = true;
  const showActivity = true;

  return (
    <>
      {useExternalServices ? null : (
        <BannerAlert
          margin={4}
          marginBottom={0}
          severity={BannerAlertSeverity.Danger}
          actionButtonLabel={t('basicConfigurationBannerCTA')}
          actionButtonOnClick={() => {
            setBasicFunctionalityModalOpen();
          }}
          title={t('basicConfigurationBannerTitle')}
        ></BannerAlert>
      )}
      <div className="home__balance-wrapper">
        {
          ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask,build-mmi)
          <EthOverview showAddress />
          ///: END:ONLY_INCLUDE_IF
        }
      </div>

      <AccountOverviewTabs
        onTabClick={onTabClick}
        onSupportLinkClick={onSupportLinkClick}
        defaultHomeActiveTabName={defaultHomeActiveTabName}
        showTokens={showTokens}
        showNfts={showNfts}
        showActivity={showActivity}
      ></AccountOverviewTabs>
    </>
  );
};
