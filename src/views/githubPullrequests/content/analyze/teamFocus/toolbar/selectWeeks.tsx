import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface Props {
  maxWeeks: number;
  totalWeeks: number;
  setMaxWeeks: Function;
}

const useStyles = makeStyles({
  root: {
    width: 350,
  },
});

const SelectWeeks: React.FC<Props> = (props: Props) => {
  const { maxWeeks, setMaxWeeks, totalWeeks } = props;
  const classes = useStyles();

  const handleChange = (event: any, newValue: number | number[]) => {
    setMaxWeeks(newValue as number);
  };

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: maxWeeks,
      label: maxWeeks,
    },
    {
      value: totalWeeks,
      label: totalWeeks,
    },
  ];

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Number of weeks to display
      </Typography>
      <Slider
        value={maxWeeks}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        min={0}
        max={totalWeeks}
        marks={marks}
        onChangeCommitted={handleChange}
      />
    </div>
  );
};
export default SelectWeeks;
