import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  selectedMetricType: any;
  selectedMetricValue: number;
  setMetricValue: (value: number) => void;
}

const InputMetric: React.FC<Props> = (props: Props) => {
  const { selectedMetricType, selectedMetricValue, setMetricValue } = props;

  return (
    <TextField
      required
      type="number"
      label={'Warning zone (' + (selectedMetricType === undefined ? '' : selectedMetricType.unit) + ')'}
      value={selectedMetricValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== null && parseInt(event.target.value) >= 0) {
          setMetricValue(parseInt(event.target.value));
        }
      }}
    />
  );
};
export default InputMetric;
