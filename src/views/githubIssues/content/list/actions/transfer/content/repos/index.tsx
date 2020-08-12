import React from 'react';
import { connect } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { iRootState } from '../../../../../../../../store';
import CheckPermission from './checkPermission';

interface Props {
  reposAvailable: { value: string; label: string };
  updateReposSelected: string[];
}

interface GitHubRepo {
  id: string;
  name: string;
  owner: {
    login: string;
  };
}

const mapState = (state: iRootState) => ({
  reposAvailable: state.githubIssues.reposAvailable,
  updateTransferSelectedRepoId: state.githubIssues.updateTransferSelectedRepoId,
  githubToken: state.global.githubToken,
  githubClient: state.global.githubClient,
});

const mapDispatch = (dispatch: any) => ({
  setUpdateTransferSelectedRepoId: dispatch.githubIssues.setUpdateTransferSelectedRepoId,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Selector: React.FC<connectedProps> = (props: connectedProps) => {
  const {
    githubToken,
    githubClient,
    reposAvailable,
    setUpdateTransferSelectedRepoId,
    updateTransferSelectedRepoId,
  } = props;

  const reposName = reposAvailable.map((repo: GitHubRepo) => repo.owner.login + '/' + repo.name).sort();
  let repoValue = null;
  const selectedRepo: any = reposAvailable.find((repo: GitHubRepo) => repo.id === updateTransferSelectedRepoId);
  if (selectedRepo !== undefined) {
    repoValue = selectedRepo.owner.login + '/' + selectedRepo.name;
  }

  if (githubToken !== null) {
    return (
      <React.Fragment>
        <Autocomplete
          id="combo-box-demo"
          options={reposName}
          getOptionLabel={(repo: any) => repo}
          style={{ width: 300 }}
          value={repoValue}
          onChange={(event: any, newValue: string | null) => {
            const foundRepo = reposAvailable.find((r: any) => r.owner.login + '/' + r.name === newValue);
            if (foundRepo !== undefined) {
              const selectedRepo: { id: string } = foundRepo;
              setUpdateTransferSelectedRepoId(selectedRepo.id);
            } else {
              setUpdateTransferSelectedRepoId('');
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select the destination repository" variant="outlined" />
          )}
        />
        <ApolloProvider client={githubClient}>
          <CheckPermission />
        </ApolloProvider>
      </React.Fragment>
    );
  } else {
    return null;
  }
};
export default connect(mapState, mapDispatch)(Selector);
