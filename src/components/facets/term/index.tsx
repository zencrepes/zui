import React from 'react';
import { useQuery } from '@apollo/client';

import Layout from './layout';
import { Facet } from '../../../global';

import { getFacetKeysInQuery } from '../../../utils/query';

interface Props {
  facet: Facet;
  defaultPoints: boolean;
  addRemoveFacet: Function;
  query: any;
  gqlAggregationData: any;
  dataset: string;
  unit: string;
}

const TermFacet: React.FC<Props> = (props: Props) => {
  const { facet, defaultPoints, addRemoveFacet, query, gqlAggregationData, dataset, unit } = props;

  const clickedFacetItem = (key: string) => {
    addRemoveFacet(key, facet);
  };

  const selectedValue: string[] = getFacetKeysInQuery(facet, query);

  const { data } = useQuery(gqlAggregationData, {
    variables: {
      field: facet.field,
      query: JSON.stringify(query),
      aggOptions: JSON.stringify({ points: defaultPoints }),
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined && data[dataset].data.aggregations.buckets.length > 0) {
    return (
      <Layout
        facet={facet}
        buckets={data[dataset].data.aggregations.buckets}
        clickedItem={clickedFacetItem}
        selectedValues={selectedValue}
        defaultPoints={defaultPoints}
        unit={unit}
      />
    );
  }
  return null;
};

export default TermFacet;
