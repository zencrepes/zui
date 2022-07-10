import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import SelectRun from './selectRun';
import PreviousRun from './previousRun';
import NextRun from './nextRun';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  runs: state.testingPerfs.runs,
  selectedRun: state.testingPerfs.selectedRun,
});

const mapDispatch = (dispatch: any) => ({
  setSelectedRun: dispatch.testingPerfs.setSelectedRun,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Toolbar: React.FC<connectedProps> = (props: connectedProps) => {
  const { runs, selectedRun, setSelectedRun } = props;

  if (runs.length === 0 || selectedRun.length === 0) {
    return null;
  }

  const selectedRunIdx = runs.findIndex((a: any) => a.id === selectedRun.id);
  const previousRun = selectedRunIdx === 0 ? null : runs[selectedRunIdx - 1];
  const nextRun = selectedRunIdx === runs.length - 1 ? null : runs[selectedRunIdx + 1];

  return (
    <Grid container spacing={3} direction="row" justify="center" alignItems="center">
      <Grid item>
        <PreviousRun previousRun={previousRun} setSelectedRun={setSelectedRun} />
      </Grid>
      <Grid item>
        <SelectRun availableRuns={runs} selectedRun={selectedRun} setSelectedRun={setSelectedRun} />
      </Grid>
      <Grid item>
        <NextRun nextRun={nextRun} setSelectedRun={setSelectedRun} />
      </Grid>
    </Grid>
  );
};

export default connect(mapState, mapDispatch)(Toolbar);
