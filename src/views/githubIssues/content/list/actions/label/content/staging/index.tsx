import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../../../../../../store';

import StagingTable from './table';
import StagingStart from './stagingStart';

const mapState = (state: iRootState) => ({
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Staging: React.FC<connectedProps> = () => {
  return (
    <React.Fragment>
      <StagingStart />
      <StagingTable />
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(Staging);
