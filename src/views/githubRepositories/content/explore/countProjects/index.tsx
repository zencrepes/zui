import React from 'react';

import CountsBuckets from '../utils/countsBuckets';

interface Props {
  query: any;
  openQuery: Function;
}

const CountProjects: React.FC<Props> = (props: Props) => {
  const { query, openQuery } = props;

  const buckets = [
    {
      key: 'bucketA',
      name: '1 - 2',
      from: 1,
      to: 2,
    },
    {
      name: '3 - 5',
      key: 'bucketB',
      from: 3,
      to: 5,
    },
    {
      key: 'bucketC',
      name: '6 - 10',
      from: 6,
      to: 10,
    },
    {
      key: 'bucketD',
      name: '11 - 20',
      from: 11,
      to: 20,
    },
    {
      key: 'bucketE',
      name: '21 - 30',
      from: 21,
      to: 30,
    },
    {
      key: 'bucketF',
      name: '31 - 40',
      from: 31,
      to: 40,
    },
    {
      key: 'bucketG',
      name: '40+',
      from: 41,
      to: null,
    },
  ];

  return (
    <CountsBuckets
      headerTitle="Projects"
      headerFactTitle=""
      headerFactValue=""
      buckets={buckets}
      openQuery={openQuery}
      query={query}
      countField="projects.totalCount"
    />
  );
};

export default CountProjects;
