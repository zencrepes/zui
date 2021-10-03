import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import QuickNumbers from './quickNumbers';
import ResponseTime from './responseTime';

import { iRootState } from '../../../../store';

import { sub } from 'date-fns';

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
});

const mapDispatch = () => ({});

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
      pathname: '/testingPerfs',
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
        <ResponseTime query={query} />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Explore));
