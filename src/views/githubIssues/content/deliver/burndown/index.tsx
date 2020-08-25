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
  sum: number;
  keyAsString: string;
}

const mapState = (state: iRootState) => ({
  queryVelocityDaily: state.githubIssues.queryVelocityDaily,
  queryCompletion: state.githubIssues.queryCompletion,
  defaultPoints: state.githubIssues.defaultPoints,
});

const mapDispatch = () => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Burndown: React.FC<connectedProps> = (props: connectedProps) => {
  const { queryVelocityDaily, queryCompletion, defaultPoints } = props;

  // This displays a chart containing:
  // - Points or count completed daily (bar)
  // - Burn down from first to last closed issues

  const open = queryCompletion.reduce((acc: number, current: any) => {
    if (current.key === 'OPEN') {
      if (defaultPoints) {
        return acc + current.count;
      }
      return acc + current.docCount;
    }
    return acc;
  }, 0);

  const completedDuringPeriod = queryVelocityDaily.reduce((acc: number, current: any) => {
    if (defaultPoints) {
      return acc + current.sum;
    }
    return acc + current.docCount;
  }, 0);

  let remaining = open + completedDuringPeriod;
  const burndown = queryVelocityDaily.map((b: BucketObj) => {
    const remainingBucket = remaining;
    if (defaultPoints) {
      remaining = remaining - b.sum;
    } else {
      remaining = remaining - b.docCount;
    }
    return {
      ...b,
      remaining: remainingBucket,
    };
  });

  const chartUnit = defaultPoints ? 'Points' : 'Issues';

  // If we're using points, we're also displaying issue count for information
  let datasetCount: any = [];
  if (defaultPoints) {
    datasetCount = [
      {
        label: 'Completed Issues',
        backgroundColor: '#67f321',
        borderColor: '#67f321',
        borderWidth: 2,
        data: [...burndown.map((d: any) => d.docCount), 0],
      },
    ];
  }

  const chartData = {
    datasets: [
      {
        label: 'Remaining ' + chartUnit,
        data: [...burndown.map((d: any) => d.remaining), open],
        backgroundColor: '#ef5350',
        fill: false,
        type: 'line',
      },
      {
        label: 'Completed ' + chartUnit,
        backgroundColor: '#64b5f6',
        borderColor: '#64b5f6',
        borderWidth: 2,
        data: [...burndown.map((d: any) => (defaultPoints ? d.sum : d.docCount)), 0],
      },
      ...datasetCount,
    ],
    labels: [...burndown.map((w: any) => format(parseISO(w.keyAsString), 'LLL do yyyy')), 'End'],
  };

  return (
    <Card headerTitle="Burndown" headerFactTitle="" headerFactValue="">
      <VelocityChart data={chartData} />
      {queryVelocityDaily.length > 100 && (
        <Typography variant="caption" display="block" gutterBottom>
          You seem to be having a lot of data points, try narrowing your dataset for better display.
        </Typography>
      )}
    </Card>
  );
};

export default connect(mapState, mapDispatch)(Burndown);
