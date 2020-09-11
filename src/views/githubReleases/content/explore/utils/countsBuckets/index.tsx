import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../../components/customCard';

import SimpleBar from '../../../../../../components/charts/chartJS/simpleBar';
import { createTermFilter, addFilterToQuery } from '../../../../../../utils/query';

const GQL_QUERY = loader('./getQuery.graphql');

interface Props {
  query: any;
  openQuery: (query: any) => void;
  countField: string;
  headerTitle: string;
  headerFactTitle: string;
  headerFactValue: string;
  buckets: any[];
}

const getBucket = (buckets: Array<any>, key: string) => {
  const bucket = buckets.find((b: any) => b.key === key);
  if (bucket === undefined) {
    return {};
  }
  return bucket.query;
};

const CountsBuckets: React.FC<Props> = (props: Props) => {
  const { query, openQuery, countField, headerTitle, headerFactTitle, headerFactValue, buckets } = props;

  const buildBucketQuery = (from: number | null, to: number | null, query: any) => {
    let updatedQuery: any = {};

    if (from !== null) {
      const filterFrom = createTermFilter('>=', countField, from);
      updatedQuery = addFilterToQuery(filterFrom, query);
    }
    if (to !== null) {
      const filterTo = createTermFilter('<=', countField, to);
      updatedQuery = addFilterToQuery(filterTo, updatedQuery);
    }
    return updatedQuery;
  };

  const prepBuckets = buckets.map((bucket: any) => {
    return {
      ...bucket,
      query: buildBucketQuery(bucket.from, bucket.to, query),
      count: 0,
    };
  });

  const { data } = useQuery(GQL_QUERY, {
    variables: {
      bucketA: JSON.stringify(getBucket(prepBuckets, 'bucketA')),
      bucketB: JSON.stringify(getBucket(prepBuckets, 'bucketB')),
      bucketC: JSON.stringify(getBucket(prepBuckets, 'bucketC')),
      bucketD: JSON.stringify(getBucket(prepBuckets, 'bucketD')),
      bucketE: JSON.stringify(getBucket(prepBuckets, 'bucketE')),
      bucketF: JSON.stringify(getBucket(prepBuckets, 'bucketF')),
      bucketG: JSON.stringify(getBucket(prepBuckets, 'bucketG')),
    },
    fetchPolicy: 'no-cache',
  });
  if (data !== undefined) {
    const chartData = {
      datasets: [
        {
          release: 'Number of Releases',
          backgroundColor: '#64b5f6',
          borderColor: '#64b5f6',
          borderWidth: 2,
          data: prepBuckets
            .filter((b: any) => data.githubReleases[b.key] !== undefined)
            .map((b: any) => data.githubReleases[b.key].items.totalCount),
        },
      ],
      releases: buckets.filter((b: any) => data.githubReleases[b.key] !== undefined).map((b: any) => b.name),
    };
    return (
      <CustomCard headerTitle={headerTitle} headerFactTitle={headerFactTitle} headerFactValue={headerFactValue}>
        <SimpleBar chartData={chartData} buckets={prepBuckets} openQuery={openQuery} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default CountsBuckets;
