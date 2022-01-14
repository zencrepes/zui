import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Toolbar from './toolbar';
import Review from './review';

import { iRootState } from '../../../../store';

const GQL_QUERY = loader('./getRuns.graphql');

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
  analyzeSelectedRunId: state.testingPerfs.analyzeSelectedRunId,
});

const mapDispatch = (dispatch: any) => ({
  setAnalyzeSelectedRunId: dispatch.testingPerfs.setAnalyzeSelectedRunId,
});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const Analyze: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, analyzeSelectedRunId } = props;
  const [selectedRunId, setSelectedRunId] = React.useState<string>(analyzeSelectedRunId);

  const classes = useStyles();

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined && data.testingPerfs.data.items.nodes.length > 0) {
    const availableRuns = data.testingPerfs.data.items.nodes
      .slice()
      .sort((a: any, b: any) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime());
    const lastRun = availableRuns[availableRuns.length - 1];
    if (selectedRunId === '' || !availableRuns.map((r: any) => r.id).includes(selectedRunId)) {
      setSelectedRunId(lastRun.id);
      return null;
    }

    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Toolbar availableRuns={availableRuns} selectedRunId={selectedRunId} setSelectedRunId={setSelectedRunId} />
        </Grid>
        <Grid item xs={12}>
          <Review selectedRunId={selectedRunId} />
        </Grid>
      </Grid>
    );
  }
  return <span>Loading data</span>;
};

export default withRouter(connect(mapState, mapDispatch)(Analyze));
