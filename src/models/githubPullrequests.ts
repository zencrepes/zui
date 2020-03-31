// https://github.com/pimterry/loglevel
import * as log from 'loglevel';
import { createModel } from '@rematch/core';

declare global {
  interface Window {
    _env_: any;
  }
}

const facets = [
  {
    type: 'term',
    field: 'author.login',
    name: 'Authors',
    nullValue: 'EMPTY',
  },
  {
    type: 'term',
    field: 'state',
    name: 'States',
    nullValue: 'EMPTY',
  },
  {
    type: 'term',
    field: 'repository.name.keyword',
    name: 'Repository',
    nullValue: 'EMPTY',
  },
  {
    type: 'term',
    field: 'repository.owner.login',
    name: 'Organization',
    nullValue: 'EMPTY',
  },
  {
    type: 'term',
    field: 'milestone.title.keyword',
    name: 'Milestones',
    nullValue: 'EMPTY',
  },
  {
    type: 'term',
    field: 'milestone.state',
    name: 'Milestones States',
    nullValue: 'EMPTY',
  },
  {
    type: 'date',
    field: 'createdAt',
    name: 'Created At',
  },
  {
    type: 'date',
    field: 'closedAt',
    name: 'Closed At',
  },
];

export const githubPullrequests = createModel({
  state: {
    log: {},
    loading: false,
    selectedTab: 'explore',

    tablePaginationRowsPerPage: 25,
    tablePaginationCurrentPage: 0,
    tablePaginationOffset: 0,
    tablePaginationLimit: 25,
    facets: facets,
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
  },
  effects: {
    async initView() {
      const logger = log.noConflict();
      if (process.env.NODE_ENV !== 'production') {
        logger.enableAll();
      } else {
        logger.disableAll();
      }
      logger.info('githubPullrequests Logger initialized');
      this.setLog(logger);
    },
  },
});
