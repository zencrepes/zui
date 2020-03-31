import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import Layout from './layout';
import { Facet } from './types';

const TERMFACET_QUERY = loader('./getTermFacetData.graphql');

interface Props {
  facet: Facet;
  defaultPoints: boolean;
}

const TermFacet: React.FC<Props> = (props: Props) => {
  const { facet, defaultPoints } = props;

  const clickedFacetItem = (key: string) => {
    console.log('User clicked on: ', key);
  };

  const selectedValue: string[] = [];

  console.log(facet.field);
  const { data } = useQuery(TERMFACET_QUERY, {
    variables: {
      field: facet.field,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (data !== undefined) {
    console.log(data);
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