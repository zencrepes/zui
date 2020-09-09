import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import DataCard from '../../../../../components/dataCard';

import AggregationTree from '../../../../../components/charts/nivo/aggregationTree';

const OPENBYREPO_QUERY = loader('../../../graphql/getOpenByRepo.graphql');

interface Props {
  query: any;
  openQuery: (newQuery: any) => void;
}

const buildByAggClickQuery = (query: any, field: string, value: string) => {
  let updatedQuery: any = {};

  if (Object.keys(query).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [{ op: 'in', content: { field: field, value: [value] } }],
    };
  } else {
    updatedQuery = {
      ...query,
      content: [...query.content, ...[{ op: 'in', content: { field: field, value: [value] } }]],
    };
  }
  return updatedQuery;
};

const OpenByRepo: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const field = 'repository.name.keyword';

  const onAggClick = (key: string) => {
    const updatedQuery = buildByAggClickQuery(query, field, key);
    openQuery(updatedQuery);
  };

  const { data } = useQuery(OPENBYREPO_QUERY, {
    variables: {
      field: field,
      query: JSON.stringify(query),
    },
    fetchPolicy: 'no-cache',
  });
  if (data !== undefined && data.githubIssues.data !== undefined) {
    let buckets = data.githubIssues.data.aggregations.buckets;
    const srcBucketsSize = buckets.length;
    const maxBucketsToDisplay = 25;
    if (buckets.length > maxBucketsToDisplay) {
      buckets = buckets.slice(0, maxBucketsToDisplay);
    }
    return (
      <DataCard
        title={
          'Open Issues per Repository' +
          (srcBucketsSize > maxBucketsToDisplay ? ' (top ' + maxBucketsToDisplay + ')' : '')
        }
      >
        <AggregationTree buckets={buckets} onAggClick={onAggClick} />
      </DataCard>
    );
  }
  return <span>Loading data</span>;
};

export default OpenByRepo;
