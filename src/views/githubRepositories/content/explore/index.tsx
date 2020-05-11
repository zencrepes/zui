import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ClosedPerWeek from './closedPerWeek';
import PushedSince from './pushedSince';
import QuickNumbers from './quickNumbers';
import IssuesCount from './countIssues';
import PrsCount from './countPrs';
import ReleasesCount from './countReleases';
import CountMilestones from './countMilestones';
import CountProjects from './countProjects';
import CountCommits from './countCommits';
import CountVulnerabilities from './countVulnerabilities';
import CountWatchers from './countWatchers';
import CountStargazers from './countStargazers';

import { iRootState } from '../../../../store';

import { sub, add } from 'date-fns';

import { createTermFilter, addFilterToQuery } from '../../../../utils/query';

const mapState = (state: iRootState) => ({
  query: state.githubRepositories.query,
});

const mapDispatch = () => ({});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const buildBucketQuery = (from: Date, to: Date | null, query: any) => {
  let updatedQuery: any = {};

  const filterFrom = createTermFilter('<=', 'pushedAt', from.toISOString());
  updatedQuery = addFilterToQuery(filterFrom, query);

  if (to !== null) {
    const filterTo = createTermFilter('>=', 'pushedAt', to.toISOString());
    updatedQuery = addFilterToQuery(filterTo, updatedQuery);
  }

  return updatedQuery;
};

const buildFilterWeek = (weekStart: string, weekEnd: string, query: any) => {
  let updatedQuery: any = {};

  const filterFrom = createTermFilter('<=', 'createdAt', weekStart);
  updatedQuery = addFilterToQuery(filterFrom, query);

  const filterTo = createTermFilter('>=', 'createdAt', weekEnd);
  updatedQuery = addFilterToQuery(filterTo, updatedQuery);

  return updatedQuery;
};

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;
const Explore: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, history } = props;
  const classes = useStyles();

  const openQuery = (newQuery: any) => {
    history.push({
      pathname: '/githubRepositories',
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
  const ninetyDaysPrior = sub(new Date(), { days: 90 }).toISOString();

  const currentDate = new Date();
  const openedSinceBuckets = [
    {
      name: '0 - 2w',
      key: 'bucketOpenSinceA',
      query: buildBucketQuery(currentDate, sub(currentDate, { days: 14 }), query),
      count: 0,
    },
    {
      name: '2 - 4 wks',
      key: 'bucketOpenSinceB',
      query: buildBucketQuery(sub(currentDate, { days: 14, seconds: 1 }), sub(currentDate, { days: 28 }), query),
      count: 0,
    },
    {
      name: '1 - 3 mths',
      key: 'bucketOpenSinceC',
      query: buildBucketQuery(sub(currentDate, { days: 28, seconds: 1 }), sub(currentDate, { days: 90 }), query),
      count: 0,
    },
    {
      name: '3 - 6 mths',
      key: 'bucketOpenSinceD',
      query: buildBucketQuery(sub(currentDate, { days: 90, seconds: 1 }), sub(currentDate, { days: 180 }), query),
      count: 15,
    },
    {
      name: '6 - 12 mths',
      key: 'bucketOpenSinceE',
      query: buildBucketQuery(sub(currentDate, { days: 180, seconds: 1 }), sub(currentDate, { days: 365 }), query),
      count: 0,
    },
    {
      name: '1 - 2 yrs',
      key: 'bucketOpenSinceF',
      query: buildBucketQuery(sub(currentDate, { days: 365, seconds: 1 }), sub(currentDate, { days: 730 }), query),
      count: 23,
    },
    {
      name: '2+ yrs',
      key: 'bucketOpenSinceG',
      query: buildBucketQuery(sub(currentDate, { days: 730, seconds: 1 }), null, query),
      count: 0,
    },
  ];

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <QuickNumbers
          query={query}
          thirtyDaysPrior={thirtyDaysPrior}
          ninetyDaysPrior={ninetyDaysPrior}
          openQuery={openQuery}
        />
      </Grid>
      <Grid item xs={12}>
        <ClosedPerWeek query={query} openWeek={openWeek} />
      </Grid>
      <Grid item xs={3}>
        <PushedSince query={query} buckets={openedSinceBuckets} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <IssuesCount query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <PrsCount query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <ReleasesCount query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <CountMilestones query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <CountProjects query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <CountCommits query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <CountVulnerabilities query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <CountWatchers query={query} openQuery={openQuery} />
      </Grid>
      <Grid item xs={3}>
        <CountStargazers query={query} openQuery={openQuery} />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Explore));
