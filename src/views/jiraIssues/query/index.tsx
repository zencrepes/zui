import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../store';
import { Facet } from '../../../global';
import Query from '../../../components/query';

const mapState = (state: iRootState) => ({
  query: state.jiraIssues.query,
  dataset: state.jiraIssues.dataset,
  queries: state.jiraIssues.queries,
  dexieDb: state.global.dexieDb,
});

const mapDispatch = (dispatch: any) => ({
  saveQuery: dispatch.jiraIssues.saveQuery,
  deleteQuery: dispatch.jiraIssues.deleteQuery,
  setSelectedTab: dispatch.jiraIssues.setSelectedTab,
  setQueries: dispatch.jiraIssues.setQueries,
  setQuery: dispatch.jiraIssues.setQuery,
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
