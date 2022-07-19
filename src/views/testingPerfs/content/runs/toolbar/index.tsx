import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import SelectRun from './selectRun';
import PreviousRun from './previousRun';
import NextRun from './nextRun';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  availableRuns: state.testingPerfs.availableRuns,
  selectedRunId: state.testingPerfs.selectedRunId,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRunId: dispatch.testingPerfs.setSelectedRunId,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Toolbar: React.FC<connectedProps> = (props: connectedProps) => {
  const { availableRuns, selectedRunId, setSelectedRunId } = props;

  if (availableRuns.length === 0 || selectedRunId === '') {
    return null;
  }

  const selectedRunIdx = availableRuns.findIndex((a: any) => a.id === selectedRunId);
  const previousRun = selectedRunIdx === 0 ? null : availableRuns[selectedRunIdx - 1].id;
  const nextRun = selectedRunIdx === availableRuns.length - 1 ? null : availableRuns[selectedRunIdx + 1].id;

  return (
    <Grid container spacing={3} direction="row" justify="center" alignItems="center">
      <Grid item>
        <PreviousRun previousRun={previousRun} setSelectedRunId={setSelectedRunId} />
      </Grid>
      <Grid item>
        <SelectRun availableRuns={availableRuns} selectedRunId={selectedRunId} setSelectedRunId={setSelectedRunId} />
      </Grid>
      <Grid item>
        <NextRun nextRun={nextRun} setSelectedRunId={setSelectedRunId} />
      </Grid>
    </Grid>
  );
};

export default connect(mapState, mapDispatch)(Toolbar);
