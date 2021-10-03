import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  availableMetricType: any;
  setMetricType: (value: string) => void;
  selectedMetricType: any;
}

const SelectTransaction: React.FC<Props> = (props: Props) => {
  const { availableMetricType, setMetricType, selectedMetricType } = props;

  return (
    <Autocomplete
      id="combo-box-field"
      options={availableMetricType}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option) => option.value}
      style={{ width: 250 }}
      value={selectedMetricType}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setMetricType(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Metric Type" />}
    />
  );
};
export default SelectTransaction;
