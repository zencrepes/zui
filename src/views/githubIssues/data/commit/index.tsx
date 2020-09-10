import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { Octokit } from '@octokit/rest';

import { iRootState } from '../../../../store';

const GQL_TRANFER_ISSUE = loader('./transferGitHubIssue.graphql');

const mapState = (state: iRootState) => ({
  githubClient: state.global.githubClient,
  chipLimit: state.chip.limit,
  chipCost: state.chip.cost,
  chipRemaining: state.chip.remaining,
  chipResetAt: state.chip.resetAt,

  loadFlag: state.githubIssues.loadFlag,
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
  editAction: state.githubIssues.editAction,
  updateTransferSelectedRepoId: state.githubIssues.updateTransferSelectedRepoId,
  updateAddLabelName: state.githubIssues.updateAddLabelName,
  reposAvailable: state.githubIssues.reposAvailable,

  log: state.global.log,
  loading: state.loading.loading,
  onSuccess: state.loading.onSuccess,
  githubToken: state.global.githubToken,
});

const mapDispatch = (dispatch: any) => ({
  setLoadFlag: dispatch.githubIssues.setLoadFlag,
  setOpenEditModal: dispatch.githubIssues.setOpenEditModal,

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
  processedIssues = 0;
  octokit: any = {};

  constructor(props: any) {
    super(props);
    this.processedIssues = 0;
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
      githubClient,
      editAction,
      setLoading,
      setLoadingModal,
      setLoadingMsg,
      setLoadingSuccessMsg,
      setLoadingSuccess,
      setLoadingIterateTotal,
      setLoadingIterateCurrent,
      log,
      updateIssuesSelected,
      setOpenEditModal,
      githubToken,
      setRemaining,
      updateAddLabelName,
      updateTransferSelectedRepoId,
      reposAvailable,
    } = this.props;
    setLoadingModal(false);
    setLoadingMsg('');
    setLoading(true);
    setLoadingSuccess(false);
    setOpenEditModal(false);
    this.processedIssues = 0;
    this.octokit = new Octokit({
      auth: githubToken,
    });
    await this.sleep(100);
    if (editAction === 'transfer') {
      const issueRepo: any[] = reposAvailable.filter((r: any) => r.id === updateTransferSelectedRepoId);
      if (issueRepo.length > 0) {
        for (const issueA of updateIssuesSelected) {
          const issue: any = issueA;
          if (this.props.loading === true) {
            const msg =
              'Transfering issue #' +
              issue.number +
              ' from: ' +
              issue.repository.owner.login +
              '/' +
              issue.repository.name +
              ' to: ' +
              issueRepo[0].owner.login +
              '/' +
              issueRepo[0].name +
              ' - Total: ' +
              this.processedIssues +
              '/' +
              updateIssuesSelected.length;
            log.info(msg);
            setLoadingIterateTotal(updateIssuesSelected.length);
            setLoadingIterateCurrent(this.processedIssues);
            setLoadingMsg(msg);

            let data: any = {};
            try {
              data = await githubClient.query({
                query: GQL_TRANFER_ISSUE,
                variables: {
                  issueId: issue.id,
                  repositoryId: issueRepo[0].id,
                },
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
              });
            } catch (error) {
              log.warn(error);
            }
            log.info(data);
            this.processedIssues++;
          }
        }
      }
    } else if (editAction === 'addlabel') {
      for (const issueA of updateIssuesSelected) {
        const issue: any = issueA;
        if (this.props.loading === true) {
          const msg =
            'Adding label ' +
            updateAddLabelName +
            ' to issue #' +
            issue.number +
            ' in: ' +
            issue.repository.owner.login +
            '/' +
            issue.repository.name +
            ' - Total: ' +
            this.processedIssues +
            '/' +
            updateIssuesSelected.length;
          log.info(msg);
          setLoadingIterateTotal(updateIssuesSelected.length);
          setLoadingIterateCurrent(this.processedIssues);
          setLoadingMsg(msg);

          const addPayload: any = {
            owner: issue.repository.owner.login,
            repo: issue.repository.name,
            issue_number: issue.number,
            labels: [updateAddLabelName],
          };
          let result: any = false;
          try {
            result = await this.octokit.issues.addLabels(addPayload);
          } catch (error) {
            log.info(error);
          }
          if (result !== false) {
            setRemaining(parseInt(result.headers['x-ratelimit-remaining']));
          }
          log.info(result);
          this.processedIssues++;
        }
      }
    } else if (editAction === 'removelabel') {
      for (const issueA of updateIssuesSelected) {
        const issue: any = issueA;
        if (this.props.loading === true) {
          const msg =
            'Remove label ' +
            updateAddLabelName +
            ' from issue #' +
            issue.number +
            ' in: ' +
            issue.repository.owner.login +
            '/' +
            issue.repository.name +
            ' - Total: ' +
            this.processedIssues +
            '/' +
            updateIssuesSelected.length;
          log.info(msg);
          setLoadingIterateTotal(updateIssuesSelected.length);
          setLoadingIterateCurrent(this.processedIssues);
          setLoadingMsg(msg);

          const removePayload: any = {
            owner: issue.repository.owner.login,
            repo: issue.repository.name,
            issue_number: issue.number,
            name: updateAddLabelName,
          };
          let result: any = false;
          try {
            result = await this.octokit.issues.removeLabel(removePayload);
          } catch (error) {
            log.info(error);
          }
          if (result !== false) {
            setRemaining(parseInt(result.headers['x-ratelimit-remaining']));
          }
          log.info(result);
          this.processedIssues++;
        }
      }
    }
    setLoadingSuccessMsg('Pushed the updates to ' + updateIssuesSelected.length + ' issues');
    setLoadingSuccess(true);
    setLoading(false);
    // onSuccess();
  };

  render() {
    return null;
  }
}

export default connect(mapState, mapDispatch)(Commit);
