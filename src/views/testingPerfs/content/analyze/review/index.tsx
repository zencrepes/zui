import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RunsTable from './runsTable';
import RunsChart from './runsChart';
import RunsDetailsChart from './runsDetailsChart';
import ResourcesTable from './resourcesTable';

const GQL_QUERY = loader('./getRunById.graphql');

interface Props {
  selectedRunId: string;
}

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const Review: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { selectedRunId } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      selectedRunId: selectedRunId,
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined && data.testingPerfs.data.item !== undefined && selectedRunId !== '') {
    const perfRun = data.testingPerfs.data.item;
    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {perfRun.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {format(parseISO(perfRun.startedAt), 'LLL do yyyy HH:mm')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={6} style={{ textAlign: 'left' }}>
              <ResourcesTable run={perfRun} />
            </Grid>
            <Grid item xs={6}>
              <RunsChart run={perfRun} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <RunsTable run={perfRun} />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <RunsDetailsChart run={perfRun} />
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default Review;
