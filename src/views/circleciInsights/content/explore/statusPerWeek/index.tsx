import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryStacked from '../../../../../components/charts/chartJS/historyStacked';

import { createTermFilter, addFilterToQuery } from '../../../../../utils/query';

const GQL_QUERY = loader('./getPerWeek.graphql');

interface Props {
  query: any;
  openWeek: Function;
}

const SuccessPerWeek: React.FC<Props> = (props: Props) => {
  const { query, openWeek } = props;

  const filterFailed = createTermFilter('in', 'status', ['failed']);
  const failedQuery = addFilterToQuery(filterFailed, query);
  const filterSuccess = createTermFilter('in', 'status', ['success']);
  const successQuery = addFilterToQuery(filterSuccess, query);

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      querySuccess: JSON.stringify(successQuery),
      queryFailed: JSON.stringify(failedQuery),
      aggOptions: JSON.stringify({ calendarInterval: 'day' }), // eslint-disable-line @typescript-eslint/camelcase
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    // Normalize the dataset (x points might not be the same)
    const datapoints: Array<string> = [];
    for (const item of data.circleciInsights.success.aggregations.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }
    for (const item of data.circleciInsights.failed.aggregations.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }

    const dataseries: Array<any> = [];
    // Prep the data
    for (const x of datapoints) {
      const success = data.circleciInsights.success.aggregations.buckets.find((item: any) => item.keyAsString === x);
      const failed = data.circleciInsights.failed.aggregations.buckets.find((item: any) => item.keyAsString === x);
      dataseries.push({
        label: x,
        success: success !== undefined ? success.docCount : 0,
        failed: failed !== undefined ? failed.docCount : 0,
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'Successful runs',
          data: dataseries.map((item: any) => item.success),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'bar',
          fill: false,
        },
        {
          label: 'Failed runs',
          data: dataseries.map((item: any) => item.failed),
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          type: 'bar',
          pointRadius: 0,
          pointHitRadius: 5,
          fill: false,
        },
      ],
      labels: dataseries.map((item: any) => format(parseISO(item.label), 'LLL do yyyy')),
    };

    return (
      <CustomCard headerTitle="Job runs each day" headerFactTitle="" headerFactValue="">
        <HistoryStacked chartData={chartData} dataset={dataseries} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default SuccessPerWeek;
