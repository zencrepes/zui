import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import CustomCard from '../../../../../components/customCard';

import SimpleBar from '../../../../../components/charts/chartsJS/simpleBar';

const OPENEDSINCE_QUERY = loader('./getOpenedSince.graphql');

interface Props {
  query: any;
  buckets: Array<any>;
  openQuery: Function;
}

const getBucket = (buckets: Array<any>, key: string) => {
  const bucket = buckets.find((b: any) => b.key === key);
  if (bucket === undefined) {
    return {};
  }
  return bucket.query;
};

const OpenedSince: React.FC<Props> = (props: Props) => {
  const { buckets, openQuery } = props;

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
    const chartData = {
      datasets: [
        {
          label: 'Number of PRs',
          backgroundColor: '#64b5f6',
          borderColor: '#64b5f6',
          borderWidth: 2,
          data: buckets
            .filter((b: any) => data.githubIssues[b.key] !== undefined)
            .map((b: any) => data.githubIssues[b.key].items.totalCount),
        },
      ],
      labels: buckets.filter((b: any) => data.githubIssues[b.key] !== undefined).map((b: any) => b.name),
    };
    return (
      <CustomCard headerTitle="Have been opened for" headerFactTitle="Currently OPEN" headerFactValue="">
        <SimpleBar chartData={chartData} buckets={buckets} openQuery={openQuery} />
      </CustomCard>
    );
  }
  return <span>Loading data</span>;
};

export default OpenedSince;
