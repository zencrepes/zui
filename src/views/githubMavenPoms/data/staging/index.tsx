import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { iRootState } from '../../../../store';
import { chunkArray } from '../../../../utils/misc';

const GQL_QUERY = loader('./getGitHubRepoTeam.graphql');

const mapState = (state: iRootState) => ({
  githubClient: state.global.githubClient,
  chipLimit: state.chip.limit,
  chipCost: state.chip.cost,
  chipRemaining: state.chip.remaining,
  chipResetAt: state.chip.resetAt,
  log: state.global.log,
  loading: state.loading.loading,
  onSuccess: state.loading.onSuccess,

  verifFlag: state.githubMavenPoms.verifFlag,
  updateReposSelected: state.githubMavenPoms.updateReposSelected,
  editAction: state.githubMavenPoms.editAction,
  updateTeamSlug: state.githubMavenPoms.updateTeamSlug,
});

const mapDispatch = (dispatch: any) => ({
  setVerifFlag: dispatch.githubMavenPoms.setVerifFlag,
  setVerifiedRepos: dispatch.githubMavenPoms.setVerifiedRepos,
  //   setStageFlag: dispatch.githubMavenPoms.setStageFlag,
  //   setLabels: dispatch.githubMavenPoms.setLabels,
  //   setVerifiedLabels: dispatch.githubMavenPoms.setVerifiedLabels,
  insVerifiedRepos: dispatch.githubMavenPoms.insVerifiedRepos,

  updateChip: dispatch.chip.updateChip,
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

class Staging extends React.Component<connectedProps> {
  verifErrors = 0;
  processedRepos = 0;

  constructor(props: any) {
    super(props);
    this.verifErrors = 0;
    this.processedRepos = 0;
  }

  componentDidUpdate = (prevProps: connectedProps) => {
    const { setVerifFlag, verifFlag, loading } = this.props;
    // Only trigger load if loadFlag transitioned from false to true
    if (verifFlag === true && prevProps.verifFlag === false && loading === false) {
      setVerifFlag(false);
      this.load();
    }
  };

  sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  load = async () => {
    const {
      githubClient,
      editAction,
      setLoading,
      setLoadingModal,
      setLoadingMsg,
      setLoadingMsgAlt,
      setLoadingSuccessMsg,
      setLoadingSuccess,
      setLoadingIterateTotal,
      setLoadingIterateCurrent,
      log,
      setVerifiedRepos,
      insVerifiedRepos,
      updateReposSelected,
      updateTeamSlug,
    } = this.props;
    setLoading(true);
    setLoadingModal(false);
    setVerifiedRepos([]);
    this.verifErrors = 0;
    this.processedRepos = 0;
    console.log('Start staging');
    setLoadingMsg('About pull data from ' + updateReposSelected.length + ' repos');
    setLoadingMsgAlt('');
    await this.sleep(100);
    // The staging query needs the array of labels to be broken down by label name with a limit of 30 items by repository.

    const chunkedArray: any[] = chunkArray(updateReposSelected, 30);
    for (const chunk of chunkedArray) {
      if (this.props.loading === true) {
        if (this.props.chipRemaining - this.props.chipCost < 50 && this.props.chipResetAt !== '') {
          const msg = 'No token available, will resuming querying after ' + this.props.chipResetAt;
          setLoadingMsg(msg);
          log.info(msg);
          const sleepDuration = (new Date(this.props.chipResetAt).getTime() - new Date().getTime()) / 1000;
          log.info('Will resume querying in: ' + sleepDuration + 's');
          await this.sleep(sleepDuration + 10000);
          log.info('Ready to resume querying');
        }

        const baseMsg =
          'Fetching data for ' +
          chunk.length +
          ' repos' +
          ' - Total: ' +
          this.processedRepos +
          '/' +
          updateReposSelected.length;
        setLoadingIterateTotal(updateReposSelected.length);
        setLoadingIterateCurrent(this.processedRepos);
        setLoadingMsg(baseMsg);

        let data: any = {};

        try {
          data = await githubClient.query({
            query: GQL_QUERY,
            variables: {
              nodesArray: chunk.map((r: any) => r.id),
              orgLogin: chunk[0].owner.login,
              teamSlug: updateTeamSlug,
            },
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
          });
        } catch (error) {
          log.warn(error);
        }
        log.info(data);
        if (data.data === undefined) {
          for (const label of chunk) {
            insVerifiedRepos({
              id: label.id,
              error: true,
              errorMsg: 'Unable to communicate with GitHub, please check your network connectivity',
            });
            this.verifErrors++;
          }
        }
        if (data.data !== null && data.data !== undefined) {
          if (data.data !== undefined) {
            this.props.updateChip(data.data.rateLimit);
          }
          let idx = 0;
          for (const fetchedRepo of data.data.nodes) {
            if (fetchedRepo === null) {
              insVerifiedRepos({
                id: chunk[idx].id,
                error: true,
                errorMsg: "This repository doesn't to exist in GitHub. Was it deleted ?",
              });
              this.verifErrors++;
            } else if (fetchedRepo.viewerPermission !== 'ADMIN') {
              insVerifiedRepos({
                id: fetchedRepo.label.id,
                error: true,
                errorMsg:
                  'Your missing write permission on this repository. Your permission is: ' +
                  fetchedRepo.viewerPermission,
              });
              this.verifErrors++;
            } else if (editAction === 'add-team' && data.data.organization.team.viewerCanAdminister !== true) {
              insVerifiedRepos({
                id: fetchedRepo.label.id,
                error: true,
                errorMsg: 'Your missing administrative privilated on the team: ' + updateTeamSlug,
              });
              this.verifErrors++;
            } else if ((fetchedRepo === null || fetchedRepo.label === null) && editAction !== 'create') {
              insVerifiedRepos({
                id: chunk[idx].id,
                error: true,
                errorMsg: "This label doesn't seem to exist in GitHub. Was it deleted ?",
              });
              this.verifErrors++;
            } else if (fetchedRepo.label === null && editAction === 'create') {
              // The label doesn't exist in the repository, meaning all-clear for creating.
              insVerifiedRepos({
                ...chunk[idx],
                error: false,
              });
            } else if (fetchedRepo.label !== null && editAction === 'create') {
              insVerifiedRepos({
                ...chunk[idx],
                error: true,
                errorMsg:
                  'This label already exists in GitHub. Please use the "Update" instead of the "Create" action.',
              });
              this.verifErrors++;
            } else {
              insVerifiedRepos({
                ...chunk[idx],
                error: false,
              });
            }
            this.processedRepos++;
            idx++;
          }
        }
      }
    }

    if (editAction === 'refresh') {
      setLoadingSuccessMsg('Completed with ' + this.verifErrors + ' update(s)');
    } else {
      setLoadingSuccessMsg('Completed with ' + this.verifErrors + ' error(s)');
    }
    setLoadingSuccess(true);
    setLoading(false);
    await this.sleep(500);
    setLoadingModal(false);
    // onSuccess();
  };

  render() {
    return null;
  }
}

export default connect(mapState, mapDispatch)(Staging);
