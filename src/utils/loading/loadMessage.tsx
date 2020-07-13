import React from 'react';
import { connect } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';

import { iRootState } from '../../store';

const mapState = (state: iRootState) => ({
  loadingMsg: state.loading.loadingMsg,
  loadingMsgAlt: state.loading.loadingMsgAlt,
  loadingIterateCurrent: state.loading.loadingIterateCurrent,
  loadingIterateTotal: state.loading.loadingIterateTotal,
});

const mapDispatch = (dispatch: any) => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const getProgressValue = (loadingIterateTotal: number, loadingIterateCurrent: number) => {
  return Math.round((loadingIterateCurrent * 100) / loadingIterateTotal);
};

const LoadMessage: React.FC<connectedProps> = (props: connectedProps) => {
  const { loadingMsg, loadingMsgAlt, loadingIterateTotal, loadingIterateCurrent } = props;
  return (
    <React.Fragment>
      <span id="message-id">{loadingMsg}</span>
      <LinearProgress
        color="primary"
        variant="determinate"
        value={getProgressValue(loadingIterateTotal, loadingIterateCurrent)}
      />
      <span id="message-id">{loadingMsgAlt}</span>
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(LoadMessage);
