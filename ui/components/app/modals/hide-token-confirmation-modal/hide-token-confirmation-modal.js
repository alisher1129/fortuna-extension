import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import Identicon from '../../../ui/identicon';
import Button from '../../../ui/button';
import { DEFAULT_ROUTE } from '../../../../helpers/constants/routes';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../../shared/constants/metametrics';
import { getCurrentChainId } from '../../../../selectors';

function mapStateToProps(state) {
  return {
    chainId: getCurrentChainId(state),
    token: state.appState.modal.modalState.props.token,
    history: state.appState.modal.modalState.props.history,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(actions.hideModal()),
    hideToken: (address) => {
      dispatch(
        actions.ignoreTokens({
          tokensToIgnore: address,
        }),
      ).then(() => {
        dispatch(actions.hideModal());
      });
    },
  };
}

class HideTokenConfirmationModal extends Component {
  static contextTypes = {
    t: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  static propTypes = {
    hideToken: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    chainId: PropTypes.string.isRequired,
    token: PropTypes.shape({
      symbol: PropTypes.string,
      address: PropTypes.string,
      image: PropTypes.string,
    }),
    history: PropTypes.object,
  };

  state = {};

  render() {
    const { chainId, token, hideToken, hideModal, history } = this.props;
    const { symbol, address, image } = token;

    return (
      <div className="hide-token-confirmation__container">
        <div className="hide-token-confirmation__title">
          {this.context.t('hideTokenPrompt')}
        </div>
        <Identicon
          className="hide-token-confirmation__identicon"
          diameter={45}
          address={address}
          image={image}
        />
        <div className="hide-token-confirmation__symbol">{symbol}</div>
        <div className="hide-token-confirmation__copy">
          {this.context.t('readdToken')}
        </div>
        <div className="hide-token-confirmation__buttons">
          <Button
            type="secondary"
            className="hide-token-confirmation__button"
            data-testid="hide-token-confirmation__cancel"
            onClick={() => hideModal()}
          >
            {this.context.t('cancel')}
          </Button>
          <Button
            type="primary"
            className="hide-token-confirmation__button"
            data-testid="hide-token-confirmation__hide"
            onClick={() => {
              this.context.trackEvent({
                event: MetaMetricsEventName.TokenRemoved,
                category: MetaMetricsEventCategory.Tokens,
                sensitiveProperties: {
                  chain_id: chainId,
                  token_contract_address: address,
                  token_symbol: symbol,
                },
              });
              hideToken(address);
              history.push(DEFAULT_ROUTE);
            }}
          >
            {this.context.t('hide')}
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HideTokenConfirmationModal);
