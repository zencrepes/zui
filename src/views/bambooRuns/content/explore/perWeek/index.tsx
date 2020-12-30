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
    for (const item of data.bambooRuns.data.allRuns.buckets) {
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
      const startedAtSuccess = data.bambooRuns.data.allRuns.buckets.find((item: any) => item.keyAsString === x);
      dataseriesSuccess.push({
        state: x,
        startedAt: startedAtSuccess !== undefined ? startedAtSuccess.sum : 0,
      });

      const startedAtFailed = data.bambooRuns.data.failedRuns.buckets.find((item: any) => item.keyAsString === x);
      dataseriesFailure.push({
        state: x,
        startedAt: startedAtFailed !== undefined ? startedAtFailed.sum : 0,
      });

      dataseriesTotal.push({
        state: x,
        startedAt: startedAtFailed.sum + startedAtSuccess.sum,
      });

      dataseriesPrctFailure.push({
        state: x,
        startedAt: Math.round((startedAtFailed.sum * 100) / (startedAtFailed.sum + startedAtSuccess.sum)),
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'Failure rate (%)',
          data: dataseriesPrctFailure.map((item: any) => item.startedAt),
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
          data: dataseriesTotal.map((item: any) => item.startedAt),
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
