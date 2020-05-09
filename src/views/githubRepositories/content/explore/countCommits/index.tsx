import React from 'react';

import CountsBuckets from '../utils/countsBuckets';

interface Props {
  query: any;
  openQuery: Function;
}

const CountCommits: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const buckets = [
    {
      key: 'bucketA',
      name: '1 - 50',
      from: 1,
      to: 50,
    },
    {
      name: '51 - 500',
      key: 'bucketB',
      from: 51,
      to: 500,
    },
    {
      key: 'bucketC',
      name: '501 - 1,000',
      from: 501,
      to: 1000,
    },
    {
      key: 'bucketD',
      name: '1k - 2.5k',
      from: 1001,
      to: 2500,
    },
    {
      key: 'bucketE',
      name: '2.5k - 5k',
      from: 2501,
      to: 5000,
    },
    {
      key: 'bucketF',
      name: '5k - 10k',
      from: 5001,
      to: 10000,
    },
    {
      key: 'bucketG',
      name: '10k+',
      from: 10001,
      to: null,
    },
  ];

  return (
    <CountsBuckets
      headerTitle="Commits to Head"
      headerFactTitle=""
      headerFactValue=""
      buckets={buckets}
      openQuery={openQuery}
      query={query}
      countField="refs.totalCount"
    />
  );
};

export default CountCommits;
