import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { TableConfig, TableSort, TablePaginationType } from '../../../global';
import Header from './header';

interface Props {
  children: any[];
  totalCount: number;
  totalSelected?: any;
  tableConfig: TableConfig;
  tableSort: TableSort;
  tablePagination: TablePaginationType;
  exportTsv?: any;
  actions?: any;
}

const ComplexTable: React.FC<Props> = (props: Props) => {
  const { children, totalCount, totalSelected, tableConfig, tableSort, tablePagination, exportTsv, actions } = props;

  return (
    <Table size="small">
      <Header
        totalCount={totalCount}
        totalSelected={totalSelected}
        tableConfig={tableConfig}
        tableSort={tableSort}
        exportTsv={exportTsv}
        actions={actions}
      />
      <TableBody>{children}</TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 25, 50, 100, 150]}
            colSpan={3}
            count={totalCount}
            rowsPerPage={tablePagination.tablePaginationLimit}
            page={tablePagination.tablePaginationCurrentPage}
            onChangePage={tablePagination.changeCurrentPage}
            onChangeRowsPerPage={tablePagination.changeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ComplexTable;
