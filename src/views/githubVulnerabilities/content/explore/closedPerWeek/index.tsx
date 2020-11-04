import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryLine from '../../../../../components/charts/chartJS/historyLine';

const GQL_QUERY = loader('./getCreatedPerWeek.graphql');

interface Props {
  query: any;
  openWeek: (week: any) => void;
}

const ClosedPerWeek: React.FC<Props> = (props: Props) => {
  const { query, openWeek } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ calendarInterval: 'week' }),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    // Normalize the dataset (x points might not be the same)
    const datapoints: Array<string> = [];
    for (const item of data.githubVulnerabilities.data.createdAt.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }

    const dataseries: Array<any> = [];
    // Prep the data
    for (const x of datapoints) {
      const createdAt = data.githubVulnerabilities.data.createdAt.buckets.find((item: any) => item.keyAsString === x);
      dataseries.push({
        label: x,
        createdAt: createdAt !== undefined ? createdAt.docCount : 0,
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'New Vulnerabilities',
          data: dataseries.map((item: any) => item.createdAt),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'line',
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
