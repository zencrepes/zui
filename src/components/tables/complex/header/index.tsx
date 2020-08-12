import React from 'react';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Grid from '@material-ui/core/Grid/Grid';

import { TableConfig, TableSort } from '../../../../global';
import Sort from './sort';

interface Props {
  totalCount: number;
  totalSelected: any;
  tableConfig: TableConfig;
  tableSort: TableSort;
  exportTsv: any;
  actions: any;
}

const Header: React.FC<Props> = (props: Props) => {
  const { tableConfig, tableSort, totalCount, totalSelected, exportTsv, actions } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
            <Grid item>
              <span>
                {totalCount} {tableConfig.itemsType}
              </span>
            </Grid>
            {totalSelected !== undefined && <Grid item>{totalSelected}</Grid>}
            <Grid item xs={12} sm container></Grid>
            <Grid item>
              <Sort tableSort={tableSort} tableConfig={tableConfig} />
            </Grid>
            <Grid item>{actions}</Grid>
            <Grid item>{exportTsv}</Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default Header;
