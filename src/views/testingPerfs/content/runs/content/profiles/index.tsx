import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../../../../store';

import ProfilesChart from './profilesChart';
import ProfilesDetailsChart from './profilesDetailsChart';
import ProfilesTable from './profilesTable';

const mapState = (state: iRootState) => ({
  selectedRunData: state.testingPerfs.selectedRunData,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRunData: dispatch.testingPerfs.setSelectedRunData,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Profiles: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedRunData } = props;

  if (selectedRunData === undefined || selectedRunData === null || Object.keys(selectedRunData).length === 0) {
    return null;
  }

  return (
    <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
      <Grid item xs={12}>
        <ProfilesChart run={selectedRunData} />
      </Grid>
      <Grid item xs={12}>
        <ProfilesTable run={selectedRunData} />
      </Grid>
      <Grid item xs={12}>
        <ProfilesDetailsChart run={selectedRunData} />
      </Grid>
    </Grid>
  );
};

export default connect(mapState, mapDispatch)(Profiles);
