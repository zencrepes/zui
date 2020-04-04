// https://github.com/pimterry/loglevel
import * as log from 'loglevel';

import { Dispatch } from '../store';

declare global {
  interface Window {
    _env_: any;
  }
}

export const githubPullrequests = {
  state: {
    log: {},
    loading: false,
    selectedTab: 'explore',
    dataset: 'githubPullrequests',

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
    setTablePaginationCurrentPage(state: any, payload: any) {
      const updatedOffset = (payload + 1) * state.tablePaginationRowsPerPage;
      return { ...state, tablePaginationCurrentPage: payload, tablePaginationOffset: updatedOffset };
    },
    setTablePaginationOffset(state: any, payload: any) {
      return { ...state, tablePaginationOffset: payload };
    },
    setTablePaginationLimit(state: any, payload: any) {
      return { ...state, tablePaginationLimit: payload };
    },
    setQuery(state: any, payload: any) {
      return { ...state, query: payload };
    },
    setQueries(state: any, payload: any) {
      return { ...state, queries: payload };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async initView(payload: any, rootState: any) {
      const logger = log.noConflict();
      if (process.env.NODE_ENV !== 'production') {
        logger.enableAll();
      } else {
        logger.disableAll();
      }
      logger.info('githubPullrequests Logger initialized');
      dispatch.githubPullrequests.setLog(logger);
    },

    async saveQuery() {
      console.log('MODEL SAVE QUERY');
    },
    async deleteQuery() {
      console.log('MODEL DELETE QUERY');
    },

    async updateQuery(query: any) {
      if (query === null) {
        dispatch.githubPullrequests.setQuery({});
      } else {
        dispatch.githubPullrequests.setQuery(query);
      }
    },
  }),
};
