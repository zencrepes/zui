import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface Props {
  maxBuckets: number;
  totalBuckets: number;
  setMaxBuckets: (value: number) => void;
}

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const SelectBuckets: React.FC<Props> = (props: Props) => {
  const { maxBuckets, setMaxBuckets, totalBuckets } = props;
  const classes = useStyles();

  const [value, setValue] = React.useState<number>(maxBuckets);

  const handleChangeCommit = (event: any, newValue: number | number[]) => {
    setMaxBuckets(newValue as number);
  };

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const marks: Array<any> = [];

  if (value !== 5) {
    marks.push({
      value: 5,
      label: 5,
    });
  } else {
    marks.push({
      value: value,
      label: value,
    });
  }

  marks.push({
    value: maxBuckets,
    label: maxBuckets,
  });

  if (maxBuckets !== totalBuckets) {
    marks.push({
      value: totalBuckets,
      label: totalBuckets,
    });
  }

  if (totalBuckets < 5) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Buckets to display
      </Typography>
      <Slider
        value={value}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks={marks}
        min={5}
        max={totalBuckets}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommit}
      />
    </div>
  );
};
export default SelectBuckets;
