// https://github.com/pimterry/loglevel
import * as log from 'loglevel';

import { Dispatch } from '../store';

declare global {
  interface Window {
    _env_: any;
  }
}

export const githubIssues = {
  state: {
    log: {},
    loadFlag: false, // Flag to trigger data modifications in GitHub
    verifFlag: false, // Flag to trigger verification against GitHub
    selectedTab: 'explore',
    dataset: 'githubIssues',

    query: {},
    queries: [],

    tablePaginationRowsPerPage: 25,
    tablePaginationCurrentPage: 0,
    tablePaginationOffset: 0,
    tablePaginationLimit: 25,
    defaultPoints: false,

    openEditModal: false,
    editAction: '',
    editDisableNext: false,
    updateIssuesSelected: [],
    fetchSelectedFromQuery: true, // Selected issues can be identified from a query or from a list of selected issues in the issues list
    updateTransferSteps: ['Intro', 'Select Repo', 'Staging'],
    updateTransferSelectedRepoId: '',
    updateTransferSelectedRepoViewerPermission: '',
    updateAddLabelSteps: ['Intro', 'Label Name', 'Staging'],
    updateAddLabelName: '',
    updateCurrentStep: 0,
    verifiedIssues: [], // Array of issues that were verified in GitHub

    reposAvailable: [],
  },
  reducers: {
    setLog(state: any, payload: any) {
      return { ...state, log: payload };
    },
    setLoading(state: any, payload: any) {
      return { ...state, loading: payload };
    },
    setLoadFlag(state: any, payload: any) {
      return { ...state, loadFlag: payload };
    },
    setSelectedTab(state: any, payload: any) {
      return { ...state, selectedTab: payload };
    },
    setTablePaginationRowsPerPage(state: any, payload: any) {
      // Whenever we change the number of rows per page, we also reset all to default
      return {
        ...state,
        tablePaginationRowsPerPage: payload,
        tablePaginationLimit: payload,
        tablePaginationOffset: 0,
        tablePaginationCurrentPage: 0,
      };
    },
    // setTablePaginationCurrentPage(state: any, payload: any) {
    //   const updatedOffset = (payload + 1) * state.tablePaginationRowsPerPage;
    //   return { ...state, tablePaginationCurrentPage: payload, tablePaginationOffset: updatedOffset };
    // },
    setTablePaginationCurrentPage(state: any, newPageNb: number) {
      const updatedOffset = newPageNb * state.tablePaginationLimit;
      return { ...state, tablePaginationCurrentPage: newPageNb, tablePaginationOffset: updatedOffset };
    },
    setTablePaginationOffset(state: any, payload: any) {
      return { ...state, tablePaginationOffset: payload };
    },
    setTablePaginationLimit(state: any, payload: any) {
      return {
        ...state,
        tablePaginationLimit: payload,
        tablePaginationCurrentPage: 0,
        tablePaginationOffset: 0,
      };
    },
    setQuery(state: any, payload: any) {
      return { ...state, query: payload };
    },
    setQueries(state: any, payload: any) {
      return { ...state, queries: payload };
    },
    setDefaultPoints(state: any, payload: any) {
      return { ...state, defaultPoints: payload };
    },
    setUpdateIssuesSelected(state: any, payload: any) {
      return { ...state, updateIssuesSelected: payload };
    },
    setOpenEditModal(state: any, payload: any) {
      if (payload === false) {
        // When closing the modal, by default set back the step to 0
        return {
          ...state,
          openEditModal: payload,
          updateIssuesSelected: [],
          verifiedIssues: [],
          updateTransferSelectedRepoId: '',
          updateTransferSelectedRepoViewerPermission: '',
          updateCurrentStep: 0,
        };
      }
      return { ...state, openEditModal: payload };
    },
    setEditAction(state: any, payload: any) {
      return { ...state, editAction: payload };
    },
    setEditDisableNext(state: any, payload: any) {
      return { ...state, editDisableNext: payload };
    },
    setUpdateCurrentStep(state: any, payload: any) {
      return { ...state, updateCurrentStep: payload };
    },
    setVerifFlag(state: any, payload: any) {
      return { ...state, verifFlag: payload };
    },
    setVerifiedIssues(state: any, payload: any) {
      return { ...state, verifiedIssues: payload };
    },
    setUpdateTransferSelectedRepoId(state: any, payload: any) {
      return { ...state, updateTransferSelectedRepoId: payload };
    },
    setReposAvailable(state: any, payload: any) {
      return { ...state, reposAvailable: payload };
    },
    setUpdateTransferSelectedRepoViewerPermission(state: any, payload: any) {
      return { ...state, updateTransferSelectedRepoViewerPermission: payload };
    },
    setFetchSelectedFromQuery(state: any, payload: any) {
      return { ...state, fetchSelectedFromQuery: payload };
    },
    insVerifiedIssues(state: any, payload: any) {
      const newArray = state.verifiedIssues.slice();
      newArray.splice(newArray.length, 0, payload);
      return { ...state, verifiedIssues: newArray };
    },
    setUpdateAddLabelName(state: any, payload: any) {
      return { ...state, updateAddLabelName: payload };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async initView() {
      const logger = log.noConflict();
      if (process.env.NODE_ENV !== 'production') {
        logger.enableAll();
      } else {
        logger.disableAll();
      }
      logger.info('githubIssues Logger initialized');
      dispatch.githubIssues.setLog(logger);
    },

    async saveQuery() {
      console.log('MODEL SAVE QUERY');
    },
    async deleteQuery() {
      console.log('MODEL DELETE QUERY');
    },

    async updateQueryIfDifferent(newQuery: any, rootState: any) {
      const originalQuery = rootState.githubIssues.query;
      // Only update the store if the query is different than store
      // Might need to replace stringify by Lodash isEqual
      if (JSON.stringify(originalQuery) !== JSON.stringify(newQuery)) {
        if (newQuery === null) {
          dispatch.githubIssues.setQuery({});
        } else {
          dispatch.githubIssues.setQuery(newQuery);
        }
      }
    },

    async updateTabIfDifferent(newTab: any, rootState: any) {
      const originalTab = rootState.githubIssues.selectedTab;
      if (originalTab !== newTab) {
        dispatch.githubIssues.setSelectedTab(newTab);
      }
    },
  }),
};
