import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Layout from './layout';
import { Facet } from './types';

import { getFacetKeysInQuery } from '../../../../utils/query';

const TERMFACET_QUERY = loader('./getTermFacetData.graphql');

interface Props {
  facet: Facet;
  defaultPoints: boolean;
  addRemoveFacet: Function;
  query: any;
}

const TermFacet: React.FC<Props> = (props: Props) => {
  const { facet, defaultPoints, addRemoveFacet, query } = props;

  const clickedFacetItem = (key: string) => {
    console.log('User clicked on: ', key);
    addRemoveFacet(key, facet);
  };

  const selectedValue: string[] = getFacetKeysInQuery(facet, query);

  const { data } = useQuery(TERMFACET_QUERY, {
    variables: {
      field: facet.field,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    return (
      <Layout
        facet={facet}
        buckets={data.githubPullrequests.data.aggregations.buckets}
        clickedItem={clickedFacetItem}
        selectedValues={selectedValue}
        defaultPoints={defaultPoints}
      />
    );
  }
  return null;
};

export default TermFacet;
