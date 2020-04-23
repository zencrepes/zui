import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  availableSortFields: Array<any>;
  sortField: string;
  setSortField: Function;
}

const SelectField: React.FC<Props> = (props: Props) => {
  const { sortField, setSortField, availableSortFields } = props;
  return (
    <Autocomplete
      id="combo-box-field"
      options={availableSortFields}
      getOptionLabel={(option) => option.display}
      value={availableSortFields.find((v: any) => v.value === sortField)}
      style={{ width: 200 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          setSortField(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Sort By" />}
    />
  );
};
export default SelectField;
