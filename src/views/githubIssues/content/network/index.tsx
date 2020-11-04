import React, { useEffect } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Grid from '@material-ui/core/Grid/Grid';

import { iRootState } from '../../../../store';

import IssuesGraph from './graph';
import About from './about';
import Path from './path';
import Selected from './selected';
import IssueHover from './issueHover';

const GQL_NETWORK = loader('../../graphql/getNetwork.graphql');

// interface githubIssues extends Omit<iRootState, 'githubIssues'> {
//   githubIssues: any;
// }

const mapState = (state: iRootState) => ({
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
  query: state.githubIssues.query,
});

const mapDispatch = (dispatch: any) => ({
  setNetworkData: dispatch.githubIssues.setNetworkData,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;
const Network: React.FC<connectedProps> = (props: connectedProps) => {
  const { setNetworkData, updateIssuesSelected, query } = props;

  const { data } = useQuery(GQL_NETWORK, {
    variables: {
      query: JSON.stringify(query),
      rootNodes: updateIssuesSelected.map((i: any) => i.id),
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined) {
      setNetworkData(data.githubIssues.data.network);
    }
  });

  if (data === undefined) {
    return (
      <span>
        <i>Please wait, loading data</i>
      </span>
    );
  }
  const issuesGraph = data.githubIssues.data.network;

  if (issuesGraph.nodes.length === 0) {
    return (
      <span>
        <i>No root nodes found</i>
      </span>
    );
  }

  return (
    <React.Fragment>
      <Selected />
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
        <Grid item xs={9}>
          <IssuesGraph issuesGraph={issuesGraph} updateIssuesSelected={updateIssuesSelected} />
        </Grid>
        <Grid item xs={3}>
          <IssueHover />
          <Path />
          <About />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Network));
