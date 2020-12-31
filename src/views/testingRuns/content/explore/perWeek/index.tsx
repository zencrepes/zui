import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryLineDual from './historyLineDual';

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
      aggOptionsAllRuns: JSON.stringify({ calendarInterval: 'week', sumField: 'runSuccess' }),
      aggOptionsFailedRuns: JSON.stringify({ calendarInterval: 'week', sumField: 'runFailure' }),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    // Normalize the dataset (x points might not be the same)
    const datapoints: Array<string> = [];
    for (const item of data.testingRuns.data.allRuns.buckets) {
      if (!datapoints.includes(item.keyAsString)) {
        datapoints.push(item.keyAsString);
      }
    }

    const dataseriesSuccess: Array<any> = [];
    const dataseriesFailure: Array<any> = [];
    const dataseriesTotal: Array<any> = [];
    const dataseriesPrctFailure: Array<any> = [];
    // Prep the data
    for (const x of datapoints) {
      const createdAtSuccess = data.testingRuns.data.allRuns.buckets.find((item: any) => item.keyAsString === x);
      dataseriesSuccess.push({
        state: x,
        createdAt: createdAtSuccess !== undefined ? createdAtSuccess.sum : 0,
      });

      const createdAtFailed = data.testingRuns.data.failedRuns.buckets.find((item: any) => item.keyAsString === x);
      dataseriesFailure.push({
        state: x,
        createdAt: createdAtFailed !== undefined ? createdAtFailed.sum : 0,
      });

      dataseriesTotal.push({
        state: x,
        createdAt: createdAtFailed.sum + createdAtSuccess.sum,
      });

      dataseriesPrctFailure.push({
        state: x,
        createdAt: Math.round((createdAtFailed.sum * 100) / (createdAtFailed.sum + createdAtSuccess.sum)),
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'Failure rate (%)',
          data: dataseriesPrctFailure.map((item: any) => item.createdAt),
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          type: 'line',
          pointRadius: 0,
          pointHitRadius: 5,
          fill: false,
          yAxisID: 'yright',
        },
        {
          label: 'Executed tests',
          data: dataseriesTotal.map((item: any) => item.createdAt),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'bar',
          fill: false,
          yAxisID: 'yleft',
        },
      ],
      labels: dataseriesSuccess.map((item: any) => format(parseISO(item.state), 'LLL do yyyy')),
    };

    return (
      <CustomCard headerTitle="Tests Executed per week" headerFactTitle="" headerFactValue="">
        <HistoryLineDual chartData={chartData} dataset={dataseriesSuccess} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default PerWeek;
