import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { TableSort } from '../../../../../global';

interface Props {
  tableSort: TableSort;
}

const SelectField: React.FC<Props> = (props: Props) => {
  const { tableSort } = props;

  const clickButton = async () => {
    tableSort.setSortDirection(tableSort.sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      startIcon={tableSort.sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      onClick={clickButton}
    >
      {tableSort.sortDirection === 'asc' ? 'ASC' : 'DESC'}
    </Button>
  );
};
export default SelectField;
