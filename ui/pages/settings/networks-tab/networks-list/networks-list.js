import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { useI18nContext } from '../../../../hooks/useI18nContext';
// import CustomContentSearch from '../custom-content-search';
// import {
//   Color,
//   TextVariant,
// } from '../../../../helpers/constants/design-system';
import NetworksListItem from '../networks-list-item';
// import { Text } from '../../../../components/component-library';

const NetworksList = ({
  networkIsSelected,
  networksToRender,
  networkDefaultedToProvider,
  selectedNetworkConfigurationId,
}) => {
  // const t = useI18nContext();
  const [searchedNetworks, setSearchedNetworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchedNetworksToRender =
    searchedNetworks.length === 0 && searchQuery === ''
      ? networksToRender
      : searchedNetworks;
  // Real Code
  // const searchedNetworksToRenderThatAreNotTestNetworks =
  // searchedNetworksToRender.filter((network) => !network.isATestNetwork);
  // Vaival just add condition for linea mainnet
  const searchedNetworksToRenderThatAreNotTestNetworks =
    searchedNetworksToRender.filter(
      (network) => !network.isATestNetwork && network.chainId !== '0xe708',
    );
  //End

  // const searchedNetworksToRenderThatAreTestNetworks =
  //   searchedNetworksToRender.filter((network) => network.isATestNetwork);

  return (
    <div
      className={classnames('networks-tab__networks-list', {
        'networks-tab__networks-list--selection':
          networkIsSelected && !networkDefaultedToProvider,
      })}
    >

      {searchedNetworksToRenderThatAreNotTestNetworks.map((network, _) => (
        <NetworksListItem
          key={`settings-network-list:${network.rpcUrl}`}
          network={network}
          networkIsSelected={networkIsSelected}
          selectedNetworkConfigurationId={selectedNetworkConfigurationId}
          setSearchQuery={setSearchQuery}
          setSearchedNetworks={setSearchedNetworks}
        />
      ))}


    </div>
  );
};

NetworksList.propTypes = {
  networkDefaultedToProvider: PropTypes.bool,
  networkIsSelected: PropTypes.bool,
  networksToRender: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedNetworkConfigurationId: PropTypes.string,
};

export default NetworksList;
