import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Grid from '@material-ui/core/Grid/Grid';

import { iRootState } from '../../../../store';

import IssuesGraph from './graph';
import Controls from './controls';
import Path from './path';
import Selected from './selected';

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
  zapiClient: state.global.zapiClient,
});

const GQL_NETWORK = loader('../../graphql/getNetwork.graphql');

const mapDispatch = (dispatch: any) => ({
  setNetworkDistanceGraphCeiling: dispatch.githubIssues.setNetworkDistanceGraphCeiling,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;
const Network: React.FC<connectedProps> = (props: connectedProps) => {
  const { zapiClient, setNetworkDistanceGraphCeiling } = props;

  const [graphNodeSelected, setGraphNodeSelected] = React.useState({});
  const [graphNodeSelectedDialog, setGraphNodeSelectedDialog] = React.useState({});

  console.log(props);
  console.log(graphNodeSelected);
  console.log(graphNodeSelectedDialog);

  const { data } = useQuery(GQL_NETWORK, {
    variables: {
      rootNodes: ['MDU6SXNzdWU2NzUyNTA1MTA='],
    },
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return null;
  }
  const issuesGraph: any = data.githubIssues.data.network.nodes;

  // Get ceiling distance
  const distances = issuesGraph.map((i: any) => i.data.distance).filter((i: any) => i !== null);
  if (distances.length > 0) {
    setNetworkDistanceGraphCeiling(Math.max(...distances));
  }

  return (
    <React.Fragment>
      <Selected />
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
        <Grid item xs={9}>
          <IssuesGraph
            setGraphNodeSelected={setGraphNodeSelected}
            setGraphNodeSelectedDialog={setGraphNodeSelectedDialog}
            issuesGraph={issuesGraph}
            zapiClient={zapiClient}
          />
        </Grid>
        <Grid item xs={3}>
          <Controls />
          <Path />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Network));
