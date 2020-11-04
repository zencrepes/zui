import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import randomColor from 'randomcolor';
import _ from 'lodash';
import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import HistoryLine from '../../../../../components/charts/chartJS/historyLine';

const GQL_QUERY = loader('./getPerWeek.graphql');

interface Props {
  query: any;
  compareField: string;
  headerTitle: string;
  aggOptions: any;
  valueField: string;
  openWeek: (week: any) => void;
}

const CompareJobCost: React.FC<Props> = (props: Props) => {
  const { query, compareField, headerTitle, aggOptions, valueField, openWeek } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      query: JSON.stringify(query),
      compareField: compareField,
      aggOptions: JSON.stringify(aggOptions),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    // Normalize the dataset (x points might not be the same)
    let datapoints: Array<string> = [];
    const compareItems = data.circleciInsights.data.matrixAggregations.nodes;
    for (const item of compareItems) {
      for (const itemWeek of item.buckets) {
        if (!datapoints.includes(itemWeek.keyAsString)) {
          datapoints.push(itemWeek.keyAsString);
        }
      }
    }
    datapoints = datapoints.sort();

    const chartData = {
      datasets: compareItems.map((item: any) => {
        const dataseries: Array<any> = [];
        // Prep the data
        for (const x of datapoints) {
          const bucket = item.buckets.find((item: any) => item.keyAsString === x);
          dataseries.push({
            label: x,
            value: bucket !== undefined ? Math.round(_.get(bucket, valueField)) : 0,
          });
        }
        const color = randomColor({
          luminosity: 'light',
          format: 'rgb', // e.g. 'rgb(225,200,20)'
          seed: item.compareValue,
        });
        return {
          label: item.compareValue,
          data: dataseries.map((item: any) => item.value),
          borderColor: color,
          backgroundColor: color,
          pointRadius: 0,
          pointHitRadius: 5,
          type: 'line',
          fill: false,
        };
      }),
      labels: datapoints.map((date: any) => format(parseISO(date), 'LLL do yyyy')),
    };
    return (
      <CustomCard headerTitle={headerTitle} headerFactTitle="Top 10" headerFactValue="">
        <HistoryLine chartData={chartData} dataset={datapoints} openClick={openWeek} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default CompareJobCost;
