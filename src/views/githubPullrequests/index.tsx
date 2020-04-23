import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Layout from '../../layout';
import NavTabs from './navTabs';

import Content from './content';
import Facets from './facets';
import Query from './query';

const QUERY_GETFACETS = loader('./getFacets.graphql');

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  updateQueryIfDifferent: dispatch.githubPullrequests.updateQueryIfDifferent,
});

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const Data: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { updateQueryIfDifferent, location } = props;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('q') !== null) {
      const queryRaw = params.get('q');
      if (queryRaw !== null) {
        const queryUrl = decodeURIComponent(queryRaw);
        updateQueryIfDifferent(JSON.parse(queryUrl));
      }
    }
  });

  const { data } = useQuery(QUERY_GETFACETS, {
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return <p>Loading..., please wait</p>;
  } else {
    const facets = data.githubPullrequests.config.aggregations.nodes;
    return (
      <Layout>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
          <Grid item>
            <Facets facets={facets} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid container direction="column" justify="flex-start" alignItems="flex-start">
              <Grid item xs={12} sm className={classes.fullWidth}>
                <Query facets={facets} />
              </Grid>
              <Grid item xs={12} sm className={classes.fullWidth}>
                <NavTabs />
              </Grid>
              <Grid item xs={12} sm className={classes.fullWidth}>
                <Content />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
};

export default withRouter(connect(mapState, mapDispatch)(Data));
