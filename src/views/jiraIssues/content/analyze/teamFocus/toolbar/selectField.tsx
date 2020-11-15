import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const aggregationFields = [
  { display: 'Server', value: 'server.name.keyword' },
  { display: 'Project Key', value: 'project.key' },
  { display: 'Reporter', value: 'reporter.name.keyword' },
  { display: 'Assignee', value: 'assignees.name.keyword' },
  { display: 'Sprint', value: 'sprint.edges.node.name.keyword' },
];

interface Props {
  field: string;
  setField: (value: string) => void;
}

const SelectField: React.FC<Props> = (props: Props) => {
  const { field, setField } = props;
  return (
    <Autocomplete
      id="combo-box-field"
      options={aggregationFields}
      getOptionLabel={(option) => option.display}
      value={aggregationFields.find((v: any) => v.value === field)}
      style={{ width: 200 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setField(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Aggregated field" />}
    />
  );
};
export default SelectField;
