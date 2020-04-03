import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Layout from '../../layout';
import { Dataset } from '../../global';
import NavTabs from './navTabs';

import Content from './content';
import Facets from './facets';
import Query from './query';

const QUERY_GETFACETS = loader('./getFacets.graphql');

interface Props {
  datasets?: Dataset[];
  currentDatasetKey?: string;
}

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
}));

const Data: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { data } = useQuery(QUERY_GETFACETS, {
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return <p>Loading..., please wait</p>;
  } else {
    const facets = data.githubPullrequests.config.aggregations.nodes;
    return (
      <Layout {...props}>
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

export default Data;
