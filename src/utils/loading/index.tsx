import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../store';

import Notifications from './notifications';
import LoadModal from './loadModal';
import LoadSnackbar from './loadSnackbar';

const mapState = (state: iRootState) => ({
  loadingModal: state.loading.loadingModal,
  loadingTitle: state.loading.loadingTitle,
  loading: state.loading.loading,
});

const mapDispatch = (dispatch: any) => ({
  cancelLoading: dispatch.loading.cancelLoading,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Loading: React.FC<connectedProps> = (props: connectedProps) => {
  const { loading, loadingModal, cancelLoading, loadingTitle } = props;

  if (loading === true) {
    return (
      <React.Fragment>
        <Notifications />
        {loadingModal ? <LoadModal cancelLoading={cancelLoading} loadingTitle={loadingTitle} /> : <LoadSnackbar />}
      </React.Fragment>
    );
  } else {
    return <Notifications />;
  }
};
export default connect(mapState, mapDispatch)(Loading);
