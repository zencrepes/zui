import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { TableConfig, TableSort } from '../../../../global';

interface Props {
  tableConfig: TableConfig;
  tableSort: TableSort;
  hasRowArray: boolean;
}

const useStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const Header: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const { tableConfig, tableSort, hasRowArray } = props;

  const createSortHandler = (property: string) => () => {
    //If clicking on the same column, then change direction
    if (property === tableSort.sortField) {
      const newDirection = tableSort.sortDirection === 'asc' ? 'desc' : 'asc';
      tableSort.setSortDirection(newDirection);
    } else {
      tableSort.setSortField(property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {hasRowArray && <TableCell />}
        {tableConfig.columns
          .filter((col) => col.default === true)
          .map((col) => (
            <TableCell
              key={col.field}
              align="left"
              padding="none"
              sortDirection={tableSort.sortField === col.sortField ? tableSort.sortDirection : false}
            >
              {col.sortable ? (
                <TableSortLabel
                  active={tableSort.sortField === col.sortField}
                  direction={tableSort.sortDirection}
                  onClick={createSortHandler(col.sortField)}
                >
                  {col.name}
                  {tableSort.sortField === col.sortField ? (
                    <span className={classes.visuallyHidden}>
                      {tableSort.sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : (
                <React.Fragment>{col.name}</React.Fragment>
              )}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default Header;
