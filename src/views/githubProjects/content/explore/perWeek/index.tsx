import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryLine from '../../../../../components/charts/chartJS/historyLine';

const GQL_QUERY = loader('./getPerWeek.graphql');

interface Props {
  query: any;
  openWeek: (week: any) => void;
}

const PerWeek: React.FC<Props> = (props: Props) => {
  const { query, openWeek } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ calendarInterval: 'week', movingWindow: 4 }),
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    // Normalize the dataset (x points might not be the same)
    const datapoints: Array<string> = [];
    for (const item of data.githubProjects.data.createdAt.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }

    const dataseries: Array<any> = [];
    // Prep the data
    for (const x of datapoints) {
      const createdAt = data.githubProjects.data.createdAt.buckets.find((item: any) => item.keyAsString === x);
      dataseries.push({
        project: x,
        createdAt: createdAt !== undefined ? createdAt.docCount : 0,
        createdAtAvg: createdAt !== undefined ? createdAt.moving : 0,
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'New Projects (count)',
          data: dataseries.map((item: any) => item.createdAt),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'bar',
          fill: false,
        },
        {
          label: 'New Projects (rolling average)',
          data: dataseries.map((item: any) => item.createdAtAvg),
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          type: 'line',
          pointRadius: 0,
          pointHitRadius: 5,
          fill: false,
        },
      ],
      labels: dataseries.map((item: any) => format(parseISO(item.project), 'LLL do yyyy')),
    };

    return (
      <CustomCard headerTitle="Activity per week" headerFactTitle="" headerFactValue="">
        <HistoryLine chartData={chartData} dataset={dataseries} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default PerWeek;
