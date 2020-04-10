import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryLine from '../../../../../components/charts/chartsJS/historyLine';

const PRWEEK_QUERY = loader('./getPrsClosedPerDay.graphql');

interface Props {
  query: any;
}

const ClosedPerWeek: React.FC<Props> = (props: Props) => {
  const { query } = props;

  const { data } = useQuery(PRWEEK_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggsOptions: JSON.stringify({ calendar_interval: 'week' }), // eslint-disable-line @typescript-eslint/camelcase
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    console.log(data);
    // Normalize the dataset (x points might not be the same)
    const datapoints: Array<string> = [];
    for (const item of data.githubPullrequests.data.createdAt.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }

    const dataseries: Array<any> = [];
    // Prep the data
    for (const x of datapoints) {
      const createdAt = data.githubPullrequests.data.createdAt.buckets.find((item: any) => item.keyAsString === x);
      const closedAt = data.githubPullrequests.data.closedAt.buckets.find((item: any) => item.keyAsString === x);
      dataseries.push({
        label: x,
        createdAt: createdAt !== undefined ? createdAt.docCount : 0,
        closedAt: closedAt !== undefined ? closedAt.docCount : 0,
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'PRs Created',
          data: dataseries.map((item: any) => item.createdAt),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          type: 'line',
          fill: false,
        },
        {
          label: 'PRs Closed',
          data: dataseries.map((item: any) => item.closedAt),
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          type: 'line',
          pointRadius: 0,
          fill: false,
        },
      ],
      labels: dataseries.map((item: any) => format(parseISO(item.label), 'LLL do yyyy')),
    };

    console.log(chartData);
    return (
      <CustomCard headerTitle="Activity per week" headerFactTitle="" headerFactValue="">
        <HistoryLine chartData={chartData} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default ClosedPerWeek;
