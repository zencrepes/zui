import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryLine from '../../../../../components/charts/chartsJS/historyLine';

const GQL_QUERY = loader('./getPerWeek.graphql');

interface Props {
  query: any;
  openWeek: Function;
}

const ClosedPerWeek: React.FC<Props> = (props: Props) => {
  const { query, openWeek } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggsOptions: JSON.stringify({ calendar_interval: 'week', moving_window: 4 }), // eslint-disable-line @typescript-eslint/camelcase
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    // Normalize the dataset (x points might not be the same)
    const datapoints: Array<string> = [];
    for (const item of data.jiraIssues.data.closedAt.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }

    const dataseries: Array<any> = [];
    // Prep the data
    for (const x of datapoints) {
      const closedAt = data.jiraIssues.data.closedAt.buckets.find((item: any) => item.keyAsString === x);
      dataseries.push({
        label: x,
        closedAt: closedAt !== undefined ? closedAt.docCount : 0,
        closedAtAvg: closedAt !== undefined ? closedAt.docCountMovingAvg : 0,
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'Closed Issues',
          data: dataseries.map((item: any) => item.closedAt),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'bar',
          fill: false,
        },
        {
          label: 'Closed Issues (rolling average)',
          data: dataseries.map((item: any) => item.closedAtAvg),
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
      <CustomCard headerTitle="Activity per week" headerFactTitle="" headerFactValue="">
        <HistoryLine chartData={chartData} dataset={dataseries} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default ClosedPerWeek;
