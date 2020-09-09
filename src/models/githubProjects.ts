// https://github.com/pimterry/loglevel
import * as log from 'loglevel';

import { Dispatch } from '../store';

declare global {
  interface Window {
    _env_: any;
  }
}

interface GithubProjects {
  state: any;
  reducers: any;
  effects: any;
}

export const githubProjects: GithubProjects = {
  state: {
    log: {},
    loading: false,
    selectedTab: 'explore',
    dataset: 'githubProjects',

    query: {},
    queries: [],

    tablePaginationRowsPerPage: 25,
    tablePaginationCurrentPage: 0,
    tablePaginationOffset: 0,
    tablePaginationLimit: 25,
    defaultPoints: false,
  },
  reducers: {
    setLog(state: any, payload: any) {
      return { ...state, log: payload };
    },
    setLoading(state: any, payload: any) {
      return { ...state, loading: payload };
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
    setTablePaginationCurrentPage(state: any, newPageNb: number) {
      // const updatedOffset = (newPageNb + 1) * state.tablePaginationLimit;
      const updatedOffset = newPageNb * state.tablePaginationLimit;
      return { ...state, tablePaginationCurrentPage: newPageNb, tablePaginationOffset: updatedOffset };
    },
    setTablePaginationOffset(state: any, payload: any) {
      return { ...state, tablePaginationOffset: payload };
    },
    setTablePaginationLimit(state: any, payload: any) {
      return { ...state, tablePaginationLimit: payload, tablePaginationCurrentPage: 0, tablePaginationOffset: 0 };
    },
    setQuery(state: any, payload: any) {
      return { ...state, query: payload };
    },
    setQueries(state: any, payload: any) {
      return { ...state, queries: payload };
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
      logger.info('githubProjects Logger initialized');
      dispatch.githubProjects.setLog(logger);
    },

    async saveQuery() {
      console.log('MODEL SAVE QUERY');
    },
    async deleteQuery() {
      console.log('MODEL DELETE QUERY');
    },

    async updateQueryIfDifferent(newQuery: any, rootState: any) {
      const originalQuery = rootState.githubProjects.query;
      // Only update the store if the query is different than store
      // Might need to replace stringify by Lodash isEqual
      if (JSON.stringify(originalQuery) !== JSON.stringify(newQuery)) {
        if (newQuery === null) {
          dispatch.githubProjects.setQuery({});
        } else {
          dispatch.githubProjects.setQuery(newQuery);
        }
      }
    },

    async updateTabIfDifferent(newTab: any, rootState: any) {
      const originalTab = rootState.githubProjects.selectedTab;
      if (originalTab !== newTab) {
        dispatch.githubProjects.setSelectedTab(newTab);
      }
    },
  }),
};
