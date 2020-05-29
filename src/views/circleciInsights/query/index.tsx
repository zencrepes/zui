import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import { Facet } from '../../../global';
import Query from '../../../components/query';

const mapState = (state: iRootState) => ({
  query: state.circleciInsights.query,
  dataset: state.circleciInsights.dataset,
  queries: state.circleciInsights.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.circleciInsights.saveQuery,
  deleteQuery: dispatch.circleciInsights.deleteQuery,
  setSelectedTab: dispatch.circleciInsights.setSelectedTab,
  setQueries: dispatch.circleciInsights.setQueries,
  setQuery: dispatch.circleciInsights.setQuery,
});

interface Props {
  facets: Array<Facet>;
}

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & Props;

const QueryHoc: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, facets, dexieDb, dataset, setQueries, queries } = props;

  return (
    <Query
      query={query}
      facets={facets}
      dexieDb={dexieDb}
      dataset={dataset}
      setQueries={setQueries}
      queries={queries}
    />
  );
};

export default connect(mapState, mapDispatch)(QueryHoc);
