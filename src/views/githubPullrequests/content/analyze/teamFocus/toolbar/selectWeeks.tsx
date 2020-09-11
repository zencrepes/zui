import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface Props {
  maxWeeks: number;
  totalWeeks: number;
  setMaxWeeks: (maxWeeks: number) => void;
}

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const SelectWeeks: React.FC<Props> = (props: Props) => {
  const { maxWeeks, setMaxWeeks, totalWeeks } = props;
  const classes = useStyles();

  const [value, setValue] = React.useState<number>(maxWeeks);

  const handleChangeCommit = (event: any, newValue: number | number[]) => {
    setMaxWeeks(newValue as number);
  };

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
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
  ];
  if (maxWeeks !== totalWeeks) {
    marks.push({
      value: totalWeeks,
      label: totalWeeks,
    });
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Weeks to display
      </Typography>
      <Slider
        value={value}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        min={0}
        max={totalWeeks}
        marks={marks}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommit}
      />
    </div>
  );
};
export default SelectWeeks;
