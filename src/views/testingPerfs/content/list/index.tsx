import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useQuery, useMutation } from '@apollo/client';

import { iRootState } from '../../../../store';
import { TableConfig, TableSort, TablePaginationType } from '../../../../global';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';

import Header from '../../../../components/tables/simple/header';
import SimpleRow from './simpleRow';

const GQL_QUERY = loader('./getList.graphql');
const GQL_QUERY_DISABLE_RUN = loader('./disableRun.graphql');
const GQL_QUERY_ENABLE_RUN = loader('./enableRun.graphql');

//https://www.apollographql.com/docs/react/data/pagination/

const mapState = (state: iRootState) => ({
  query: state.global.query,
  userName: state.testingPerfs.userName,
  tablePaginationRowsPerPage: state.testingPerfs.tablePaginationRowsPerPage,
  tablePaginationCurrentPage: state.testingPerfs.tablePaginationCurrentPage,
  tablePaginationOffset: state.testingPerfs.tablePaginationOffset,
  tablePaginationLimit: state.testingPerfs.tablePaginationLimit,
});

const mapDispatch = (dispatch: any) => ({
  setTablePaginationRowsPerPage: dispatch.testingPerfs.setTablePaginationRowsPerPage,
  setTablePaginationCurrentPage: dispatch.testingPerfs.setTablePaginationCurrentPage,
  setTablePaginationOffset: dispatch.testingPerfs.setTablePaginationOffset,
  setTablePaginationLimit: dispatch.testingPerfs.setTablePaginationLimit,
});

interface Props {
  tableConfig: TableConfig;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const List: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    tablePaginationOffset,
    tablePaginationLimit,
    setTablePaginationLimit,
    tablePaginationCurrentPage,
    setTablePaginationCurrentPage,
    query,
    tableConfig,
    userName,
  } = props;

  const [sortField, setSortField] = React.useState<string>(tableConfig.defaultSortField);
  const [sortDirection, setSortDirection] = React.useState<'desc' | 'asc'>('desc');

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTablePaginationLimit(parseInt(event.target.value, 10));
  };

  const changeCurrentPage = (event: unknown, newPage: number) => {
    setTablePaginationCurrentPage(newPage);
  };

  const [disableRun] = useMutation(GQL_QUERY_DISABLE_RUN);
  const [enableRun] = useMutation(GQL_QUERY_ENABLE_RUN);

  const { data, refetch } = useQuery(GQL_QUERY, {
    variables: {
      from: tablePaginationOffset,
      size: tablePaginationLimit,
      query: JSON.stringify(query),
      sortField: sortField,
      sortDirection: sortDirection,
      includeDisabled: true,
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    const totalCount = data.dataset.data.count;
    const nodes = data.dataset.data.items.nodes;

    const tableSort: TableSort = {
      setSortField: setSortField,
      sortField: sortField,
      sortDirection: sortDirection,
      setSortDirection: setSortDirection,
    };

    const tablePagination: TablePaginationType = {
      tablePaginationLimit: tablePaginationLimit,
      tablePaginationCurrentPage: tablePaginationCurrentPage,
      changeCurrentPage: changeCurrentPage,
      changeRowsPerPage: changeRowsPerPage,
    };

    const hasRowArray =
      tableConfig.columns.filter((c) => c.fieldType !== undefined && c.fieldType === 'array').length > 0 ? true : false;

    return (
      <React.Fragment>
        <TableContainer>
          <Table>
            <Header hasRowArray={hasRowArray} tableSort={tableSort} tableConfig={tableConfig} />
            <TableBody>
              {nodes.map((item: any) => {
                return (
                  <SimpleRow
                    key={item.id}
                    hasRowArray={hasRowArray}
                    item={item}
                    tableConfig={tableConfig}
                    disableRun={disableRun}
                    enableRun={enableRun}
                    refetch={refetch}
                    userName={userName}
                  />
                );
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
  }
  return null;
};

export default connect(mapState, mapDispatch)(List);
