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
});

const mapDispatch = () => ({});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const Analyze: React.FC<connectedProps> = (props: connectedProps) => {
  const [selectedRunId, setSelectedRunId] = React.useState<string>('');
  const { query } = props;

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
      .sort((a: any, b: any) => new Date(a.startedAt) - new Date(b.startedAt));
    const lastRun = availableRuns[availableRuns.length - 1];
    if (selectedRunId === '') {
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
