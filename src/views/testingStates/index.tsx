import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TableConfig } from '../../global';

import Layout from '../../layout';
import NavTabs from './navTabs';

import Content from './content';
import FacetsHoc from './facets';
import Query from './query';

const GQL_GETCONFIG = loader('./getConfig.graphql');

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  updateQueryIfDifferent: dispatch.testingStates.updateQueryIfDifferent,
});

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
  nullFilter: string;
  default: boolean;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const TestingStates: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();
  const { updateQueryIfDifferent, location, history } = props;

  const pushNewQuery = (modifiedQuery: any) => {
    history.push({
      pathname: '/testingStates',
      search: '?q=' + encodeURIComponent(JSON.stringify(modifiedQuery)),
      state: { detail: modifiedQuery },
    });
  };

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

  const { data } = useQuery(GQL_GETCONFIG, {
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return <p>Loading..., please wait</p>;
  } else {
    const facets: Facet[] = data.dataset.config.aggregations.nodes;
    const tableConfig: TableConfig = data.dataset.config.table;
    return (
      <Layout>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
          <Grid item>
            <FacetsHoc facets={facets} pushNewQuery={pushNewQuery} />
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
                <Content tableConfig={tableConfig} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
};

export default withRouter(connect(mapState, mapDispatch)(TestingStates));
