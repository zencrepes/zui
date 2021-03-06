import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import DataCard from '../../../../../components/dataCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryLine from '../../../../../components/charts/chartJS/historyLine';

const PRWEEK_QUERY = loader('../../../graphql/getPrsClosedPerWeek.graphql');

interface Props {
  query: any;
  openWeek: (weekData: any) => void;
  defaultPoints: boolean;
}

const ClosedPerWeek: React.FC<Props> = (props: Props) => {
  const { query, openWeek, defaultPoints } = props;

  const { data } = useQuery(PRWEEK_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ calendarInterval: 'week', sumField: 'points' }),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    // Normalize the dataset (x points might not be the same)
    const datapoints: Array<string> = [];
    for (const item of data.githubIssues.data.createdAt.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }

    const dataseries: Array<any> = [];
    // Prep the data

    for (const x of datapoints) {
      const createdAt = data.githubIssues.data.createdAt.buckets.find((item: any) => item.keyAsString === x);
      const closedAt = data.githubIssues.data.closedAt.buckets.find((item: any) => item.keyAsString === x);
      if (defaultPoints) {
        dataseries.push({
          label: x,
          createdAt: createdAt !== undefined ? createdAt.sum : 0,
          closedAt: closedAt !== undefined ? closedAt.sum : 0,
        });
      } else {
        dataseries.push({
          label: x,
          createdAt: createdAt !== undefined ? createdAt.docCount : 0,
          closedAt: closedAt !== undefined ? closedAt.docCount : 0,
        });
      }
    }

    const unit = defaultPoints ? 'Points' : 'Issues';
    const chartData = {
      datasets: [
        {
          label: unit + ' Created',
          data: dataseries.map((item: any) => item.createdAt),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'line',
          fill: false,
        },
        {
          label: unit + ' Closed',
          data: dataseries.map((item: any) => item.closedAt),
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          type: 'line',
          pointRadius: 0,
          pointHitRadius: 5,
          fill: false,
        },
      ],
      labels: dataseries.map((item: any) => format(parseISO(item.label), 'LLL do yyyy')),
    };

    return (
      <DataCard title="Activity per week">
        <HistoryLine chartData={chartData} dataset={dataseries} openClick={openWeek} />
      </DataCard>
    );
  }
  return <span>Loading data</span>;
};

export default ClosedPerWeek;
