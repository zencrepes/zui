import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { add } from 'date-fns';

import TeamFocus from './teamFocus';

import { iRootState } from '../../../../store';
import { createTermFilter, addFilterToQuery } from '../../../../utils/query';

const mapState = (state: iRootState) => ({
  defaultPoints: state.jiraIssues.defaultPoints,
  query: state.jiraIssues.query,
});

const mapDispatch = () => ({});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const Analyze: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, history, defaultPoints } = props;
  const classes = useStyles();

  const openQuery = (newQuery: any) => {
    history.push({
      pathname: '/jiraIssues',
      search: '?q=' + encodeURIComponent(JSON.stringify(newQuery)) + '&tab=' + encodeURIComponent('list'),
      state: { detail: newQuery },
    });
  };

  const openMatrixClick = (field: string, fieldValue: string, startWeek: string) => {
    const termFilter = createTermFilter('=', field, fieldValue);
    let updatedQuery = addFilterToQuery(termFilter, query);

    const filterFrom = createTermFilter('>=', 'closedAt', startWeek);
    updatedQuery = addFilterToQuery(filterFrom, updatedQuery);

    const filterTo = createTermFilter('<=', 'closedAt', add(new Date(startWeek), { days: 7 }).toISOString());
    updatedQuery = addFilterToQuery(filterTo, updatedQuery);

    openQuery(updatedQuery);
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <TeamFocus query={query} openMatrixClick={openMatrixClick} defaultPoints={defaultPoints} />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Analyze));
