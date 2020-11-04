import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

const gqlRepos = loader('../../../../../../graphql/getRepos.graphql');

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  setOpenEditModal: dispatch.githubIssues.setOpenEditModal,
  setReposAvailable: dispatch.githubIssues.setReposAvailable,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const ReposCheck: React.FC<connectedProps> = (props: connectedProps) => {
  const { setReposAvailable } = props;

  const { data } = useQuery(gqlRepos, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data !== undefined) {
      const reposAvailable = data.repos.data.items.nodes.filter((r: any) => r.isArchived === false);
      setReposAvailable(reposAvailable);
    }
  });

  return null;
};
export default connect(mapState, mapDispatch)(ReposCheck);
