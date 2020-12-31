import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  updateTabIfDifferent: dispatch.testingRuns.updateTabIfDifferent,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const UrlListener: React.FC<connectedProps> = (props: connectedProps) => {
  const { updateTabIfDifferent, location } = props;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') !== undefined && params.get('tab') !== null) {
      updateTabIfDifferent(params.get('tab'));
    }
  });

  return null;
};

export default withRouter(connect(null, mapDispatch)(UrlListener));
