import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Dataset from './dataset';
import ComparisonTable from './comparisonTable';

import Queries from './data/queries';
import Profiles from './data/profiles';
import Config from './config';
import Reference from './reference';
import Comparison from './comparison';
import Loading from './loading';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const Compare: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Queries />
      <Profiles />
      <Config />
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Dataset />
        </Grid>
        <Grid item xs={12}>
          <Loading />
        </Grid>
        <Grid item xs={12}>
          <ComparisonTable />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={6}>
              <Reference />
            </Grid>
            <Grid item xs={6}>
              <Comparison />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Compare;
