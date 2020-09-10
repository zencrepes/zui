import React from 'react';
import { connect } from 'react-redux';
// import { loader } from 'graphql.macro';

import { iRootState } from '../../../../store';

// const GQL_DELETE_QUERY = loader('./deleteGitHubLabels.graphql');
// const GQL_CREATE_QUERY = loader('./createGitHubLabels.graphql');

// import GitHubApi from '@octokit/rest';
import { Octokit } from '@octokit/rest';

const mapState = (state: iRootState) => ({
  githubClient: state.global.githubClient,
  chipLimit: state.chip.limit,
  chipCost: state.chip.cost,
  chipRemaining: state.chip.remaining,
  chipResetAt: state.chip.resetAt,

  loadFlag: state.githubLabels.loadFlag,
  updateLabelsSelected: state.githubLabels.updateLabelsSelected,
  editAction: state.githubLabels.editAction,
  labelName: state.githubLabels.labelName,
  labelNameEnable: state.githubLabels.labelNameEnable,
  labelColor: state.githubLabels.labelColor,
  labelColorEnable: state.githubLabels.labelColorEnable,
  labelDescription: state.githubLabels.labelDescription,
  labelDescriptionEnable: state.githubLabels.labelDescriptionEnable,

  log: state.global.log,
  loading: state.loading.loading,
  onSuccess: state.loading.onSuccess,
  githubToken: state.global.githubToken,
});

const mapDispatch = (dispatch: any) => ({
  setLoadFlag: dispatch.githubLabels.setLoadFlag,
  setOpenEditModal: dispatch.githubLabels.setOpenEditModal,
  setVerifiedLabels: dispatch.githubLabels.setVerifiedLabels,
  insVerifiedLabels: dispatch.githubLabels.insVerifiedLabels,

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
  processedLabels = 0;
  octokit: any = {};

  constructor(props: any) {
    super(props);
    this.processedLabels = 0;
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
      setVerifiedLabels,
      updateLabelsSelected,
      setOpenEditModal,
      githubToken,
      setRemaining,
      labelNameEnable,
      labelName,
      labelColor,
      labelColorEnable,
      labelDescription,
      labelDescriptionEnable,
    } = this.props;
    setLoadingModal(false);
    setLoadingMsg('');
    setLoading(true);
    setLoadingSuccess(false);
    setVerifiedLabels([]);
    setOpenEditModal(false);
    this.processedLabels = 0;
    this.octokit = new Octokit({
      auth: githubToken,
    });
    await this.sleep(100);
    if (editAction === 'create') {
      // If deleting, simply deleting all labels one by one
      for (const labelf of updateLabelsSelected) {
        const label: any = labelf;
        if (this.props.loading === true) {
          const msg =
            'Creating label: ' +
            label.name +
            ' in: ' +
            label.repository.owner.login +
            '/' +
            label.repository.name +
            ' - Total: ' +
            this.processedLabels +
            '/' +
            updateLabelsSelected.length;
          log.info(msg);
          setLoadingIterateTotal(updateLabelsSelected.length);
          setLoadingIterateCurrent(this.processedLabels);
          setLoadingMsg(msg);

          let createPayload: any = {
            owner: label.repository.owner.login,
            repo: label.repository.name,
            name: label.name,
            color: label.color,
          };
          if (label.description !== null && label.description.length > 0) {
            createPayload = {
              ...createPayload,
              description: label.description,
            };
          }
          let result: any = false;
          try {
            result = await this.octokit.issues.createLabel(createPayload);
          } catch (error) {
            log.info(error);
          }
          if (result !== false) {
            setRemaining(parseInt(result.headers['x-ratelimit-remaining']));
          }
          log.info(result);

          // if (result !== false) {
          //   setRemaining(parseInt(result.headers['x-ratelimit-remaining']));
          // }
          // Using the GraphQL API for mutations doesn't trigger webhook, so resorting to the rest client for now
          // let data: any = {};
          // try {
          //   data = await githubClient.query({
          //     query: GQL_CREATE_QUERY,
          //     variables: {
          //       repositoryId: label.repository.id,
          //       name: label.name,
          //       color: label.color,
          //       description: label.description,
          //     },
          //     fetchPolicy: 'no-cache',
          //     errorPolicy: 'ignore',
          //   });
          // } catch (error) {
          //   log.warn(error);
          // }
          // console.log(data);
          this.processedLabels++;
        }
      }
    } else if (editAction === 'update') {
      for (const labelf of updateLabelsSelected) {
        const label: any = labelf;
        if (this.props.loading === true) {
          const msg =
            'Updating label: ' +
            label.name +
            ' in: ' +
            label.repository.owner.login +
            '/' +
            label.repository.name +
            ' - Total: ' +
            this.processedLabels +
            '/' +
            updateLabelsSelected.length;
          log.info(msg);
          setLoadingIterateTotal(updateLabelsSelected.length);
          setLoadingIterateCurrent(this.processedLabels);
          setLoadingMsg(msg);

          let createPayload: any = {
            owner: label.repository.owner.login,
            repo: label.repository.name,
            name: label.name,
          };
          if (labelNameEnable === true && labelName.length > 1) {
            createPayload = {
              ...createPayload,
              new_name: labelName,
            };
          }
          if (labelColorEnable === true && labelColor.length > 1) {
            createPayload = {
              ...createPayload,
              color: labelColor,
            };
          }
          if (labelDescriptionEnable === true && labelDescription.length > 1) {
            createPayload = {
              ...createPayload,
              description: labelDescription,
            };
          }
          let result: any = false;
          try {
            result = await this.octokit.issues.updateLabel(createPayload);
          } catch (error) {
            log.info(error);
          }
          if (result !== false) {
            setRemaining(parseInt(result.headers['x-ratelimit-remaining']));
          }
          log.info(result);

          this.processedLabels++;
        }
      }
    } else if (editAction === 'delete') {
      // If deleting, simply deleting all labels one by one
      for (const labelf of updateLabelsSelected) {
        const label: any = labelf;
        if (this.props.loading === true) {
          const msg =
            'Deleting label: ' +
            label.name +
            ' from: ' +
            label.repository.owner.login +
            '/' +
            label.repository.name +
            ' - Total: ' +
            this.processedLabels +
            '/' +
            updateLabelsSelected.length;
          log.info(msg);
          setLoadingIterateTotal(updateLabelsSelected.length);
          setLoadingIterateCurrent(this.processedLabels);
          setLoadingMsg(msg);

          // Using the GraphQL API for mutations doesn't trigger webhook, so resorting to the rest client for now
          // let data: any = {};
          // try {
          //   data = await githubClient.query({
          //     query: GQL_DELETE_QUERY,
          //     variables: {
          //       labelId: label.id,
          //     },
          //     fetchPolicy: 'no-cache',
          //     errorPolicy: 'ignore',
          //   });
          // } catch (error) {
          //   log.warn(error);
          // }
          let result: any = false;
          try {
            result = await this.octokit.issues.deleteLabel({
              owner: label.repository.owner.login,
              repo: label.repository.name,
              name: label.name,
            });
          } catch (error) {
            log.info(error);
          }
          if (result !== false) {
            setRemaining(parseInt(result.headers['x-ratelimit-remaining']));
          }
          this.processedLabels++;
        }
      }
    }

    setLoadingSuccessMsg('Pushed the updates to ' + updateLabelsSelected.length + ' labels');
    setLoadingSuccess(true);
    setLoading(false);
    // onSuccess();
  };

  render() {
    return null;
  }
}

export default connect(mapState, mapDispatch)(Commit);
