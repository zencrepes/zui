import React from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../../store';

const gqlRepos = loader('./getRepos.graphql');

const mapState = (state: iRootState) => ({
  query: state.githubLabels.query,
});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
  setUpdateReposAvailable: dispatch.githubLabels.setUpdateReposAvailable,
  setUpdateReposSelected: dispatch.githubLabels.setUpdateReposSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Repos: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, setUpdateReposSelected, setUpdateReposAvailable } = props;

  const { data } = useQuery(gqlRepos, {
    variables: {
      query: JSON.stringify(query),
    },
    fetchPolicy: 'cache-and-network',
  });

  if (data !== undefined) {
    const reposAvailable = data.repos.data.items.nodes;
    const reposSelected = reposAvailable.filter(
      (r: any) => data.selectedRepos.data.aggregations.buckets.find((s: any) => s.key === r.id) !== undefined,
    );
    setUpdateReposAvailable(reposAvailable);
    setUpdateReposSelected(reposSelected);
  }
  return null;
};
export default connect(mapState, mapDispatch)(Repos);
