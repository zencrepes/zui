import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Matrix from './matrix';

import { iRootState } from '../../../../store';

import { add } from 'date-fns';

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
const Analyze: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, history } = props;
  const classes = useStyles();

  const openQuery = (newQuery: any) => {
    history.push({
      pathname: '/circleciInsights',
      search: '?q=' + encodeURIComponent(JSON.stringify(newQuery)) + '&tab=' + encodeURIComponent('list'),
      state: { detail: newQuery },
    });
  };

  const openWeek = (bucketDate: any) => {
    const weekStart = bucketDate;
    const weekEnd = add(new Date(weekStart), { days: 7 }).toISOString();
    const updatedQuery = buildFilter(weekStart, weekEnd, query);
    openQuery(updatedQuery);
  };

  console.log(query);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.name.keyword'}
          headerTitle={'Credits spent per job'}
          aggOptions={{
            calendarInterval: 'week',
            sumField: 'credits_used',
            disjoint: true,
          }}
          valueField={'sum'}
          openWeek={openWeek}
        />
      </Grid>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.name.keyword'}
          headerTitle={'Average duration per job'}
          aggOptions={{
            calendarInterval: 'week',
            avgField: 'duration',
            disjoint: false,
          }}
          valueField={'avg'}
          openWeek={openWeek}
        />
      </Grid>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.workflow.name.keyword'}
          headerTitle={'Credits spent per workflow'}
          aggOptions={{
            calendarInterval: 'week',
            sumField: 'credits_used',
            disjoint: false,
          }}
          valueField={'sum'}
          openWeek={openWeek}
        />
      </Grid>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.workflow.name.keyword'}
          headerTitle={'Average job duration per workflow'}
          aggOptions={{
            calendarInterval: 'week',
            avgField: 'duration',
            disjoint: false,
          }}
          valueField={'avg'}
          openWeek={openWeek}
        />
      </Grid>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.workflow.source.repository.name.keyword'}
          headerTitle={'Credits spent per repository'}
          aggOptions={{
            calendarInterval: 'week',
            sumField: 'credits_used',
            disjoint: false,
          }}
          valueField={'sum'}
          openWeek={openWeek}
        />
      </Grid>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.workflow.source.repository.name.keyword'}
          headerTitle={'Average job duration per repository'}
          aggOptions={{
            calendarInterval: 'week',
            avgField: 'duration',
            disjoint: false,
          }}
          valueField={'avg'}
          openWeek={openWeek}
        />
      </Grid>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.workflow.source.repository.owner.login'}
          headerTitle={'Credits spent per organization'}
          aggOptions={{
            calendarInterval: 'week',
            sumField: 'credits_used',
            disjoint: false,
          }}
          valueField={'sum'}
          openWeek={openWeek}
        />
      </Grid>
      <Grid item xs={6}>
        <Matrix
          query={query}
          compareField={'job.workflow.source.repository.owner.login'}
          headerTitle={'Average job duration per organization'}
          aggOptions={{
            calendarInterval: 'week',
            avgField: 'duration',
            disjoint: false,
          }}
          valueField={'avg'}
          openWeek={openWeek}
        />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Analyze));
