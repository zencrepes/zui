import React from 'react';
import { connect } from 'react-redux';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Typography from '@material-ui/core/Typography';

import Card from '../../../../../components/customCard';
import VelocityChart from '../../../../../components/charts/chartJS/velocityChart';

import { iRootState } from '../../../../../store';

interface BucketObj {
  key: string;
  count: number;
  docCount: number;
}

const mapState = (state: iRootState) => ({
  queryVelocity: state.githubIssues.queryVelocity,
  defaultPoints: state.githubIssues.defaultPoints,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Velocity: React.FC<connectedProps> = (props: connectedProps) => {
  const { queryVelocity, defaultPoints } = props;

  const velocity: any = queryVelocity;
  if (Object.values(velocity).length === 0) {
    return (
      <Card headerTitle="Velocity" headerFactTitle="" headerFactValue="">
        <span>Loading data</span>
      </Card>
    );
  }

  const chartUnit = defaultPoints ? 'Points' : 'Issues';

  const chartData = {
    datasets: [
      {
        label: 'Moving average in ' + chartUnit,
        data: velocity.items.map((d: any) => (defaultPoints ? d.issues.moving : d.points.moving)),
        backgroundColor: '#ef5350',
        fill: false,
        type: 'line',
      },
      {
        label: 'Completed ' + chartUnit,
        backgroundColor: '#64b5f6',
        borderColor: '#64b5f6',
        borderWidth: 2,
        data: velocity.items.map((d: any) => (defaultPoints ? d.issues.sum : d.points.sum)),
      },
    ],
    labels: velocity.items.map((d: any) => format(parseISO(d.date), 'LLL do yyyy')),
  };

  return (
    <Card headerTitle="Velocity" headerFactTitle="" headerFactValue="">
      {Object.values(velocity).length > 0 && (
        <React.Fragment>
          <VelocityChart data={chartData} />
          <Typography variant="caption" display="block" gutterBottom>
            Velocity calculated from an aggregate of {velocity.assignees.length} assignees:{' '}
            {velocity.assignees.slice(0, 5).map((a: any) => {
              return (
                <React.Fragment key={a.login}>
                  <a href={'https://github.com/' + a.login} target="_blank" rel="noopener noreferrer">
                    {a.login}
                  </a>{' '}
                </React.Fragment>
              );
            })}
            {velocity.assignees.length > 5 && <i>and {velocity.assignees.length - 5} more...</i>}
          </Typography>
        </React.Fragment>
      )}
    </Card>
  );
};

export default connect(mapState, mapDispatch)(Velocity);
