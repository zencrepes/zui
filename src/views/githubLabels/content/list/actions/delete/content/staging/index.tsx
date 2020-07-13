import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../../../../../../store';

import StagingTable from './table';
import StagingStart from './stagingStart';

const mapState = (state: iRootState) => ({
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateReposSelected: dispatch.githubLabels.setUpdateReposSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Staging: React.FC<connectedProps> = (props: connectedProps) => {
  return (
    <React.Fragment>
      <StagingStart />
      <StagingTable />
    </React.Fragment>
  );
};
export default connect(mapState, mapDispatch)(Staging);
