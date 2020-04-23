import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

interface Props {
  sortDirection: string;
  setSortDirection: Function;
}

const SelectField: React.FC<Props> = (props: Props) => {
  const { sortDirection, setSortDirection } = props;

  const clickButton = async () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      startIcon={sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      onClick={clickButton}
    >
      {sortDirection === 'asc' ? 'ASC' : 'DESC'}
    </Button>
  );
};
export default SelectField;
