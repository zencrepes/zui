import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';

import { TableConfig, TableSort, TablePaginationType } from '../../../global';
import Header from './header';
import TableToolbar from './toolbar';
import SimpleRow from './simpleRow';

interface Props {
  items: any[];
  totalCount: number;
  tableConfig: TableConfig;
  tableSort: TableSort;
  tablePagination: TablePaginationType;
  exportTsv: any;
}

const SimpleTable: React.FC<Props> = (props: Props) => {
  const { items, totalCount, tableConfig, tableSort, tablePagination, exportTsv } = props;

  const hasRowArray =
    tableConfig.columns.filter((c) => c.fieldType !== undefined && c.fieldType === 'array').length > 0 ? true : false;

  return (
    <React.Fragment>
      <TableToolbar totalCount={totalCount} tableConfig={tableConfig} exportTsv={exportTsv} />
      <TableContainer>
        <Table>
          <Header hasRowArray={hasRowArray} tableSort={tableSort} tableConfig={tableConfig} />
          <TableBody>
            {items.map((item: any) => {
              return <SimpleRow key={item.id} hasRowArray={hasRowArray} item={item} tableConfig={tableConfig} />;
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 25, 50, 100, 150]}
                colSpan={
                  hasRowArray
                    ? tableConfig.columns.filter((col) => col.default === true).length + 1
                    : tableConfig.columns.filter((col) => col.default === true).length
                }
                count={totalCount}
                rowsPerPage={tablePagination.tablePaginationLimit}
                page={tablePagination.tablePaginationCurrentPage}
                onChangePage={tablePagination.changeCurrentPage}
                onChangeRowsPerPage={tablePagination.changeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default SimpleTable;
