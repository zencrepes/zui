import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useQuery } from '@apollo/client';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { iRootState } from '../../../../../store';
import { TableConfig, TableSort, TablePaginationType } from '../../../../../global';

import ComplexTable from '../../../../../components/tables/complex';
import IssueWide from '../../list/issueWide';

const GQL_QUERY = loader('../../../graphql/getList.graphql');

//https://www.apollographql.com/docs/react/data/pagination/

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
  tablePaginationRowsPerPage: state.githubIssues.tablePaginationRowsPerPage,
  tablePaginationCurrentPage: state.githubIssues.tablePaginationCurrentPage,
  tablePaginationOffset: state.githubIssues.tablePaginationOffset,
  tablePaginationLimit: state.githubIssues.tablePaginationLimit,
});

const mapDispatch = (dispatch: any) => ({
  setTablePaginationRowsPerPage: dispatch.githubIssues.setTablePaginationRowsPerPage,
  setTablePaginationCurrentPage: dispatch.githubIssues.setTablePaginationCurrentPage,
  setTablePaginationOffset: dispatch.githubIssues.setTablePaginationOffset,
  setTablePaginationLimit: dispatch.githubIssues.setTablePaginationLimit,
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
  } = props;

  const [sortField, setSortField] = React.useState<string>('createdAt');
  const [sortDirection, setSortDirection] = React.useState<'desc' | 'asc'>('desc');

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTablePaginationLimit(parseInt(event.target.value, 10));
  };

  const changeCurrentPage = (event: unknown, newPage: number) => {
    setTablePaginationCurrentPage(newPage);
  };

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      from: tablePaginationOffset,
      size: tablePaginationLimit,
      query: JSON.stringify(query),
      sortField: sortField,
      sortDirection: sortDirection,
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

    return (
      <React.Fragment>
        <ComplexTable
          totalCount={totalCount}
          tableConfig={tableConfig}
          tableSort={tableSort}
          tablePagination={tablePagination}
        >
          {nodes.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <IssueWide item={item} selectable={false} />
                </TableCell>
              </TableRow>
            );
          })}
        </ComplexTable>
      </React.Fragment>
    );
  }
  return null;
};

export default connect(mapState, mapDispatch)(List);
