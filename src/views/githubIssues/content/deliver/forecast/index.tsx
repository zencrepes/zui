import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Card from '../../../../../components/customCard';

import { iRootState } from '../../../../../store';

const GQL_QUERY = loader('../../../graphql/getForecast.graphql');

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
  queryCompletion: state.githubIssues.queryCompletion,
  defaultPoints: state.githubIssues.defaultPoints,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Forecast: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, queryCompletion, defaultPoints } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
    },
    fetchPolicy: 'cache-and-network',
  });
  const remaining: any = queryCompletion.filter((q: any) => q.key === 'OPEN');
  if (data === undefined || queryCompletion.length <= 0) {
    return null;
  }

  const remainingPoints = remaining.length !== 1 ? 0 : remaining[0].count;
  const remainingIssues = remaining.length !== 1 ? 0 : remaining[0].docCount;
  const chartUnit = defaultPoints ? 'Points' : 'Issues';

  return (
    <Card
      headerTitle="Forecast"
      headerFactTitle={'Remaining ' + chartUnit}
      headerFactValue={defaultPoints ? remainingPoints : remainingIssues}
    >
      <Table aria-label="Velocity Table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Moving Avg</TableCell>
            <TableCell>Velocity</TableCell>
            <TableCell align="right">Time to Completion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.githubIssues.data.oneWeek.current !== null && (
            <TableRow>
              <TableCell component="th" scope="row">
                1 week
              </TableCell>
              <TableCell component="th" scope="row">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.oneWeek.current.points.moving)} pts/week
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.oneWeek.current.issues.moving)} issues/week
                  </React.Fragment>
                )}
              </TableCell>
              <TableCell align="right">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.oneWeek.current.points.moving) * 5)} days
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.oneWeek.current.issues.moving) * 5)} days
                  </React.Fragment>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableBody>
          {data.githubIssues.data.twoWeeks.current !== null && (
            <TableRow>
              <TableCell component="th" scope="row">
                2 weeks
              </TableCell>
              <TableCell component="th" scope="row">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.twoWeeks.current.points.moving)} pts/week
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.twoWeeks.current.issues.moving)} issues/week
                  </React.Fragment>
                )}
              </TableCell>
              <TableCell align="right">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.twoWeeks.current.points.moving) * 5)} days
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.twoWeeks.current.issues.moving) * 5)} days
                  </React.Fragment>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableBody>
          {data.githubIssues.data.fourWeeks.current !== null && (
            <TableRow>
              <TableCell component="th" scope="row">
                4 weeks
              </TableCell>
              <TableCell component="th" scope="row">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.fourWeeks.current.points.moving)} pts/week
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.fourWeeks.current.issues.moving)} issues/week
                  </React.Fragment>
                )}
              </TableCell>
              <TableCell align="right">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.fourWeeks.current.points.moving) * 5)} days
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.fourWeeks.current.issues.moving) * 5)} days
                  </React.Fragment>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableBody>
          {data.githubIssues.data.twelveWeeks.current !== null && (
            <TableRow>
              <TableCell component="th" scope="row">
                12 weeks
              </TableCell>
              <TableCell component="th" scope="row">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.twelveWeeks.current.points.moving)} pts/week
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round(data.githubIssues.data.twelveWeeks.current.issues.moving)} issues/week
                  </React.Fragment>
                )}
              </TableCell>
              <TableCell align="right">
                {defaultPoints ? (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.twelveWeeks.current.points.moving) * 5)} days
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {Math.round((remainingPoints / data.githubIssues.data.twelveWeeks.current.issues.moving) * 5)} days
                  </React.Fragment>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default connect(mapState, mapDispatch)(Forecast);
