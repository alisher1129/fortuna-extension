import React from 'react';
import { Box } from '../../component-library';
import { AccountOverviewTabs } from './account-overview-tabs';

export type AccountOverviewUnknownOptions = {
  onTabClick: (tabName: string) => void;
  onSupportLinkClick: () => void;
  defaultHomeActiveTabName: string;
};

export const AccountOverviewUnknown = (
  options: AccountOverviewUnknownOptions,
) => {
  const { onTabClick, onSupportLinkClick, defaultHomeActiveTabName } = options;

  return (
    <>
      <div className="home__balance-wrapper">
        <Box className="account-overview-unknown__empty">
          <Box className="account-overview-unknown__empty-text">
            {/* TODO: Use a localized message here! */}
            <span>Account type not supported yet!</span>
          </Box>
        </Box>
      </div>

      <AccountOverviewTabs
        onTabClick={onTabClick}
        onSupportLinkClick={onSupportLinkClick}
        defaultHomeActiveTabName={defaultHomeActiveTabName}
        showTokens={false}
        showNfts={false}
        showActivity={true}
      ></AccountOverviewTabs>
    </>
  );
};
