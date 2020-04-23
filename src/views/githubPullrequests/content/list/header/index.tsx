import React from 'react';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Grid from '@material-ui/core/Grid/Grid';

import ExportButton from './exportButton';
import Sort from './sort';

interface Props {
  totalCount: number;
  query: any;
  setSortField: Function;
  sortField: string;
  setSortDirection: Function;
  sortDirection: string;
  availableSortFields: Array<any>;
}

const Header: React.FC<Props> = (props: Props) => {
  const { totalCount, query, setSortField, sortField, setSortDirection, sortDirection, availableSortFields } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
            <Grid item>
              <span>{totalCount} Pull Requests</span>
            </Grid>
            <Grid item xs={12} sm container></Grid>
            <Grid item>
              <Sort
                setSortField={setSortField}
                sortField={sortField}
                setSortDirection={setSortDirection}
                sortDirection={sortDirection}
                availableSortFields={availableSortFields}
              />
            </Grid>
            <Grid item>
              <ExportButton query={query} totalCount={totalCount} sortField={sortField} sortDirection={sortDirection} />
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
