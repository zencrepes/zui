import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ClosedPerWeek from './closedPerWeek';
import OpenedDuring from './openedDuring';
// import OpenedSince from './openedSince';
import QuickNumbers from './quickNumbers';

import { iRootState } from '../../../../store';

import { sub } from 'date-fns';

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
        <ClosedPerWeek query={query} />
      </Grid>
      <Grid item xs={4}>
        <OpenedDuring query={query} />
      </Grid>
      <Grid item xs={4}>
        {/* <OpenedSince query={query} /> */}
      </Grid>
      <Grid item xs={4}>
        <span>Time since last update</span>
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Explore));
