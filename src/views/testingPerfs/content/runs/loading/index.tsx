import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { iRootState } from '../../../../../store';

const mapState = (state: iRootState) => ({
  loading: state.global.loading,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Loading: React.FC<connectedProps> = (props: connectedProps) => {
  const { loading } = props;
  if (loading) {
    return (
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={12}>
          <LinearProgress color="secondary" />
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default connect(mapState, mapDispatch)(Loading);
