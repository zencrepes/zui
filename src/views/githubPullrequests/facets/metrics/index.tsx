import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Layout from './layout';
import { Facet } from './types';

const METRICSFACET_QUERY = loader('./getMetricsFacetData.graphql');

interface Props {
  facet: Facet;
  defaultPoints: boolean;
  updateMetricsRange: Function;
  query: any;
}

const MetricsFacet: React.FC<Props> = (props: Props) => {
  const { facet, defaultPoints, updateMetricsRange, query } = props;

  //  const selectedValue: string[] = getFacetKeysInQuery(facet, query);

  const { data } = useQuery(METRICSFACET_QUERY, {
    variables: {
      field: facet.field,
      query: JSON.stringify(query),
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    return (
      <Layout
        facet={facet}
        metrics={data.githubPullrequests.data.metrics}
        updateMetricsRange={updateMetricsRange}
        defaultPoints={defaultPoints}
      />
    );
  }
  return null;
};

export default MetricsFacet;
