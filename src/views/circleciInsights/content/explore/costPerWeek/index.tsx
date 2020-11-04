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

const ClosedPerWeek: React.FC<Props> = (props: Props) => {
  const { query, openWeek } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ calendarInterval: 'week', sumField: 'credits_used' }),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    const dataserie = data.circleciInsights.data.aggregations.buckets;

    const chartData = {
      datasets: [
        {
          label: 'Credits Spent',
          data: dataserie.map((item: any) => item.sum),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'line',
          fill: false,
        },
      ],
      labels: dataserie.map((item: any) => format(parseISO(item.keyAsString), 'LLL do yyyy')),
    };

    return (
      <CustomCard headerTitle="Credits spent each week" headerFactTitle="" headerFactValue="">
        <HistoryLine chartData={chartData} dataset={dataserie} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default ClosedPerWeek;
