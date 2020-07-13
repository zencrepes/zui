import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';

import { iRootState } from '../../store';

type notificationState = {
  showNotifications: boolean;
};

const mapState = (state: iRootState) => ({
  loading: state.loading.loading,
  loadingSuccess: state.loading.loadingSuccess,
  loadingSuccessMsg: state.loading.loadingSuccessMsg,
});

const mapDispatch = (dispatch: any) => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

class Notifications extends Component<connectedProps, notificationState> {
  constructor(props: connectedProps) {
    super(props);
    this.state = {
      showNotifications: false,
    };
  }

  shouldComponentUpdate(nextProps: connectedProps) {
    if (nextProps.loading === true) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate(prevProps: connectedProps) {
    const { loading } = this.props;
    if (prevProps.loading === true && loading === false) {
      this.setState({ showNotifications: true });
      //Set timer to actually set back success to false (and remove snackbar)
      setTimeout(() => {
        this.setState({ showNotifications: false });
      }, 2000);
    }
  }

  render() {
    const { loadingSuccessMsg } = this.props;
    const { showNotifications } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showNotifications}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{loadingSuccessMsg}</span>}
        />
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(Notifications);
