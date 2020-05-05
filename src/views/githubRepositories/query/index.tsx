import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import Query from '../../../components/query';

const mapState = (state: iRootState) => ({
  query: state.githubRepositories.query,
  dataset: state.githubRepositories.dataset,
  queries: state.githubRepositories.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.githubRepositories.saveQuery,
  deleteQuery: dispatch.githubRepositories.deleteQuery,
  setSelectedTab: dispatch.githubRepositories.setSelectedTab,
  setQueries: dispatch.githubRepositories.setQueries,
  setQuery: dispatch.githubRepositories.setQuery,
});

interface Props {
  facets: Array<Facet>;
}

interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
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
