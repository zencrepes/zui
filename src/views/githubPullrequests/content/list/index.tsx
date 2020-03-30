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
  tablePaginationRowsPerPage: state.githubPullrequests.tablePaginationRowsPerPage,
  tablePaginationCurrentPage: state.githubPullrequests.tablePaginationCurrentPage,
  tablePaginationOffset: state.githubPullrequests.tablePaginationOffset,
  tablePaginationLimit: state.githubPullrequests.tablePaginationLimit,
});

const mapDispatch = (dispatch: any) => ({
  setTablePaginationRowsPerPage: dispatch.githubPullrequests.setTablePaginationRowsPerPage,
  setTablePaginationCurrentPage: dispatch.githubPullrequests.setTablePaginationCurrentPage,
  setTablePaginationOffset: dispatch.githubPullrequests.setTablePaginationOffset,
  setTablePaginationLimit: dispatch.githubPullrequests.setTablePaginationLimit,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const List: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    tablePaginationOffset,
    tablePaginationLimit,
    setTablePaginationLimit,
    tablePaginationCurrentPage,
    setTablePaginationCurrentPage,
  } = props;

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
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    const totalCount = data.githubPullrequests.data.items.totalCount;
    const nodes = data.githubPullrequests.data.items.nodes;

    return (
      <React.Fragment>
        <Table>
          <Header totalCount={totalCount} />
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
