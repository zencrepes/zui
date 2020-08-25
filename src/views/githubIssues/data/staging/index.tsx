import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import { iRootState } from '../../../../store';
import { chunkArray } from '../../../../utils/misc';

const GQL_QUERY_REPOS = loader('./getGitHubRepos.graphql');

const mapState = (state: iRootState) => ({
  githubClient: state.global.githubClient,
  chipLimit: state.chip.limit,
  chipCost: state.chip.cost,
  chipRemaining: state.chip.remaining,
  chipResetAt: state.chip.resetAt,
  log: state.global.log,
  loading: state.loading.loading,
  onSuccess: state.loading.onSuccess,

  verifFlag: state.githubIssues.verifFlag,
  updateIssuesSelected: state.githubIssues.updateIssuesSelected,
  editAction: state.githubIssues.editAction,
});

const mapDispatch = (dispatch: any) => ({
  setVerifFlag: dispatch.githubIssues.setVerifFlag,
  setVerifiedIssues: dispatch.githubIssues.setVerifiedIssues,
  insVerifiedIssues: dispatch.githubIssues.insVerifiedIssues,

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
  processedIssue = 0;

  constructor(props: any) {
    super(props);
    this.verifErrors = 0;
    this.processedIssue = 0;
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
      // setLoadingIterateTotal,
      // setLoadingIterateCurrent,
      log,
      setVerifiedIssues,
      updateIssuesSelected,
    } = this.props;
    setLoading(true);
    setLoadingModal(false);
    setVerifiedIssues([]);
    this.verifErrors = 0;
    this.processedIssue = 0;

    await this.sleep(100);

    const uniqueRepos: string[] = [];
    const selectedIssues: any[] = updateIssuesSelected;
    for (const repoId of selectedIssues.map((i: any) => i.repository.id)) {
      if (!uniqueRepos.includes(repoId)) {
        uniqueRepos.push(repoId);
      }
    }
    setLoadingMsg('About pull permission data from ' + uniqueRepos.length + ' repositories');
    setLoadingMsgAlt('');

    // If we're preparing an issue transfer, the overall logic is going to be different
    // The core of the logic fits with verifying that the user has the right permissions to transfer the issues.
    if (editAction === 'transfer' || editAction === 'addlabel' || editAction === 'removelabel') {
      const verifiedRepos: any[] = [];
      const chunkedArray: any[] = chunkArray(uniqueRepos, 30);
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
          let data: any = {};
          try {
            data = await githubClient.query({
              query: GQL_QUERY_REPOS,
              variables: {
                nodesArray: chunk,
              },
              fetchPolicy: 'no-cache',
              errorPolicy: 'ignore',
            });
          } catch (error) {
            log.warn(error);
          }
          log.info(data);
          if (data.data !== null && data.data !== undefined) {
            if (data.data !== undefined) {
              this.props.updateChip(data.data.rateLimit);
            }
            for (const fetchedRepos of data.data.nodes) {
              verifiedRepos.push(fetchedRepos);
            }
          }
        }
      }
      // At that point, all repos have been loaded, time to update the issues
      const prepVerifiedIssues: any[] = [];
      for (const issue of selectedIssues) {
        const issueRepo = verifiedRepos.filter((r: any) => r.id === issue.repository.id);
        if (issueRepo.length === 0) {
          prepVerifiedIssues.push({
            id: issue.id,
            error: true,
            errorMsg: 'Unable to communicate with GitHub, please check your network connectivity',
          });
          this.verifErrors++;
        } else if (['ADMIN', 'MAINTAIN', 'WRITE', 'TRIAGE'].includes(issueRepo[0].viewerPermission)) {
          prepVerifiedIssues.push({
            ...issue,
            error: false,
          });
        } else {
          prepVerifiedIssues.push({
            id: issue.id,
            error: true,
            errorMsg:
              'You do not have the correct repository permission for this operation on the source repository (current: ' +
              issueRepo[0].viewerPermission +
              ')',
          });
        }
      }
      setVerifiedIssues(prepVerifiedIssues);
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
  };

  render() {
    return null;
  }
}

export default connect(mapState, mapDispatch)(Staging);
