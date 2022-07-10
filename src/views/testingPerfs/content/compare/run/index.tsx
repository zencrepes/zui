import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import CustomCard from '../../../../../components/customCard';
import { iRootState } from '../../../../../store';

import Resources from './resources';

const mapState = (state: iRootState) => ({
  selectedRunData: state.testingPerfs.selectedRunData,
  userName: state.global.userName,
});

const mapDispatch = (dispatch: any) => ({
  setCompareData: dispatch.testingPerfs.setCompareData,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Run: React.FC<connectedProps> = (props: connectedProps) => {
  const { selectedRunData, setCompareData } = props;

  console.log(selectedRunData);

  if (selectedRunData === undefined || Object.keys(selectedRunData).length === 0) {
    return null;
  }

  return (
    <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
      <Grid item xs={4}>
        <Resources resources={selectedRunData.resources.edges} />
      </Grid>
      <Grid item xs={4}>
        <Resources resources={selectedRunData.resources.edges} />
      </Grid>
      <Grid item xs={4}>
        <Resources resources={selectedRunData.resources.edges} />
      </Grid>
    </Grid>
  );
};

export default connect(mapState, mapDispatch)(Run);
