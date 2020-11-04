import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';
import SimpleBar from '../../../../../components/charts/chartJS/simpleBar';

import { createTermFilter, addFilterToQuery } from '../../../../../utils/query';

const OPENEDDURING_QUERY = loader('./getOpenedDuring.graphql');

interface Props {
  query: any;
  openQuery: (query: any) => void;
}

const buildBucketQuery = (from: number, to: number | null, query: any) => {
  let updatedQuery: any = {};

  const filterOpen = createTermFilter('in', 'state', ['CLOSED', 'MERGED']);
  updatedQuery = addFilterToQuery(filterOpen, query);

  const filterFrom = createTermFilter('>=', 'openedDuring', from);
  updatedQuery = addFilterToQuery(filterFrom, updatedQuery);

  if (to !== null) {
    const filterTo = createTermFilter('<=', 'openedDuring', to);
    updatedQuery = addFilterToQuery(filterTo, updatedQuery);
  }

  return updatedQuery;
};

const getBucket = (buckets: Array<any>, key: string) => {
  const bucket = buckets.find((b: any) => b.key === key);
  if (bucket === undefined) {
    return {};
  }
  return bucket.query;
};

const OpenedDuring: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const buckets = [
    { name: '0 - 1 d', key: 'bucketQueryA', query: buildBucketQuery(0, 1, query), count: 0 },
    { name: '1 - 7 d', key: 'bucketQueryB', query: buildBucketQuery(2, 7, query), count: 0 },
    { name: '1 - 2 wks', key: 'bucketQueryC', query: buildBucketQuery(8, 14, query), count: 0 },
    { name: '2 - 4 wks', key: 'bucketQueryD', query: buildBucketQuery(15, 28, query), count: 15 },
    { name: '1 - 3 mths', key: 'bucketQueryE', query: buildBucketQuery(29, 90, query), count: 0 },
    { name: '3 - 6 mths', key: 'bucketQueryF', query: buildBucketQuery(91, 180, query), count: 23 },
    { name: '6+ mths', key: 'bucketQueryG', query: buildBucketQuery(181, null, query), count: 0 },
  ];

  const { data } = useQuery(OPENEDDURING_QUERY, {
    variables: {
      bucketQueryA: JSON.stringify(getBucket(buckets, 'bucketQueryA')),
      bucketQueryB: JSON.stringify(getBucket(buckets, 'bucketQueryB')),
      bucketQueryC: JSON.stringify(getBucket(buckets, 'bucketQueryC')),
      bucketQueryD: JSON.stringify(getBucket(buckets, 'bucketQueryD')),
      bucketQueryE: JSON.stringify(getBucket(buckets, 'bucketQueryE')),
      bucketQueryF: JSON.stringify(getBucket(buckets, 'bucketQueryF')),
      bucketQueryG: JSON.stringify(getBucket(buckets, 'bucketQueryG')),
    },
    fetchPolicy: 'network-only',
  });
  if (data !== undefined) {
    const chartData = {
      datasets: [
        {
          label: 'Number of PRs',
          backgroundColor: '#64b5f6',
          borderColor: '#64b5f6',
          borderWidth: 2,
          data: buckets.map((b: any) => data.githubPullrequests[b.key].items.totalCount),
        },
      ],
      labels: buckets.map((b: any) => b.name),
    };
    return (
      <CustomCard headerTitle="Have been opened during" headerFactTitle="Currently CLOSED" headerFactValue="">
        <SimpleBar chartData={chartData} buckets={buckets} openQuery={openQuery} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default OpenedDuring;
