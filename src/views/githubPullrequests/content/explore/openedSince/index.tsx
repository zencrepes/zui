import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomCard from '../../../../../components/customCard';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { sub } from 'date-fns';

import SimpleBar from '../../../../../components/charts/chartsJS/simpleBar';

const OPENEDSINCE_QUERY = loader('./getOpenedSince.graphql');

interface Props {
  query: any;
}

const buildBucketQuery = (from: Date, to: Date | null, query: any) => {
  let updatedQuery: any = {};

  if (Object.keys(query).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [],
    };
  } else {
    updatedQuery = { ...query };
  }
  const content = [
    { op: '>=', content: { field: 'createdAt', value: [from.toISOString()] } },
    { op: 'in', content: { field: 'state', value: ['OPEN'] } },
  ];
  if (to !== null) {
    content.push({ op: '<=', content: { field: 'createdAt', value: [to.toISOString()] } });
  }
  return {
    op: 'and',
    content: [...updatedQuery.content, ...content],
  };
};

const getBucket = (buckets: Array<any>, key: string) => {
  const bucket = buckets.find((b: any) => b.key === key);
  if (bucket === undefined) {
    return {};
  }
  return bucket.query;
};

const OpenedSince: React.FC<Props> = (props: Props) => {
  const { query } = props;

  const currentDate = new Date();

  const buckets = [
    {
      name: '0 - 1 d',
      key: 'bucketOpenSinceA',
      query: buildBucketQuery(currentDate, sub(currentDate, { days: 1 }), query),
      count: 0,
    },
    {
      name: '1 - 7 d',
      key: 'bucketOpenSinceB',
      query: buildBucketQuery(sub(currentDate, { days: 1, seconds: 1 }), sub(currentDate, { days: 7 }), query),
      count: 0,
    },
    {
      name: '1 - 2 wks',
      key: 'bucketOpenSinceC',
      query: buildBucketQuery(sub(currentDate, { days: 7, seconds: 1 }), sub(currentDate, { days: 14 }), query),
      count: 0,
    },
    {
      name: '2 - 4 wks',
      key: 'bucketOpenSinceD',
      query: buildBucketQuery(sub(currentDate, { days: 14, seconds: 1 }), sub(currentDate, { days: 28 }), query),
      count: 15,
    },
    {
      name: '1 - 3 mths',
      key: 'bucketOpenSinceE',
      query: buildBucketQuery(sub(currentDate, { days: 28, seconds: 1 }), sub(currentDate, { days: 90 }), query),
      count: 0,
    },
    {
      name: '3 - 6 mths',
      key: 'bucketOpenSinceF',
      query: buildBucketQuery(sub(currentDate, { days: 90, seconds: 1 }), sub(currentDate, { days: 180 }), query),
      count: 23,
    },
    {
      name: '6+ mths',
      key: 'bucketOpenSinceG',
      query: buildBucketQuery(sub(currentDate, { days: 180, seconds: 1 }), null, query),
      count: 0,
    },
  ];
  console.log(buckets);

  const { data } = useQuery(OPENEDSINCE_QUERY, {
    variables: {
      bucketOpenSinceA: JSON.stringify(getBucket(buckets, 'bucketOpenSinceA')),
      bucketOpenSinceB: JSON.stringify(getBucket(buckets, 'bucketOpenSinceB')),
      bucketOpenSinceC: JSON.stringify(getBucket(buckets, 'bucketOpenSinceC')),
      bucketOpenSinceD: JSON.stringify(getBucket(buckets, 'bucketOpenSinceD')),
      bucketOpenSinceE: JSON.stringify(getBucket(buckets, 'bucketOpenSinceE')),
      bucketOpenSinceF: JSON.stringify(getBucket(buckets, 'bucketOpenSinceF')),
      bucketOpenSinceG: JSON.stringify(getBucket(buckets, 'bucketOpenSinceG')),
    },
    fetchPolicy: 'no-cache',
  });
  if (data !== undefined) {
    console.log('query');
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
      <CustomCard headerTitle="Are open since" headerFactTitle="" headerFactValue="">
        <SimpleBar chartData={chartData} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default OpenedSince;
