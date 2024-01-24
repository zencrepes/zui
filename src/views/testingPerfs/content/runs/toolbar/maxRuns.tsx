import React from 'react';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';

interface Run {
  id: string;
  name: string;
  startedAt: string;
}

interface Props {
  setMaxRunsCount: (value: number) => void;
  maxRunsCount: number;
}

const MaxRuns: React.FC<Props> = (props: Props) => {
  const { maxRunsCount, setMaxRunsCount } = props;

  return (
    <FormControl>
      <Select
        label="Max Number of Runs"
        id="max-number-of-runs"
        value={maxRunsCount}
        style={{ width: 150, textAlign: 'left' }}
        onChange={(event: any) => {
          if (event.target.value !== null) {
            setMaxRunsCount(Number(event.target.value));
          }
        }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
        <MenuItem value={200}>200</MenuItem>
        <MenuItem value={500}>500</MenuItem>
        <MenuItem value={1000}>1000</MenuItem>
      </Select>
      <FormHelperText>Max number of runs</FormHelperText>
    </FormControl>
  );
};
export default MaxRuns;
