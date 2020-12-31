import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PerWeek from './perWeek';
import FailureEvolution from './failureEvolution';
import QuickNumbers from './quickNumbers';

import { iRootState } from '../../../../store';

import { sub, add } from 'date-fns';

import { createTermFilter, addFilterToQuery } from '../../../../utils/query';

const mapState = (state: iRootState) => ({
  query: state.testingRuns.query,
});

const mapDispatch = () => ({});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const buildFilterWeek = (weekStart: string, weekEnd: string, query: any) => {
  let updatedQuery: any = {};

  const filterFrom = createTermFilter('>=', 'createdAt', weekStart);
  updatedQuery = addFilterToQuery(filterFrom, query);

  const filterTo = createTermFilter('<=', 'createdAt', weekEnd);
  updatedQuery = addFilterToQuery(filterTo, updatedQuery);

  return updatedQuery;
};

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;
const Explore: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, history } = props;
  const classes = useStyles();

  const openQuery = (newQuery: any) => {
    history.push({
      pathname: '/testingRuns',
      search: '?q=' + encodeURIComponent(JSON.stringify(newQuery)) + '&tab=' + encodeURIComponent('list'),
      state: { detail: newQuery },
    });
  };

  const openWeek = (weekData: any) => {
    const weekStart = weekData.state;
    const weekEnd = add(new Date(weekStart), { days: 7 }).toISOString();
    const updatedQuery = buildFilterWeek(weekStart, weekEnd, query);
    openQuery(updatedQuery);
  };

  /*
  For some unknown reason, passing a date function, as a variable of the apollo query
  Results in the query repeating over and over, therefore, moving this one level up
  */
  const thirtyDaysPrior = sub(new Date(), { days: 30 }).toISOString();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <QuickNumbers query={query} thirtyDaysPrior={thirtyDaysPrior} openQuery={openQuery} />
      </Grid>
      <Grid item xs={12}>
        <PerWeek query={query} openWeek={openWeek} />
      </Grid>
      <Grid item xs={6}>
        <FailureEvolution
          query={query}
          headerTitle={'Failure rate over the past 12 days'}
          timeWindowPrior={sub(new Date(), { days: 12 }).toISOString()}
          interval={'day'}
        />
      </Grid>
      <Grid item xs={6}>
        <FailureEvolution
          query={query}
          headerTitle={'Failure rate over the past 12 weeks'}
          timeWindowPrior={sub(new Date(), { days: 84 }).toISOString()}
          interval={'week'}
        />
      </Grid>
      <Grid item xs={6}>
        <FailureEvolution
          query={query}
          headerTitle={'Failure rate over the past 12 months'}
          timeWindowPrior={sub(new Date(), { days: 365 }).toISOString()}
          interval={'month'}
        />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Explore));
