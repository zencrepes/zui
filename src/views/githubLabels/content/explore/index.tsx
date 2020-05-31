import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ClosedPerWeek from './closedPerWeek';
import QuickNumbers from './quickNumbers';

import { iRootState } from '../../../../store';

import { sub, add } from 'date-fns';

import { createTermFilter, addFilterToQuery } from '../../../../utils/query';

const mapState = (state: iRootState) => ({
  query: state.githubLabels.query,
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
      pathname: '/githubLabels',
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
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Explore));
