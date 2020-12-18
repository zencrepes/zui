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
    // Prep the data
    for (const x of datapoints) {
      const startedAt = data.bambooRuns.data.allRuns.buckets.find((item: any) => item.keyAsString === x);
      dataseriesSuccess.push({
        state: x,
        startedAt: startedAt !== undefined ? startedAt.sum : 0,
      });
    }

    const dataseriesFailure: Array<any> = [];
    // Prep the data
    for (const x of datapoints) {
      const startedAt = data.bambooRuns.data.failedRuns.buckets.find((item: any) => item.keyAsString === x);
      dataseriesFailure.push({
        state: x,
        startedAt: startedAt !== undefined ? startedAt.sum : 0,
      });
    }

    const chartData = {
      datasets: [
        {
          label: 'Successful (count)',
          data: dataseriesSuccess.map((item: any) => item.startedAt),
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'bar',
          fill: false,
        },
        {
          label: 'Failed (count)',
          data: dataseriesFailure.map((item: any) => item.startedAt),
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'bar',
          fill: false,
        },
      ],
      labels: dataseriesSuccess.map((item: any) => format(parseISO(item.state), 'LLL do yyyy')),
    };

    return (
      <CustomCard headerTitle="Tests Executed per week" headerFactTitle="" headerFactValue="">
        <HistoryLine chartData={chartData} dataset={dataseriesSuccess} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default PerWeek;
