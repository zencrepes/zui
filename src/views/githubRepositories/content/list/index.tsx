import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../store';
import { TableConfig, TableSort, TablePaginationType } from '../../../../global';

import SimpleTable from '../../../../components/tables/simple';
import ExportTsv from '../../../../components/tables/exportTsv';
import Actions from './actions';
import { startOfMonth, sub, parseISO, format } from 'date-fns';

const GQL_QUERY = loader('./getList.graphql');

//https://www.apollographql.com/docs/react/data/pagination/

const mapState = (state: iRootState) => ({
  githubToken: state.global.githubToken,
  query: state.githubRepositories.query,
  tablePaginationRowsPerPage: state.githubRepositories.tablePaginationRowsPerPage,
  tablePaginationCurrentPage: state.githubRepositories.tablePaginationCurrentPage,
  tablePaginationOffset: state.githubRepositories.tablePaginationOffset,
  tablePaginationLimit: state.githubRepositories.tablePaginationLimit,
});

const mapDispatch = (dispatch: any) => ({
  setTablePaginationRowsPerPage: dispatch.githubRepositories.setTablePaginationRowsPerPage,
  setTablePaginationCurrentPage: dispatch.githubRepositories.setTablePaginationCurrentPage,
  setTablePaginationOffset: dispatch.githubRepositories.setTablePaginationOffset,
  setTablePaginationLimit: dispatch.githubRepositories.setTablePaginationLimit,
});

interface Props {
  tableConfig: TableConfig;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const List: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    githubToken,
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

    const today = new Date();
    const months = [
      { date: startOfMonth(today), count: 0 },
      { date: startOfMonth(sub(today, { months: 1 })), count: null },
      { date: startOfMonth(sub(today, { months: 2 })), count: null },
      { date: startOfMonth(sub(today, { months: 3 })), count: null },
      { date: startOfMonth(sub(today, { months: 4 })), count: null },
      { date: startOfMonth(sub(today, { months: 5 })), count: null },
      { date: startOfMonth(sub(today, { months: 6 })), count: null },
      { date: startOfMonth(sub(today, { months: 7 })), count: null },
      { date: startOfMonth(sub(today, { months: 8 })), count: null },
      { date: startOfMonth(sub(today, { months: 9 })), count: null },
      { date: startOfMonth(sub(today, { months: 10 })), count: null },
      { date: startOfMonth(sub(today, { months: 11 })), count: null },
      { date: startOfMonth(sub(today, { months: 12 })), count: null },
    ];

    return (
      <React.Fragment>
        <SimpleTable
          totalCount={totalCount}
          tableConfig={tableConfig}
          tableSort={tableSort}
          tablePagination={tablePagination}
          items={nodes.map((n: any) => {
            // Adding recent commits to a micro chart
            let recentCommits: any[] = [];
            if (n.recentCommitsMaster !== null) {
              recentCommits = n.recentCommitsMaster.target.history.edges
                .map((c: any) => c.node.pushedDate)
                .filter((c: any) => c !== null);
            }
            let countCommits = 0;
            const commitMonths = months.map((m: any) => {
              const commitsMonths = recentCommits.filter(
                (c: any) => m.date.toISOString() === startOfMonth(parseISO(c)).toISOString(),
              );
              countCommits = countCommits + commitsMonths.length;
              return {
                ...m,
                count: commitsMonths.length,
              };
            });
            // Calculate datapoints needed to reach 20 commits
            let monthCpt = 0;
            let commitsCpt = 0;
            for (const cm of commitMonths) {
              if (commitsCpt < 20 && commitsCpt < recentCommits.length) {
                commitsCpt = commitsCpt + cm.count;
                monthCpt = monthCpt + 1;
              }
            }
            const tooltips = commitMonths.map((cm: any) => {
              return (
                cm.count +
                ' commits to master in <u>' +
                format(cm.date, 'LLL yyyy') +
                '</u><br /> <i>There has been a total of <b>' +
                (recentCommits.length === 20 ? '20 or more' : recentCommits.length) +
                '</b> commits over <b>' +
                monthCpt +
                '</b> months</i>'
              );
            });
            let fillColor = '#12ff1a';
            if (monthCpt < 3) {
              fillColor = '#12ff1a';
            } else if (recentCommits.length < 20 || monthCpt > 7) {
              fillColor = '#ff1c1c';
            } else if (monthCpt > 4) {
              fillColor = '#ffcb34';
            }

            return { ...n, microchart: { data: commitMonths, tooltips, months: monthCpt, fillColor } };
          })}
          actions={githubToken !== null ? <Actions /> : null}
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
