import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { iRootState } from '../../../store';

import TermFacet from './term';
import MetricsFacet from './metrics';
import { Facet, Metrics } from './types';

import { addRemoveFromQuery, addRemoveMetricsFromQuery } from '../../../utils/query';

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubPullrequests.defaultPoints,
  query: state.githubPullrequests.query,
});

const mapDispatch = (dispatch: any) => ({});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '250px',
    marginTop: '0px',
  },
}));

interface Selection {
  key: string;
  docCount: number;
}

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps & { facets: Array<Facet> };

const Facets: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { facets, defaultPoints, query, history } = props;

  const addRemoveFacet = (key: Selection, facet: any) => {
    const modifiedQuery = addRemoveFromQuery(key.key, facet, query);
    history.push({
      pathname: '/githubPullrequests',
      search: '?q=' + encodeURIComponent(JSON.stringify(modifiedQuery)),
      state: { detail: modifiedQuery },
    });
  };

  const updateMetricsRange = (min: number, max: number, facet: any, metrics: Metrics) => {
    console.log(min);
    console.log(max);
    console.log(metrics);
    // Only update the URL if one of the two value have changes
    if (metrics.min !== min || metrics.max !== max) {
      console.log('updated');
      const modifiedQuery = addRemoveMetricsFromQuery(min, max, facet, query);
      history.push({
        pathname: '/githubPullrequests',
        search: '?q=' + encodeURIComponent(JSON.stringify(modifiedQuery)),
        state: { detail: modifiedQuery },
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        {facets.map((facet: any) => {
          if (facet.facetType === 'term') {
            return (
              <Grid item key={facet.field}>
                <TermFacet facet={facet} defaultPoints={defaultPoints} addRemoveFacet={addRemoveFacet} query={query} />
              </Grid>
            );
          } else if (facet.facetType === 'date') {
            return (
              <Grid item key={facet.field}>
                <div>Date Facet</div>
              </Grid>
            );
          } else if (facet.facetType === 'metrics') {
            return (
              <Grid item key={facet.field}>
                <MetricsFacet
                  facet={facet}
                  defaultPoints={defaultPoints}
                  updateMetricsRange={updateMetricsRange}
                  query={query}
                />
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </div>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Facets));
