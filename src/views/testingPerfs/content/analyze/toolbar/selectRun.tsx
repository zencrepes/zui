import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

interface Run {
  id: string;
  name: string;
  startedAt: string;
}

interface Props {
  availableRuns: Run[];
  setSelectedRunId: (value: string) => void;
  selectedRunId: string;
}

const SelectRun: React.FC<Props> = (props: Props) => {
  const { selectedRunId, setSelectedRunId, availableRuns } = props;

  return (
    <Autocomplete
      id="combo-box-field"
      options={availableRuns}
      getOptionLabel={(option) => format(parseISO(option.startedAt), 'LLL do yyyy HH:MM') + ' - ' + option.name}
      value={availableRuns.find((v: any) => v.value === selectedRunId)}
      style={{ width: 500 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setSelectedRunId(newValue.id);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Select a run" />}
    />
  );
};
export default SelectRun;
