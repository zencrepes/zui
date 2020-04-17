import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface Props {
  maxBuckets: number;
  totalBuckets: number;
  setMaxBuckets: Function;
}

const useStyles = makeStyles({
  root: {
    width: 350,
  },
});

const SelectBuckets: React.FC<Props> = (props: Props) => {
  const { maxBuckets, setMaxBuckets, totalBuckets } = props;
  const classes = useStyles();

  const handleChange = (event: any, newValue: number | number[]) => {
    setMaxBuckets(newValue as number);
  };

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: maxBuckets,
      label: maxBuckets,
    },
    {
      value: totalBuckets,
      label: totalBuckets,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Number of buckets to display
      </Typography>
      <Slider
        value={maxBuckets}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks={marks}
        min={0}
        max={totalBuckets}
        onChangeCommitted={handleChange}
      />
    </div>
  );
};
export default SelectBuckets;
