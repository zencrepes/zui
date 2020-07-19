import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import _ from 'lodash';

import { iRootState } from '../../../../store';
import { chunkArray } from '../../../../utils/misc';

const GQL_QUERY = loader('./getGitHubLabels.graphql');

const mapState = (state: iRootState) => ({
  githubClient: state.global.githubClient,
  chipLimit: state.chip.limit,
  chipCost: state.chip.cost,
  chipRemaining: state.chip.remaining,
  chipResetAt: state.chip.resetAt,
  log: state.global.log,
  loading: state.loading.loading,
  onSuccess: state.loading.onSuccess,

  verifFlag: state.githubLabels.verifFlag,
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
  editAction: state.githubLabels.editAction,
  labelName: state.githubLabels.labelName,
  labelNameEnable: state.githubLabels.labelNameEnable,
  labelColor: state.githubLabels.labelColor,
  labelColorEnable: state.githubLabels.labelColorEnable,
  labelDescription: state.githubLabels.labelDescription,
  labelDescriptionEnable: state.githubLabels.labelDescriptionEnable,
});

const mapDispatch = (dispatch: any) => ({
  setVerifFlag: dispatch.githubLabels.setVerifFlag,
  setVerifiedLabels: dispatch.githubLabels.setVerifiedLabels,
  //   setStageFlag: dispatch.githubLabels.setStageFlag,
  //   setLabels: dispatch.githubLabels.setLabels,
  //   setVerifiedLabels: dispatch.githubLabels.setVerifiedLabels,
  insVerifiedLabels: dispatch.githubLabels.insVerifiedLabels,

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
  processedLabels = 0;

  constructor(props: any) {
    super(props);
    this.verifErrors = 0;
    this.processedLabels = 0;
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
      setVerifiedLabels,
      insVerifiedLabels,
      updateLabelsSelected,
      labelNameEnable,
    } = this.props;
    setLoading(true);
    setLoadingModal(false);
    setVerifiedLabels([]);
    this.verifErrors = 0;
    this.processedLabels = 0;

    setLoadingMsg('About pull data from ' + updateLabelsSelected.length + ' labels');
    setLoadingMsgAlt('');
    await this.sleep(100);
    // The staging query needs the array of labels to be broken down by label name with a limit of 30 items by repository.
    const groupedLabels: any = _.groupBy(updateLabelsSelected, 'name');
    for (const labelGroup of Object.values(groupedLabels)) {
      // Start by breaking down the array in increments of 30 items
      const chunkedArray: any[] = chunkArray(labelGroup, 30);
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
            ' labels named: ' +
            chunk[0].name +
            ' - Total: ' +
            this.processedLabels +
            '/' +
            updateLabelsSelected.length;
          setLoadingIterateTotal(updateLabelsSelected.length);
          setLoadingIterateCurrent(this.processedLabels);
          setLoadingMsg(baseMsg);

          let data: any = {};

          try {
            data = await githubClient.query({
              query: GQL_QUERY,
              variables: {
                nodesArray: chunk.map((l: any) => l.repository.id),
                labelName: chunk[0].name,
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
              insVerifiedLabels({
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
            for (const fetchedLabel of data.data.nodes) {
              if (fetchedLabel === null) {
                insVerifiedLabels({
                  id: chunk[idx].id,
                  error: true,
                  errorMsg: "This repository doesn't to exist in GitHub. Was it deleted ?",
                });
                this.verifErrors++;
              } else if (fetchedLabel.viewerPermission !== 'ADMIN' && fetchedLabel.viewerPermission !== 'WRITE') {
                insVerifiedLabels({
                  id: fetchedLabel.label.id,
                  error: true,
                  errorMsg:
                    'Your missing write permission on this repository. Your permission is: ' +
                    fetchedLabel.repository.viewerPermission,
                });
                this.verifErrors++;
              } else if ((fetchedLabel === null || fetchedLabel.label === null) && editAction !== 'create') {
                insVerifiedLabels({
                  id: chunk[idx].id,
                  error: true,
                  errorMsg: "This label doesn't seem to exist in GitHub. Was it deleted ?",
                });
                this.verifErrors++;
              } else if (fetchedLabel.label === null && editAction === 'create') {
                // The label doesn't exist in the repository, meaning all-clear for creating.
                insVerifiedLabels({
                  ...chunk[idx],
                  error: false,
                });
              } else if (fetchedLabel.label !== null && editAction === 'create') {
                insVerifiedLabels({
                  ...chunk[idx],
                  error: true,
                  errorMsg:
                    'This label already exists in GitHub. Please use the "Update" instead of the "Create" action.',
                });
                this.verifErrors++;
              } else if (
                editAction === 'update' &&
                labelNameEnable === true &&
                updateLabelsSelected.filter((l: any) => l.repository.id === fetchedLabel.id).length > 1
              ) {
                insVerifiedLabels({
                  id: chunk[idx].id,
                  error: true,
                  errorMsg:
                    'Labels must be unique, but we detected more than 1 repository receiving the same new label name',
                });
                this.verifErrors++;
              } else {
                insVerifiedLabels({
                  ...chunk[idx],
                  error: false,
                });
              }
              this.processedLabels++;
              idx++;
            }
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
