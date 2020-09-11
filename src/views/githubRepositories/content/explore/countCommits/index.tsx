import React from 'react';

import CountsBuckets from '../utils/countsBuckets';

interface Props {
  query: any;
  openQuery: (query: any) => void;
}

const CountCommits: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const buckets = [
    {
      key: 'bucketA',
      name: '1',
      from: 0,
      to: 1,
    },
    {
      name: '2 - 20',
      key: 'bucketB',
      from: 2,
      to: 20,
    },
    {
      key: 'bucketC',
      name: '21 - 250',
      from: 21,
      to: 250,
    },
    {
      key: 'bucketD',
      name: '251 - 1k',
      from: 251,
      to: 1000,
    },
    {
      key: 'bucketE',
      name: '1k - 2.5k',
      from: 1001,
      to: 2500,
    },
    {
      key: 'bucketF',
      name: '2.5k - 10k',
      from: 2501,
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
      headerTitle="Commits to Master"
      headerFactTitle=""
      headerFactValue=""
      buckets={buckets}
      openQuery={openQuery}
      query={query}
      countField="recentCommitsMaster.target.history.totalCount"
    />
  );
};

export default CountCommits;
