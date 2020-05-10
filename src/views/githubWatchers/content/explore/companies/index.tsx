import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';
import AggregationBubble from '../../../../../components/charts/nivo/aggregationBubble';

const GQL_QUERY = loader('./gqlQuery.graphql');

interface Props {
  query: any;
  openQuery: Function;
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

const Company: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const field = 'company.keyword';

  const onAggClick = (key: string) => {
    const updatedQuery = buildByAggClickQuery(query, field, key);
    openQuery(updatedQuery);
  };

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      field: field,
      aggOptions: JSON.stringify({ disjoint: false }),
      query: JSON.stringify(query),
    },
    fetchPolicy: 'no-cache',
  });
  if (
    data !== undefined &&
    data.githubWatchers.data !== undefined &&
    data.githubWatchers.data.aggregations !== undefined
  ) {
    const buckets = data.githubWatchers.data.aggregations.buckets.filter((b: any) => b.key !== '__missing__');
    return (
      <CustomCard headerTitle={'Companies'} headerFactTitle="" headerFactValue="">
        <AggregationBubble buckets={buckets} onAggClick={onAggClick} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default Company;
