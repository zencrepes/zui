import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import Query from '../../../components/query';

const mapState = (state: iRootState) => ({
  query: state.testingCases.query,
  dataset: state.testingCases.dataset,
  queries: state.testingCases.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.testingCases.saveQuery,
  deleteQuery: dispatch.testingCases.deleteQuery,
  setSelectedTab: dispatch.testingCases.setSelectedTab,
  setQueries: dispatch.testingCases.setQueries,
  setQuery: dispatch.testingCases.setQuery,
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
