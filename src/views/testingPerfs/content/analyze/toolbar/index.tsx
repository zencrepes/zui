import React from 'react';

import Grid from '@material-ui/core/Grid';
import SelectRun from './selectRun';
import PreviousRun from './previousRun';
import NextRun from './nextRun';

interface Run {
  id: string;
  name: string;
  startedAt: string;
}

interface Props {
  availableRuns: Run[];
  setSelectedRunId: (value: string) => void;
  selectedRunId: string;
}

const Toolbar: React.FC<Props> = (props: Props) => {
  const { availableRuns, setSelectedRunId, selectedRunId } = props;

  const currentRunId = availableRuns.findIndex((a) => a.id === selectedRunId);
  const previousRun = currentRunId === 0 ? null : availableRuns[currentRunId - 1];
  const nextRun = currentRunId === availableRuns.length - 1 ? null : availableRuns[currentRunId + 1];

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

export default Toolbar;
