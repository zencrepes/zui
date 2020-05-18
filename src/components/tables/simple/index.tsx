import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';

import { TableConfig, TableSort, TablePaginationType } from '../../../global';
import Header from './header';
import TableToolbar from './toolbar';

interface Props {
  items: any[];
  totalCount: number;
  tableConfig: TableConfig;
  tableSort: TableSort;
  tablePagination: TablePaginationType;
  exportTsv: any;
}

const getObjectValue = (obj: any, path: string, defaultValue = undefined) => {
  const travel = (regexp: any) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

const SimpleTable: React.FC<Props> = (props: Props) => {
  const { items, totalCount, tableConfig, tableSort, tablePagination, exportTsv } = props;

  return (
    <React.Fragment>
      <TableToolbar totalCount={totalCount} tableConfig={tableConfig} exportTsv={exportTsv} />
      <TableContainer>
        <Table>
          <Header tableSort={tableSort} tableConfig={tableConfig} />
          <TableBody>
            {items.map((item: any) => {
              return (
                <TableRow key={item.id}>
                  {tableConfig.columns
                    .filter((col) => col.default === true)
                    .map((col) => {
                      const value = getObjectValue(item, col.field, undefined);
                      return (
                        <TableCell component="td" scope="row" padding="none" key={col.field}>
                          {value}
                        </TableCell>
                      );
                    })}
                </TableRow>
              );
            })}
          </TableBody>
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
      </TableContainer>
    </React.Fragment>
  );
};

export default SimpleTable;
