import React from 'react';
import { useSelector } from 'react-redux';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { BannerAlert, BannerAlertSeverity } from '../../component-library';
import { isSelectedInternalAccountEth } from '../../../selectors';
import { AccountOverviewEth } from './account-overview-eth';

export type AccountOverviewOptions = {
  onTabClick: (tabName: string) => void;
  setBasicFunctionalityModalOpen: () => void;
  onSupportLinkClick: () => void;
  useExternalServices: boolean;
  defaultHomeActiveTabName: string;
};

export const AccountOverview = (options: AccountOverviewOptions) => {
  const t = useI18nContext();

  const isEth = useSelector(isSelectedInternalAccountEth);

  const { useExternalServices, setBasicFunctionalityModalOpen } = options;

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
      {isEth && <AccountOverviewEth {...options}></AccountOverviewEth>}
    </>
  );
};
