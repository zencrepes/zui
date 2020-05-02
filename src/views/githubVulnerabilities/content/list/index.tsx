import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { useQuery } from '@apollo/client';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Chip from '@material-ui/core/Chip';

import TableToolbar from './toolbar';

import { Label } from '@primer/components';

import { format } from 'date-fns';

import { iRootState } from '../../../../store';

import Header from './header';

const GQL_QUERY = loader('./getVulnerabilities.graphql');

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
    console.log(newPage);
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
    const totalCount = data.githubVulnerabilities.data.items.totalCount;
    const nodes = data.githubVulnerabilities.data.items.nodes;

    const tableColumns = [
      {
        sortKey: 'securityVulnerability.severity',
        sortable: true,
        name: 'Severity',
      },
      {
        sortKey: 'createdAt',
        sortable: true,
        name: 'Create',
      },
      {
        sortKey: 'securityVulnerability.package.name',
        sortable: true,
        name: 'Package Name',
      },
      {
        sortKey: 'securityVulnerability.package.ecosystem',
        sortable: true,
        name: 'Ecosystem',
      },
      {
        sortKey: 'vulnerableRequirements',
        sortable: false,
        name: 'Version',
      },
      {
        sortKey: 'securityVulnerability.vulnerableVersionRange',
        sortable: false,
        name: 'Vulnerable range',
      },
      {
        sortKey: 'repository.owner.login',
        sortable: true,
        tableDisplay: false,
        name: 'Org',
      },
      {
        sortKey: 'repository.name',
        sortable: false,
        name: 'Repository',
      },
      {
        sortKey: 'dismissedAt',
        sortable: false,
        name: 'Dismissed',
      },
      {
        sortKey: 'dismisser.login',
        sortable: false,
        name: 'Dismissed By',
      },
      {
        sortKey: 'repository.url',
        sortable: false,
        tableDisplay: false,
        name: 'URL',
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
                    <TableCell component="td" scope="row" padding="none" className={classes.severityCell}>
                      <a
                        href={item.repository.url + '/network/alerts'}
                        className={classes.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.securityVulnerability.severity === 'CRITICAL' && (
                          <Label variant="medium" bg="#444d56" m={1}>
                            {item.securityVulnerability.severity}
                          </Label>
                        )}
                        {item.securityVulnerability.severity === 'HIGH' && (
                          <Label variant="medium" bg="#cb2431" m={1}>
                            {item.securityVulnerability.severity}
                          </Label>
                        )}
                        {item.securityVulnerability.severity === 'MODERATE' && (
                          <Label variant="medium" bg="#e36209" m={1}>
                            {item.securityVulnerability.severity}
                          </Label>
                        )}
                        {item.securityVulnerability.severity === 'LOW' && (
                          <Label variant="medium" bg="#fff4b1" color="#24292E" m={1}>
                            {item.securityVulnerability.severity}
                          </Label>
                        )}
                      </a>
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {format(new Date(item.createdAt), 'eee MMM d, yyyy')}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none">
                      <a
                        href={item.securityVulnerability.advisory.permalink}
                        className={classes.repoName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.securityVulnerability.package.name}
                      </a>
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.ecosystemCell}>
                      {item.securityVulnerability.package.ecosystem}
                    </TableCell>

                    <TableCell component="td" scope="row" padding="none">
                      {item.vulnerableRequirements}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.vulnRangeCell}>
                      {item.securityVulnerability.vulnerableVersionRange}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none">
                      <a
                        href={item.repository.owner.url}
                        className={classes.repoName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.repository.owner.login}
                      </a>{' '}
                      /{' '}
                      <a
                        href={item.repository.url + '/network/alerts'}
                        className={classes.repoName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.repository.name}
                      </a>
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" className={classes.dateCell}>
                      {item.dismissedAt !== null && (
                        <span>{format(new Date(item.dismissedAt), 'eee MMM d, yyyy')}</span>
                      )}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none">
                      {item.dismisser !== null && (
                        <a href={item.dismisser.url} className={classes.link} rel="noopener noreferrer" target="_blank">
                          <Chip
                            avatar={<Avatar alt="Natacha" src={item.dismisser.avatarUrl} />}
                            size="small"
                            label={item.dismisser.login}
                            variant="outlined"
                          />
                        </a>
                      )}
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
