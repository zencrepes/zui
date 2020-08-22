import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { iRootState } from '../../../../store';

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
  defaultPoints: state.githubIssues.defaultPoints,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;
const Plan: React.FC<connectedProps> = (props: connectedProps) => {
  console.log(props);
  return <span>Displays roadmap details (projects / milestones)</span>;
};

export default withRouter(connect(mapState, mapDispatch)(Plan));
