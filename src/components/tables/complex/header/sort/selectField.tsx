import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { TableConfig, TableSort } from '../../../../../global';

interface Props {
  tableConfig: TableConfig;
  tableSort: TableSort;
}

const SelectField: React.FC<Props> = (props: Props) => {
  const { tableConfig, tableSort } = props;
  return (
    <Autocomplete
      id="combo-box-field"
      options={tableConfig.columns.filter((s) => s.sortable === true)}
      getOptionLabel={(option) => option.name}
      value={tableConfig.columns.find((v: any) => v.sortField === tableSort.sortField)}
      style={{ width: 200 }}
      onChange={(event: any, newValue: any | null) => {
        if (newValue !== null) {
          tableSort.setSortField(newValue.sortField);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Sort By" />}
    />
  );
};
export default SelectField;
