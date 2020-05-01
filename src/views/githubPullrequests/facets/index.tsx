import React from 'react';
import { loader } from 'graphql.macro';

import { connect } from 'react-redux';

import { iRootState } from '../../../store';

import Facets from '../../../components/facets';

const gqlTermFacet = loader('./getTermFacetData.graphql');
const gqlMetricsFacet = loader('./getMetricsFacetData.graphql');

interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
  default: boolean;
}

interface Props {
  facets: Facet[];
}

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubPullrequests.defaultPoints,
  dataset: state.githubPullrequests.dataset,
  query: state.githubPullrequests.query,
});

const mapDispatch = () => ({});

type connectedProps = Props & ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const FacetsHoc: React.FC<connectedProps> = (props: connectedProps) => {
  const { facets, defaultPoints, dataset, query } = props;

  return (
    <Facets
      facets={facets}
      defaultPoints={defaultPoints}
      dataset={dataset}
      query={query}
      gqlTermFacet={gqlTermFacet}
      gqlMetricsFacet={gqlMetricsFacet}
      unit={'PRs'}
    />
  );
};

export default connect(mapState, mapDispatch)(FacetsHoc);
