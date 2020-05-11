import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface Props {
  setSortField: Function;
  sortField: string;
  setSortDirection: Function;
  sortDirection: 'desc' | 'asc';
  tableColumns: any[];
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

  const { setSortField, sortField, setSortDirection, sortDirection, tableColumns } = props;

  const createSortHandler = (property: string) => () => {
    //If clicking on the same column, then change direction
    if (property === sortField) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
    } else {
      setSortField(property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {tableColumns.map((col) => (
          <TableCell
            key={col.sortKey}
            align="left"
            padding="none"
            sortDirection={sortField === col.sortKey ? sortDirection : false}
          >
            {col.sortable ? (
              <TableSortLabel
                active={sortField === col.sortKey}
                direction={sortDirection}
                onClick={createSortHandler(col.sortKey)}
              >
                {col.name}
                {sortField === col.sortKey ? (
                  <span className={classes.visuallyHidden}>
                    {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
