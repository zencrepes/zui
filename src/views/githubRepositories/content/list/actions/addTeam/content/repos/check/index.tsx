import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../../../../store';

const gqlRepos = loader('./getRepos.graphql');

const mapState = (state: iRootState) => ({
  query: state.githubRepositories.query,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateReposAvailable: dispatch.githubRepositories.setUpdateReposAvailable,
  setUpdateReposSelected: dispatch.githubRepositories.setUpdateReposSelected,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ReposCheck: React.FC<connectedProps> = (props: connectedProps) => {
  const { query, setUpdateReposSelected, setUpdateReposAvailable } = props;

  let reposAvailable: any = [];
  let reposSelected: any = [];

  const { data } = useQuery(gqlRepos, {
    variables: {
      query: JSON.stringify(query),
    },
    fetchPolicy: 'cache-and-network',
  });

  if (data !== undefined) {
    reposAvailable = data.repos.data.items.nodes.filter((r: any) => r.isArchived === false);
    reposSelected = reposAvailable.filter(
      (r: any) => data.selectedRepos.data.aggregations.buckets.find((s: any) => s.key === r.id) !== undefined,
    );
  }

  useEffect(() => {
    setUpdateReposAvailable(reposAvailable);
    setUpdateReposSelected(reposSelected);
  });

  return null;
};
export default connect(mapState, mapDispatch)(ReposCheck);
