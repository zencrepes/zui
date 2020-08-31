import React from 'react';

import Grid from '@material-ui/core/Grid';

import CustomCard from '../../../../../components/customCard';

import DistanceSlider from './distanceSlider';

const Controls: React.FC<any> = () => {
  // const { query, openQuery } = props;

  return (
    <CustomCard headerTitle="Controls" headerFactTitle="" headerFactValue="">
      <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing={8}>
        <Grid container>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            {/* <Grid item>
              <ResetGraph />
            </Grid>
            <Grid item>
              <RedrawGraph />
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item>
          <DistanceSlider />
        </Grid>
        {/* <Grid item>
          <Explore />
        </Grid>
        <Grid item>
          <Notes />
        </Grid> */}
      </Grid>
    </CustomCard>
  );
};

export default Controls;
