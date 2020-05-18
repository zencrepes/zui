import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import { Facet } from '../../../global';
import Query from '../../../components/query';

const mapState = (state: iRootState) => ({
  query: state.circleciPipelines.query,
  dataset: state.circleciPipelines.dataset,
  queries: state.circleciPipelines.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.circleciPipelines.saveQuery,
  deleteQuery: dispatch.circleciPipelines.deleteQuery,
  setSelectedTab: dispatch.circleciPipelines.setSelectedTab,
  setQueries: dispatch.circleciPipelines.setQueries,
  setQuery: dispatch.circleciPipelines.setQuery,
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
