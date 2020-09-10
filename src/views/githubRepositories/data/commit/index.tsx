import React from 'react';
import { connect } from 'react-redux';

import { iRootState } from '../../../../store';

import { Octokit } from '@octokit/rest';

const mapState = (state: iRootState) => ({
  githubClient: state.global.githubClient,
  chipLimit: state.chip.limit,
  chipCost: state.chip.cost,
  chipRemaining: state.chip.remaining,
  chipResetAt: state.chip.resetAt,

  loadFlag: state.githubRepositories.loadFlag,
  updateReposSelected: state.githubRepositories.updateReposSelected,
  editAction: state.githubRepositories.editAction,
  updateTeamSlug: state.githubRepositories.updateTeamSlug,
  updateTeamPermission: state.githubRepositories.updateTeamPermission,

  log: state.global.log,
  loading: state.loading.loading,
  onSuccess: state.loading.onSuccess,
  githubToken: state.global.githubToken,
});

const mapDispatch = (dispatch: any) => ({
  setLoadFlag: dispatch.githubRepositories.setLoadFlag,
  setOpenEditModal: dispatch.githubRepositories.setOpenEditModal,

  updateChip: dispatch.chip.updateChip,
  setRemaining: dispatch.chip.setRemaining,
  setLoading: dispatch.loading.setLoading,
  setLoadingMsg: dispatch.loading.setLoadingMsg,
  setLoadingMsgAlt: dispatch.loading.setLoadingMsgAlt,
  setLoadingModal: dispatch.loading.setLoadingModal,
  setLoadingSuccessMsg: dispatch.loading.setLoadingSuccessMsg,
  setLoadingSuccess: dispatch.loading.setLoadingSuccess,
  setLoadingIterateTotal: dispatch.loading.setLoadingIterateTotal,
  setLoadingIterateCurrent: dispatch.loading.setLoadingIterateCurrent,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

class Commit extends React.Component<connectedProps> {
  processedRepos = 0;
  octokit: any = {};

  constructor(props: any) {
    super(props);
    this.processedRepos = 0;
  }

  componentDidUpdate = (prevProps: connectedProps) => {
    const { setLoadFlag, loadFlag, loading } = this.props;
    // Only trigger load if loadFlag transitioned from false to true
    if (loadFlag === true && prevProps.loadFlag === false && loading === false) {
      setLoadFlag(false);
      this.load();
    }
  };

  sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  load = async () => {
    const {
      editAction,
      setLoading,
      setLoadingModal,
      setLoadingMsg,
      setLoadingSuccessMsg,
      setLoadingSuccess,
      setLoadingIterateTotal,
      setLoadingIterateCurrent,
      log,
      updateReposSelected,
      setOpenEditModal,
      githubToken,
      setRemaining,
      updateTeamSlug,
      updateTeamPermission,
    } = this.props;
    setLoadingModal(false);
    setLoadingMsg('');
    setLoading(true);
    setLoadingSuccess(false);
    setOpenEditModal(false);
    this.processedRepos = 0;
    this.octokit = new Octokit({
      auth: githubToken,
    });
    await this.sleep(100);
    if (editAction === 'add-team') {
      for (const repof of updateReposSelected) {
        const repo: any = repof;
        if (this.props.loading === true) {
          const msg =
            'Giving team: ' +
            updateTeamSlug +
            ' ' +
            updateTeamPermission +
            ' premission to repo: ' +
            repo.name +
            ' - Total: ' +
            this.processedRepos +
            '/' +
            updateReposSelected.length;
          log.info(msg);
          setLoadingIterateTotal(updateReposSelected.length);
          setLoadingIterateCurrent(this.processedRepos);
          setLoadingMsg(msg);

          // Note: https://octokit.github.io/rest.js/v18#teams-add-or-update-repo-permissions-in-org
          // Github is using a different permission name between its UI and its backend
          let gitperm = updateTeamPermission;
          if (updateTeamPermission === 'write') {
            gitperm = 'push';
          } else if (updateTeamPermission === 'read') {
            gitperm = 'pull';
          }
          let result: any = false;
          try {
            result = await this.octokit.teams.addOrUpdateRepoPermissionsInOrg({
              org: repo.owner.login,
              team_slug: updateTeamSlug,
              owner: repo.owner.login,
              repo: repo.name,
              permission: gitperm,
            });
          } catch (error) {
            log.info(error);
          }
          if (result !== false) {
            setRemaining(parseInt(result.headers['x-ratelimit-remaining']));
          }
          log.info(result);

          this.processedRepos++;
        }
      }
    }

    setLoadingSuccessMsg('Pushed the updates to ' + updateReposSelected.length + ' repositories');
    setLoadingSuccess(true);
    setLoading(false);
    // onSuccess();
  };

  render() {
    return null;
  }
}

export default connect(mapState, mapDispatch)(Commit);
