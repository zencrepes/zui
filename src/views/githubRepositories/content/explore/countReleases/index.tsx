import React from 'react';

import CountsBuckets from '../utils/countsBuckets';

interface Props {
  query: any;
  openQuery: Function;
}

const ReleasesCount: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const buckets = [
    {
      key: 'bucketA',
      name: '1 - 10',
      from: 1,
      to: 10,
    },
    {
      name: '11 - 25',
      key: 'bucketB',
      from: 11,
      to: 25,
    },
    {
      key: 'bucketC',
      name: '26 - 50',
      from: 26,
      to: 50,
    },
    {
      key: 'bucketD',
      name: '51 - 100',
      from: 51,
      to: 100,
    },
    {
      key: 'bucketE',
      name: '101 - 200',
      from: 101,
      to: 200,
    },
    {
      key: 'bucketF',
      name: '201 - 500',
      from: 201,
      to: 500,
    },
    {
      key: 'bucketG',
      name: '500+',
      from: 501,
      to: null,
    },
  ];

  return (
    <CountsBuckets
      headerTitle="Releases"
      headerFactTitle=""
      headerFactValue=""
      buckets={buckets}
      openQuery={openQuery}
      query={query}
      countField="releases.totalCount"
    />
  );
};

export default ReleasesCount;
