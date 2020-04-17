import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TeamFocus from './teamFocus';

import { iRootState } from '../../../../store';

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubPullrequests.defaultPoints,
  query: state.githubPullrequests.query,
});

const mapDispatch = () => ({});

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps;

const Analyze: React.FC<connectedProps> = (props: connectedProps) => {
  const { query } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <TeamFocus query={query} />
      </Grid>
    </Grid>
  );
};

export default withRouter(connect(mapState, mapDispatch)(Analyze));
