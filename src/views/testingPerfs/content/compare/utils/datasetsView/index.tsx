import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Runs from './runs';
import Resources from './resources';

interface Props {
  dataset: any;
}

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const DatasetView: React.FC<Props> = (props: Props) => {
  const { dataset } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.root} justify="flex-start" alignItems="flex-start">
      <Grid item xs={12}>
        <Runs dataset={dataset} />
      </Grid>
      <Grid item xs={12}>
        <Resources dataset={dataset} />
      </Grid>
    </Grid>
  );
};

export default DatasetView;
