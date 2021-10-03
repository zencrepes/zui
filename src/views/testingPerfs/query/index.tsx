import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import Query from '../../../components/query';

const mapState = (state: iRootState) => ({
  query: state.testingPerfs.query,
  dataset: state.testingPerfs.dataset,
  queries: state.testingPerfs.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.testingPerfs.saveQuery,
  deleteQuery: dispatch.testingPerfs.deleteQuery,
  setSelectedTab: dispatch.testingPerfs.setSelectedTab,
  setQueries: dispatch.testingPerfs.setQueries,
  setQuery: dispatch.testingPerfs.setQuery,
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
