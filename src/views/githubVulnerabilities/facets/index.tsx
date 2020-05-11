import React from 'react';
import { loader } from 'graphql.macro';

import { connect } from 'react-redux';

import { iRootState } from '../../../store';

import Facets from '../../../components/facets';

const gqlAggregationData = loader('./getTermFacetData.graphql');
const gqlMetricsFacet = loader('./getMetricsFacetData.graphql');

interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
  nullFilter: string;
  default: boolean;
}

interface Props {
  facets: Facet[];
  pushNewQuery: Function;
}

const mapState = (state: iRootState) => ({
  defaultPoints: state.githubVulnerabilities.defaultPoints,
  dataset: state.githubVulnerabilities.dataset,
  query: state.githubVulnerabilities.query,
});

const mapDispatch = () => ({});

type connectedProps = Props & ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const FacetsHoc: React.FC<connectedProps> = (props: connectedProps) => {
  const { facets, defaultPoints, dataset, query, pushNewQuery } = props;

  return (
    <Facets
      facets={facets}
      defaultPoints={defaultPoints}
      dataset={dataset}
      query={query}
      gqlAggregationData={gqlAggregationData}
      gqlMetricsFacet={gqlMetricsFacet}
      unit={'Vulns'}
      pushNewQuery={pushNewQuery}
    />
  );
};

export default connect(mapState, mapDispatch)(FacetsHoc);
