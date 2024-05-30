import React from 'react';
import { EthOverview } from '../../app/wallet-overview';
import { AccountOverviewTabs } from './account-overview-tabs';

export type AccountOverviewEthOptions = {
  onTabClick: (tabName: string) => void;
  onSupportLinkClick: () => void;
  defaultHomeActiveTabName: string;
};

export const AccountOverviewEth = (options: AccountOverviewEthOptions) => {
  const { onTabClick, onSupportLinkClick, defaultHomeActiveTabName } = options;

  return (
    <>
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
        showTokens={true}
        showNfts={true}
        showActivity={true}
      ></AccountOverviewTabs>
    </>
  );
};
