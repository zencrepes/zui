import React from 'react';
import { useQuery } from '@apollo/client';

import Layout from './layout';
import { Facet, FacetAggMetrics } from '../../../global';

interface Props {
  facet: Facet;
  defaultPoints: boolean;
  updateMetricsRange: (from: number, to: number, facet: Facet, metrics: FacetAggMetrics) => void;
  query: any;
  gqlMetricsFacet: any;
  dataset: string;
}

const MetricsFacet: React.FC<Props> = (props: Props) => {
  const { facet, defaultPoints, updateMetricsRange, query, gqlMetricsFacet, dataset } = props;

  const { data } = useQuery(gqlMetricsFacet, {
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
        metrics={data[dataset].data.metrics}
        updateMetricsRange={updateMetricsRange}
        defaultPoints={defaultPoints}
      />
    );
  }
  return null;
};

export default MetricsFacet;
