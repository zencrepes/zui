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
  openWeek: Function;
}

const RuntimePerWeek: React.FC<Props> = (props: Props) => {
  const { query, openWeek } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ calendarInterval: 'week', avgField: 'duration' }), // eslint-disable-line @typescript-eslint/camelcase
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    const dataserie = data.circleciInsights.data.aggregations.buckets;

    const chartData = {
      datasets: [
        {
          label: 'Runtime (seconds)',
          data: dataserie.map((item: any) => item.avg),
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
      <CustomCard headerTitle="Average run time each week" headerFactTitle="" headerFactValue="">
        <HistoryLine chartData={chartData} dataset={dataserie} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default RuntimePerWeek;
