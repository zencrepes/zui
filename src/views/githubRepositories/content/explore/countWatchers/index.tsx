import React from 'react';

import CountsBuckets from '../utils/countsBuckets';

interface Props {
  query: any;
  openQuery: (query: any) => void;
}

const CountWatchers: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const buckets = [
    {
      key: 'bucketA',
      name: '1 - 10',
      from: 1,
      to: 10,
    },
    {
      name: '11 - 20',
      key: 'bucketB',
      from: 11,
      to: 20,
    },
    {
      key: 'bucketC',
      name: '21 - 30',
      from: 21,
      to: 30,
    },
    {
      key: 'bucketD',
      name: '31 - 40',
      from: 31,
      to: 40,
    },
    {
      key: 'bucketE',
      name: '41 - 50',
      from: 41,
      to: 50,
    },
    {
      key: 'bucketF',
      name: '51 - 100',
      from: 51,
      to: 100,
    },
    {
      key: 'bucketG',
      name: '100+',
      from: 101,
      to: null,
    },
  ];

  return (
    <CountsBuckets
      headerTitle="Watchers"
      headerFactTitle=""
      headerFactValue=""
      buckets={buckets}
      openQuery={openQuery}
      query={query}
      countField="watchers.totalCount"
    />
  );
};

export default CountWatchers;
