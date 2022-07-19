import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  availableMetrics: any;
  setSelectedMetric: (value: string) => void;
  selectedMetric: string;
}

const SelectMetric: React.FC<Props> = (props: Props) => {
  const { availableMetrics, setSelectedMetric } = props;

  return (
    <Autocomplete
      id="combo-box-field"
      options={availableMetrics}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option) => option.value}
      style={{ width: 300 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setSelectedMetric(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Select a metric" />}
    />
  );
};
export default SelectMetric;
