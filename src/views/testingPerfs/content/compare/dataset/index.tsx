import React from 'react';

import Grid from '@material-ui/core/Grid';

import CustomCard from '../../../../../components/customCard';

import SelectProfile from './selectProfile';
import SelectRun from './selectRun';
import SelectCompareRun from './selectCompareRun';

const Dataset: React.FC = () => {
  return (
    <CustomCard headerTitle="Available Datasets" headerFactTitle="" headerFactValue="">
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={4}>
          <SelectRun />
        </Grid>
        <Grid item xs={4}>
          <SelectProfile />
        </Grid>
        <Grid item xs={4}>
          <SelectCompareRun />
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default Dataset;
