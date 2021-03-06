import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../store';
import { TableConfig, TableSort, TablePaginationType } from '../../../../global';

import SimpleTable from '../../../../components/tables/simple';
import ExportTsv from '../../../../components/tables/exportTsv';

const GQL_QUERY = loader('./getList.graphql');

//https://www.apollographql.com/docs/react/data/pagination/

const mapState = (state: iRootState) => ({
  query: state.githubVulnerabilities.query,
  tablePaginationRowsPerPage: state.githubVulnerabilities.tablePaginationRowsPerPage,
  tablePaginationCurrentPage: state.githubVulnerabilities.tablePaginationCurrentPage,
  tablePaginationOffset: state.githubVulnerabilities.tablePaginationOffset,
  tablePaginationLimit: state.githubVulnerabilities.tablePaginationLimit,
});

const mapDispatch = (dispatch: any) => ({
  setTablePaginationRowsPerPage: dispatch.githubVulnerabilities.setTablePaginationRowsPerPage,
  setTablePaginationCurrentPage: dispatch.githubVulnerabilities.setTablePaginationCurrentPage,
  setTablePaginationOffset: dispatch.githubVulnerabilities.setTablePaginationOffset,
  setTablePaginationLimit: dispatch.githubVulnerabilities.setTablePaginationLimit,
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

  const [sortField, setSortField] = React.useState<string>(tableConfig.defaultSortField);
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
        <SimpleTable
          totalCount={totalCount}
          tableConfig={tableConfig}
          tableSort={tableSort}
          tablePagination={tablePagination}
          items={nodes}
          exportTsv={
            <ExportTsv
              gqlQuery={GQL_QUERY}
              query={query}
              tableConfig={tableConfig}
              totalCount={totalCount}
              tableSort={tableSort}
            />
          }
        />
      </React.Fragment>
    );
  }
  return null;
};

export default connect(mapState, mapDispatch)(List);
