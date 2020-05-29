import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import StatusPerWeek from './statusPerWeek';
import CostPerWeek from './costPerWeek';
import RuntimePerWeek from './runtimePerWeek';
import QuickNumbers from './quickNumbers';

import { iRootState } from '../../../../store';

import { sub, add } from 'date-fns';

import { createTermFilter, addFilterToQuery } from '../../../../utils/query';

const mapState = (state: iRootState) => ({
  query: state.circleciInsights.query,
});

const mapDispatch = () => ({});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const buildFilter = (weekStart: string, weekEnd: string, query: any) => {
  let updatedQuery: any = {};

  const filterFrom = createTermFilter('>=', 'started_at', weekStart);
  updatedQuery = addFilterToQuery(filterFrom, query);

  const filterTo = createTermFilter('<=', 'started_at', weekEnd);
  updatedQuery = addFilterToQuery(filterTo, updatedQuery);

  return updatedQuery;
};

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;
const Explore: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, history } = props;
  const classes = useStyles();

  const openQuery = (newQuery: any) => {
    history.push({
      pathname: '/circleciInsights',
      search: '?q=' + encodeURIComponent(JSON.stringify(newQuery)) + '&tab=' + encodeURIComponent('list'),
      state: { detail: newQuery },
    });
  };

  const openWeek = (clickedBucket: any) => {
    const weekStart = clickedBucket.label !== undefined ? clickedBucket.label : clickedBucket.keyAsString;
    const weekEnd = add(new Date(weekStart), { days: 7 }).toISOString();
    const updatedQuery = buildFilter(weekStart, weekEnd, query);
    openQuery(updatedQuery);
  };

  const openDay = (clickedBucket: any) => {
    const weekStart = clickedBucket.label !== undefined ? clickedBucket.label : clickedBucket.keyAsString;
    const weekEnd = add(new Date(weekStart), { days: 1 }).toISOString();
    const updatedQuery = buildFilter(weekStart, weekEnd, query);
    openQuery(updatedQuery);
  };

  /*
  For some unknown reason, passing a date function, as a variable of the apollo query
  Results in the query repeating over and over, therefore, moving this one level up
  */
  const sevenDaysPrior = sub(new Date(), { days: 7 }).toISOString();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <QuickNumbers query={query} sevenDaysPrior={sevenDaysPrior} openQuery={openQuery} />
      </Grid>
      <Grid item xs={12}>
        <StatusPerWeek query={query} openWeek={openDay} />
      </Grid>
      <Grid item xs={6}>
        <CostPerWeek query={query} openWeek={openWeek} />
      </Grid>
      <Grid item xs={6}>
        <RuntimePerWeek query={query} openWeek={openWeek} />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Explore));
