import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import RemainingBy from './remainingBy';
import CurrentCompletion from './currentCompletion';
import Controls from './controls';
import Description from './description';
import Burndown from './burndown';
import Velocity from './velocity';
import Forecast from './forecast';
import List from './list';
import Columns from './columns';
import Labels from './labels';
import Assignees from './assignees';
import GetWeeklyVelocity from './data/getWeeklyVelocity';
import GetDailyVelocity from './data/getDailyVelocity';
import GetTeams from './data/getTeams';

import { TableConfig } from '../../../../global';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

interface Props {
  tableConfig: TableConfig;
}

const Deliver: React.FC<Props> = (props: Props) => {
  const { tableConfig } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <GetWeeklyVelocity />
      <GetDailyVelocity />
      <GetTeams />
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={9}>
          <Description />
        </Grid>
        <Grid item xs={3}>
          <Controls />
        </Grid>
        <Grid item xs={4}>
          <CurrentCompletion />
        </Grid>
        <Grid item xs={4}>
          <RemainingBy />
        </Grid>
        <Grid item xs={4}>
          <Forecast />
        </Grid>
        <Grid item xs={6}>
          <Burndown />
        </Grid>
        <Grid item xs={6}>
          <Velocity />
        </Grid>
        <Grid item xs={12}>
          <List tableConfig={tableConfig} />
        </Grid>
        <Grid item xs={4}>
          <Columns />
        </Grid>
        <Grid item xs={4}>
          <Labels />
        </Grid>
        <Grid item xs={4}>
          <Assignees />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Deliver;
