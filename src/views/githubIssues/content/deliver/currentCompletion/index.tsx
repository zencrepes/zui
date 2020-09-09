import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import DataCard from '../../../../../components/dataCard';
import CompletionBar from '../../../../../components/charts/chartJS/completionBar';

import { iRootState } from '../../../../../store';

const GQL_QUERY = loader('../../../graphql/getAggsTermsData.graphql');

interface BucketObj {
  key: string;
  count: number;
  docCount: number;
}

const sortLabel = (a: any, b: any) => {
  // Use toUpperCase() to ignore character casing
  const keyA = a.label.toUpperCase();
  const keyB = b.label.toUpperCase();

  let comparison = 0;
  if (keyA > keyB) {
    comparison = 1;
  } else if (keyA < keyB) {
    comparison = -1;
  }
  return comparison;
};

const mapState = (state: iRootState) => ({
  query: state.githubIssues.query,
});

const mapDispatch = (dispatch: any) => ({
  setQueryCompletion: dispatch.githubIssues.setQueryCompletion,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const CurrentCompletion: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, setQueryCompletion } = props;

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      field: 'state',
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ points: true }),
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data !== undefined) {
      setQueryCompletion(data.githubIssues.data.aggregations.buckets);
    }
  });

  if (data === undefined) {
    return null;
  }

  const states = data.githubIssues.data.aggregations.buckets;
  if (states.length === 0) {
    return (
      <DataCard title="Completion">
        <span>No data available</span>
      </DataCard>
    );
  }
  const pointsTotal = states.map((s: BucketObj) => s.count).reduce((acc: number, count: number) => acc + count, 0);
  const countTotal = states.map((s: BucketObj) => s.docCount).reduce((acc: number, count: number) => acc + count, 0);

  const series = states.map((s: BucketObj) => {
    return {
      label: s.key,
      color: s.key === 'CLOSED' ? '#3f51b5' : '#ffffff',
      data: [
        { label: 'Count', count: s.docCount, total: countTotal },
        { label: 'Points', count: s.count, total: pointsTotal },
      ],
    };
  });
  series.sort(sortLabel);

  const chartData = {
    labels: series[0].data.map((d: any) => d.label),
    datasets: series.map((s: any) => {
      return {
        label: s.label,
        backgroundColor: s.color,
        borderColor: '#3f51b5',
        borderWidth: 1,
        data: s.data.map((d: any) => Math.round((d.count * 100) / d.total)),
        dataCount: s.data.map((d: any) => d.count),
      };
    }),
  };

  return (
    <DataCard title="Completion">
      <CompletionBar chartData={chartData} />
    </DataCard>
  );
};

export default connect(mapState, mapDispatch)(CurrentCompletion);
