import React from 'react';

import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

import { Metrics, Facet } from './types';
import { Typography } from '@material-ui/core';

interface Props {
  metrics: Metrics;
  facet: Facet;
  updateMetricsRange: Function;
}

function valueLabelFormat(value: number) {
  return value.toString();
}

const MetricsSlider: React.FC<Props> = (props: Props) => {
  const { metrics, updateMetricsRange, facet } = props;
  const [value, setValue] = React.useState<number[]>([metrics.min, metrics.max]);

  console.log(facet.name);
  console.log(metrics);
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: any, newValue: any) => {
    if (newValue[0] !== undefined && newValue[1] !== undefined) {
      updateMetricsRange(newValue[0], newValue[1], facet, metrics);
    }
  };

  // TO-DO: Disable when values should not be changed (ie overall = current)
  const disabled = false;
  const labelDisplay = 'auto';
  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
      <Grid item xs={2}>
        <Typography variant="body2">{metrics.overallMin}</Typography>
      </Grid>
      <Grid item xs={8} sm container>
        <Slider
          value={value}
          min={metrics.overallMin}
          step={1}
          max={metrics.overallMax}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay={labelDisplay}
          aria-labelledby="slider"
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">{metrics.overallMax}</Typography>
      </Grid>
    </Grid>
  );
};

export default MetricsSlider;
