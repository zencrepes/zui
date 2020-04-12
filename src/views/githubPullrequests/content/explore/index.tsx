import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ClosedPerWeek from './closedPerWeek';
import OpenedDuring from './openedDuring';
import OpenedSince from './openedSince';
import QuickNumbers from './quickNumbers';
import OpenByRepo from './openByRepo';

import { iRootState } from '../../../../store';

import { sub, add } from 'date-fns';

import { createTermFilter, addFilterToQuery } from '../../../../utils/query';

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubPullrequests.defaultPoints,
  query: state.githubPullrequests.query,
});

const mapDispatch = (dispatch: any) => ({});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const buildBucketQuery = (from: Date, to: Date | null, query: any) => {
  let updatedQuery: any = {};

  const filterOpen = createTermFilter('=', 'state', 'OPEN');
  updatedQuery = addFilterToQuery(filterOpen, updatedQuery);

  const filterFrom = createTermFilter('<=', 'createdAt', from.toISOString());
  updatedQuery = addFilterToQuery(filterFrom, query);

  if (to !== null) {
    const filterTo = createTermFilter('>=', 'createdAt', to.toISOString());
    updatedQuery = addFilterToQuery(filterTo, updatedQuery);
  }

  return updatedQuery;
};

const buildByRepoQuery = (query: any) => {
  const termFilter = createTermFilter('=', 'state', 'OPEN');
  const updatedQuery = addFilterToQuery(termFilter, query);
  return updatedQuery;
};

const buildFilterWeek = (weekStart: string, weekEnd: string, query: any) => {
  let updatedQuery: any = {};

  const filterFrom = createTermFilter('<=', 'closedAt', weekStart);
  updatedQuery = addFilterToQuery(filterFrom, query);

  const filterTo = createTermFilter('>=', 'closedAt', weekEnd);
  updatedQuery = addFilterToQuery(filterTo, updatedQuery);

  return updatedQuery;
};

const Explore: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, history } = props;
  const classes = useStyles();

  const openQuery = (newQuery: any) => {
    history.push({
      pathname: '/githubPullrequests',
      search: '?q=' + encodeURIComponent(JSON.stringify(newQuery)) + '&tab=' + encodeURIComponent('list'),
      state: { detail: newQuery },
    });
  };

  const openWeek = (weekData: any) => {
    const weekStart = weekData.label;
    const weekEnd = add(new Date(weekStart), { days: 7 }).toISOString();
    const updatedQuery = buildFilterWeek(weekStart, weekEnd, query);
    openQuery(updatedQuery);
  };

  /*
  For some unknown reason, passing a date function, as a variable of the apollo query
  Results in the query repeating over and over, therefore, moving this one level up
  */
  const thirtyDaysPrior = sub(new Date(), { days: 30 }).toISOString();

  const byRepoQuery = buildByRepoQuery(query);

  const currentDate = new Date();
  const openedSinceBuckets = [
    {
      name: '0 - 1 d',
      key: 'bucketOpenSinceA',
      query: buildBucketQuery(currentDate, sub(currentDate, { days: 1 }), query),
      count: 0,
    },
    {
      name: '1 - 7 d',
      key: 'bucketOpenSinceB',
      query: buildBucketQuery(sub(currentDate, { days: 1, seconds: 1 }), sub(currentDate, { days: 7 }), query),
      count: 0,
    },
    {
      name: '1 - 2 wks',
      key: 'bucketOpenSinceC',
      query: buildBucketQuery(sub(currentDate, { days: 7, seconds: 1 }), sub(currentDate, { days: 14 }), query),
      count: 0,
    },
    {
      name: '2 - 4 wks',
      key: 'bucketOpenSinceD',
      query: buildBucketQuery(sub(currentDate, { days: 14, seconds: 1 }), sub(currentDate, { days: 28 }), query),
      count: 15,
    },
    {
      name: '1 - 3 mths',
      key: 'bucketOpenSinceE',
      query: buildBucketQuery(sub(currentDate, { days: 28, seconds: 1 }), sub(currentDate, { days: 90 }), query),
      count: 0,
    },
    {
      name: '3 - 6 mths',
      key: 'bucketOpenSinceF',
      query: buildBucketQuery(sub(currentDate, { days: 90, seconds: 1 }), sub(currentDate, { days: 180 }), query),
      count: 23,
    },
    {
      name: '6+ mths',
      key: 'bucketOpenSinceG',
      query: buildBucketQuery(sub(currentDate, { days: 180, seconds: 1 }), null, query),
      count: 0,
    },
  ];

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <QuickNumbers query={query} thirtyDaysPrior={thirtyDaysPrior} openQuery={openQuery} />
      </Grid>
      <Grid item xs={12}>
        <ClosedPerWeek query={query} openWeek={openWeek} />
      </Grid>
      <Grid item xs={4}>
        <OpenedDuring query={query} />
      </Grid>
      <Grid item xs={4}>
        <OpenedSince query={query} buckets={openedSinceBuckets} openQuery={openQuery} />
      </Grid>
      <Grid item xs={4}>
        <OpenByRepo query={byRepoQuery} openQuery={openQuery} />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Explore));
