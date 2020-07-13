import React from 'react';
import { connect } from 'react-redux';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import { iRootState } from '../../../../../../../store';

import Selector from './selector';

const gqlRepos = loader('./getRepos.graphql');

const mapState = (state: iRootState) => ({ query: state.githubLabels.query });

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

  if (data === undefined) {
    return <p>Loading..., please wait</p>;
  } else {
    if (data.repos.data.count === 0) {
      return <p>Please make sure repositories are loaded in ZenCrepes</p>;
    }
    // const reposAvailable = console.log(data);
    const reposAvailable = data.repos.data.items.nodes.map((r: any) => {
      return { ...r, value: r.id, label: r.owner.login + '/' + r.name, name: r.name };
    });
    const reposSelected = reposAvailable.filter(
      (r: any) => data.selectedRepos.data.aggregations.buckets.find((s: any) => s.key === r.value) !== undefined,
    );
    setUpdateReposAvailable(reposAvailable);
    setUpdateReposSelected(reposSelected);
    return (
      <React.Fragment>
        <span>Select repos</span>
        <Selector />
      </React.Fragment>
    );
  }
};
export default connect(mapState, mapDispatch)(Repos);
