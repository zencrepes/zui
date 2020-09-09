// https://github.com/pimterry/loglevel
import * as log from 'loglevel';

import { Dispatch } from '../store';

declare global {
  interface Window {
    _env_: any;
  }
}

interface GithubLabels {
  state: any;
  reducers: any;
  effects: any;
}

export const githubLabels: GithubLabels = {
  state: {
    log: {},
    loadFlag: false, // Flag to trigger data modifications in GitHub
    verifFlag: false, // Flag to trigger verification against GitHub

    selectedTab: 'explore',
    dataset: 'githubLabels',

    query: {},
    queries: [],

    tablePaginationRowsPerPage: 25,
    tablePaginationCurrentPage: 0,
    tablePaginationOffset: 0,
    tablePaginationLimit: 25,
    defaultPoints: false,

    openEditModal: false,
    editAction: '',
    labelName: '',
    labelNameEnable: false,
    labelNameRequired: false,
    labelColor: '',
    labelColorEnable: false,
    labelColorRequired: false,
    labelDescription: '',
    labelDescriptionEnable: false,
    updateReposAvailable: [],
    updateReposSelected: [],
    updateLabelsAvailable: [],
    updateLabelsSelected: [],
    updateCreateSteps: ['Intro', 'Select Repos', 'Fields', 'Staging'],
    updateDeleteSteps: ['Intro', 'Select Repos', 'Select Labels', 'Staging'],
    updateUpdateSteps: ['Intro', 'Select Repos', 'Select Labels', 'Fields', 'Staging'],
    updateCurrentStep: 0,

    verifiedLabels: [], // Array of labels that were verified in GitHub
  },
  reducers: {
    setLog(state: any, payload: any) {
      return { ...state, log: payload };
    },
    setLoadFlag(state: any, payload: any) {
      return { ...state, loadFlag: payload };
    },
    setSelectedTab(state: any, payload: any) {
      return { ...state, selectedTab: payload };
    },
    setRefreshFlag(state: any, payload: any) {
      return { ...state, refreshFlag: payload };
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
    setTablePaginationCurrentPage(state: any, newPageNb: number) {
      // const updatedOffset = (newPageNb + 1) * state.tablePaginationLimit;
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
    setOpenEditModal(state: any, payload: any) {
      if (payload === false) {
        // When closing the modal, by default set back the step to 0
        return {
          ...state,
          openEditModal: payload,
          updateCurrentStep: 0,
          updateReposSelected: [],
          updateLabelsSelected: [],
        };
      }
      return { ...state, openEditModal: payload };
    },
    setEditAction(state: any, payload: any) {
      return { ...state, editAction: payload };
    },
    setLabelName(state: any, payload: any) {
      return { ...state, labelName: payload };
    },
    setLabelNameRequired(state: any, payload: any) {
      return { ...state, labelNameRequired: payload };
    },
    setLabelColor(state: any, payload: any) {
      return { ...state, labelColor: payload };
    },
    setLabelDescription(state: any, payload: any) {
      return { ...state, labelDescription: payload };
    },
    setLabelNameEnable(state: any, payload: any) {
      return { ...state, labelNameEnable: payload };
    },
    setLabelColorEnable(state: any, payload: any) {
      return { ...state, labelColorEnable: payload };
    },
    setLabelColorRequired(state: any, payload: any) {
      return { ...state, labelColorRequired: payload };
    },
    setLabelDescriptionEnable(state: any, payload: any) {
      return { ...state, labelDescriptionEnable: payload };
    },
    setUpdateReposAvailable(state: any, payload: any) {
      return { ...state, updateReposAvailable: payload };
    },
    setUpdateReposSelected(state: any, payload: any) {
      return { ...state, updateReposSelected: payload };
    },
    setUpdateLabelsAvailable(state: any, payload: any) {
      return { ...state, updateLabelsAvailable: payload };
    },
    setUpdateLabelsSelected(state: any, payload: any) {
      return { ...state, updateLabelsSelected: payload };
    },
    setUpdateCurrentStep(state: any, payload: any) {
      return { ...state, updateCurrentStep: payload };
    },
    setVerifFlag(state: any, payload: any) {
      return { ...state, verifFlag: payload };
    },
    setVerifiedLabels(state: any, payload: any) {
      return { ...state, verifiedLabels: payload };
    },
    insVerifiedLabels(state: any, payload: any) {
      const newArray = state.verifiedLabels.slice();
      newArray.splice(newArray.length, 0, payload);
      return { ...state, verifiedLabels: newArray };
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
      logger.info('githubLabels Logger initialized');
      dispatch.githubLabels.setLog(logger);
    },

    async saveQuery() {
      console.log('MODEL SAVE QUERY');
    },
    async deleteQuery() {
      console.log('MODEL DELETE QUERY');
    },

    async updateQueryIfDifferent(newQuery: any, rootState: any) {
      const originalQuery = rootState.githubLabels.query;
      // Only update the store if the query is different than store
      // Might need to replace stringify by Lodash isEqual
      if (JSON.stringify(originalQuery) !== JSON.stringify(newQuery)) {
        if (newQuery === null) {
          dispatch.githubLabels.setQuery({});
        } else {
          dispatch.githubLabels.setQuery(newQuery);
        }
      }
    },

    async updateTabIfDifferent(newTab: any, rootState: any) {
      const originalTab = rootState.githubLabels.selectedTab;
      if (originalTab !== newTab) {
        dispatch.githubLabels.setSelectedTab(newTab);
      }
    },
  }),
};
