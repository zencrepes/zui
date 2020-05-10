import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useQuery } from '@apollo/client';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import TableToolbar from './toolbar';

import { format } from 'date-fns';

import { iRootState } from '../../../../store';

import Header from './header';

const GQL_QUERY = loader('./getList.graphql');

//https://www.apollographql.com/docs/react/data/pagination/

const mapState = (state: iRootState) => ({
  query: state.githubWatchers.query,
  tablePaginationRowsPerPage: state.githubWatchers.tablePaginationRowsPerPage,
  tablePaginationCurrentPage: state.githubWatchers.tablePaginationCurrentPage,
  tablePaginationOffset: state.githubWatchers.tablePaginationOffset,
  tablePaginationLimit: state.githubWatchers.tablePaginationLimit,
});

const mapDispatch = (dispatch: any) => ({
  setTablePaginationRowsPerPage: dispatch.githubWatchers.setTablePaginationRowsPerPage,
  setTablePaginationCurrentPage: dispatch.githubWatchers.setTablePaginationCurrentPage,
  setTablePaginationOffset: dispatch.githubWatchers.setTablePaginationOffset,
  setTablePaginationLimit: dispatch.githubWatchers.setTablePaginationLimit,
});

const useStyles = makeStyles((theme: Theme) => ({
  repoName: {
    color: '#586069!important',
    textDecoration: 'none',
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  severityCell: {
    width: 100,
  },
  dateCell: {
    width: 140,
  },
  ecosystemCell: {
    width: 90,
  },
  vulnRangeCell: {
    width: 140,
  },
  openCell: {
    width: 20,
  },
  link: {
    color: '#586069!important',
    textDecoration: 'none',
  },
}));

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const List: React.FC<connectedProps> = (props: connectedProps) => {
  const classes = useStyles();

  const {
    tablePaginationOffset,
    tablePaginationLimit,
    setTablePaginationLimit,
    tablePaginationCurrentPage,
    setTablePaginationCurrentPage,
    query,
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
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    const totalCount = data.githubWatchers.data.items.totalCount;
    const nodes = data.githubWatchers.data.items.nodes;

    const tableColumns = [
      {
        sortKey: 'dataType',
        sortable: true,
        tableDisplay: true,
        name: 'Type',
      },

      {
        sortKey: 'login',
        sortable: true,
        name: 'User',
      },
      {
        sortKey: 'company.keyword',
        sortable: true,
        name: "User's Company",
      },
      {
        sortKey: 'createdAt',
        sortable: true,
        name: 'Created At',
      },
      {
        sortKey: 'lastStarredAt',
        sortable: true,
        name: 'Last Starred At',
      },
      {
        sortKey: 'repositories.totalCount',
        sortable: true,
        tableDisplay: true,
        name: 'Repos',
      },
      {
        sortKey: 'organizations.totalCount',
        sortable: true,
        name: 'User Orgs Count',
      },
      {
        sortKey: 'organizations',
        sortable: true,
        name: 'User Orgs',
      },
    ];

    return (
      <React.Fragment>
        <TableToolbar
          totalCount={totalCount}
          query={query}
          sortField={sortField}
          sortDirection={sortDirection}
          tableColumns={tableColumns}
        />
        <TableContainer>
          <Table size="small">
            <Header
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              tableColumns={tableColumns.filter((c: any) => c.tableDisplay !== false)}
            />
            <TableBody>
              {nodes.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {item.dataType}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      <a href={item.url} className={classes.repoName} target="_blank" rel="noopener noreferrer">
                        {item.login}
                      </a>
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {item.company}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {format(new Date(item.createdAt), 'eee MMM d, yyyy')}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {item.lastStarredAt !== null && (
                        <React.Fragment>{format(new Date(item.lastStarredAt), 'eee MMM d, yyyy')}</React.Fragment>
                      )}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {item.repositories.totalCount}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {item.organizations.totalCount}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      <Grid container direction="row" spacing={1} justify="flex-start" alignItems="flex-start">
                        {item.organizations.edges.map((org: any) => {
                          return (
                            <Grid container item className={classes.smallAvatar} key={org.node.login}>
                              <a
                                href={org.node.url}
                                className={classes.repoName}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Avatar alt={org.node.login} src={org.node.avatarUrl} className={classes.smallAvatar} />
                              </a>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 50, 100, 150]}
          colSpan={3}
          component="div"
          count={totalCount}
          rowsPerPage={tablePaginationLimit}
          page={tablePaginationCurrentPage}
          onChangePage={changeCurrentPage}
          onChangeRowsPerPage={changeRowsPerPage}
        />
      </React.Fragment>
    );
  }
  return null;
};

export default connect(mapState, mapDispatch)(List);
