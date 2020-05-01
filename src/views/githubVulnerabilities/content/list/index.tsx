import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useQuery } from '@apollo/client';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { iRootState } from '../../../../store';

import Header from './header';
import PullrequestWide from './pullrequestWide';

const PRS_QUERY = loader('./getPullRequests.graphql');

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

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const List: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    tablePaginationOffset,
    tablePaginationLimit,
    setTablePaginationLimit,
    tablePaginationCurrentPage,
    setTablePaginationCurrentPage,
    query,
  } = props;

  const availableSortFields = [
    { display: 'Created', value: 'createdAt' },
    { display: 'Updated', value: 'updatedAt' },
    { display: 'Closed', value: 'closedAt' },
    { display: 'Title', value: 'title.keyword' },
    { display: 'Author', value: 'author.login' },
    { display: 'Milestone', value: 'milestone.title.keyword' },
    { display: 'Repository', value: 'repository.name.keyword' },
    { display: 'Organization', value: 'repository.owner.login' },
  ];

  const [sortField, setSortField] = React.useState<string>('createdAt');
  const [sortDirection, setSortDirection] = React.useState<string>('desc');

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTablePaginationLimit(parseInt(event.target.value, 10));
  };

  const changeCurrentPage = (event: unknown, newPage: number) => {
    setTablePaginationCurrentPage(newPage);
  };

  const { data } = useQuery(PRS_QUERY, {
    variables: {
      from: tablePaginationOffset,
      size: tablePaginationLimit,
      query: JSON.stringify(query),
      sortField: sortField,
      sortDirection: sortDirection,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    const totalCount = data.githubVulnerabilities.data.items.totalCount;
    const nodes = data.githubVulnerabilities.data.items.nodes;

    return (
      <React.Fragment>
        <Table size="small">
          <Header
            totalCount={totalCount}
            query={query}
            sortField={sortField}
            setSortField={setSortField}
            availableSortFields={availableSortFields}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
          <TableBody>
            {nodes.map((item: any) => {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <PullrequestWide item={item} key={item.id} />
                  </TableCell>
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
                rowsPerPage={tablePaginationLimit}
                page={tablePaginationCurrentPage}
                onChangePage={changeCurrentPage}
                onChangeRowsPerPage={changeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </React.Fragment>
    );
  }
  return null;
};

export default connect(mapState, mapDispatch)(List);
