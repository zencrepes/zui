// https://github.com/pimterry/loglevel
import * as log from 'loglevel';

import { Dispatch } from '../store';

declare global {
  interface Window {
    _env_: any;
  }
}

interface GithubMavenPoms {
  state: any;
  reducers: any;
  effects: any;
}

export const githubMavenPoms: GithubMavenPoms = {
  state: {
    log: {},
    loadFlag: false, // Flag to trigger data modifications in GitHub
    verifFlag: false, // Flag to trigger verification against GitHub

    selectedTab: 'explore',
    dataset: 'githubMavenPoms',

    query: {},
    queries: [],

    tablePaginationRowsPerPage: 50,
    tablePaginationCurrentPage: 0,
    tablePaginationOffset: 0,
    tablePaginationLimit: 50,
    defaultPoints: false,

    openEditModal: false,
    editAction: '',
    editDisableNext: false,
    updateReposAvailable: [],
    updateReposSelected: [],
    updateAddTeamSteps: ['Intro', 'Select Repos', 'Select Team', 'Staging'],
    updateCurrentStep: 0,
    updateTeamSlug: '',
    updateTeamPermission: 'read',
    verifiedRepos: [], // Array of repositories that were verified in GitHub
  },
  reducers: {
    setLog(state: any, payload: any) {
      return { ...state, log: payload };
    },
    setLoadFlag(state: any, payload: any) {
      return { ...state, loadFlag: payload };
    },
    setVerifFlag(state: any, payload: any) {
      return { ...state, verifFlag: payload };
    },
    setEditAction(state: any, payload: any) {
      return { ...state, editAction: payload };
    },
    setSelectedTab(state: any, payload: any) {
      return { ...state, selectedTab: payload };
    },
    setEditDisableNext(state: any, payload: any) {
      return { ...state, editDisableNext: payload };
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
        };
      }
      return { ...state, openEditModal: payload };
    },
    setUpdateReposAvailable(state: any, payload: any) {
      return { ...state, updateReposAvailable: payload };
    },
    setUpdateReposSelected(state: any, payload: any) {
      return { ...state, updateReposSelected: payload };
    },
    setUpdateCurrentStep(state: any, payload: any) {
      return { ...state, updateCurrentStep: payload };
    },
    setVerifiedRepos(state: any, payload: any) {
      return { ...state, verifiedRepos: payload };
    },
    insVerifiedRepos(state: any, payload: any) {
      const newArray = state.verifiedRepos.slice();
      newArray.splice(newArray.length, 0, payload);
      return { ...state, verifiedRepos: newArray };
    },
    setUpdateTeamSlug(state: any, payload: any) {
      return { ...state, updateTeamSlug: payload };
    },
    setUpdateTeamPermission(state: any, payload: any) {
      return { ...state, updateTeamPermission: payload };
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
      logger.info('githubMavenPoms Logger initialized');
      dispatch.githubMavenPoms.setLog(logger);
    },

    async saveQuery() {
      console.log('MODEL SAVE QUERY');
    },
    async deleteQuery() {
      console.log('MODEL DELETE QUERY');
    },

    async updateQueryIfDifferent(newQuery: any, rootState: any) {
      const originalQuery = rootState.githubMavenPoms.query;
      // Only update the store if the query is different than store
      // Might need to replace stringify by Lodash isEqual
      if (JSON.stringify(originalQuery) !== JSON.stringify(newQuery)) {
        if (newQuery === null) {
          dispatch.githubMavenPoms.setQuery({});
        } else {
          dispatch.githubMavenPoms.setQuery(newQuery);
        }
      }
    },

    async updateTabIfDifferent(newTab: any, rootState: any) {
      const originalTab = rootState.githubMavenPoms.selectedTab;
      if (originalTab !== newTab) {
        dispatch.githubMavenPoms.setSelectedTab(newTab);
      }
    },
  }),
};
