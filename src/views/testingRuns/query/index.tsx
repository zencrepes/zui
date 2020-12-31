import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import Query from '../../../components/query';

const mapState = (state: iRootState) => ({
  query: state.testingRuns.query,
  dataset: state.testingRuns.dataset,
  queries: state.testingRuns.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.testingRuns.saveQuery,
  deleteQuery: dispatch.testingRuns.deleteQuery,
  setSelectedTab: dispatch.testingRuns.setSelectedTab,
  setQueries: dispatch.testingRuns.setQueries,
  setQuery: dispatch.testingRuns.setQuery,
});

interface Props {
  facets: Array<Facet>;
}

interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
  nullFilter: string;
  default: boolean;
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
