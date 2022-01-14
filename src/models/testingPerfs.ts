// https://github.com/pimterry/loglevel
import * as log from 'loglevel';

import { Dispatch } from '../store';

declare global {
  interface Window {
    _env_: any;
  }
}

interface TestingPerfs {
  state: any;
  reducers: any;
  effects: any;
}

const comparisonTableColumns = [
  {
    id: 'sampleCount',
    name: 'Samples',
    type: 'count',
    visible: true,
    description: 'Number of samples in the transaction',
  },
  {
    id: 'errorCount',
    name: 'Errors',
    type: 'count',
    visible: true,
    description: 'Number of samples in the transaction that resulted in an error',
  },
  {
    id: 'errorPct',
    name: 'Error %',
    type: 'count',
    visible: false,
    description: 'Percentage of the samples in the transaction transaction which returned an error',
  },
  {
    id: 'minResTime',
    name: 'Min',
    type: 'responseTime',
    visible: false,
    description: 'Lowest response time across all samples of the transaction',
  },
  {
    id: 'maxResTime',
    name: 'Max',
    type: 'responseTime',
    visible: false,
    description: 'Highest response time across all samples of the transaction',
  },
  {
    id: 'meanResTime',
    name: 'Mean',
    type: 'responseTime',
    visible: true,
    description: 'The average response time across all samples of the transaction',
  },
  {
    id: 'medianResTime',
    name: 'Median',
    type: 'responseTime',
    visible: false,
    description:
      'Number which divides the samples into two equal halves. Half of the smaples are higher than this value while the other half is lower',
  },
  {
    id: 'pct1ResTime',
    name: '90%',
    type: 'responseTime',
    visible: true,
    description: '90% of the samples are below that value',
  },
  {
    id: 'pct2ResTime',
    name: '95%',
    type: 'responseTime',
    visible: true,
    description: '95% of the samples are below that value',
  },
  {
    id: 'pct3ResTime',
    name: '99%',
    type: 'responseTime',
    visible: true,
    description: '99% of the samples are below that value',
  },
  {
    id: 'throughput',
    name: 'Throughput',
    type: 'count',
    visible: true,
    description: 'Number of samples processsed per second across the transaction',
  },
];

export const testingPerfs: TestingPerfs = {
  state: {
    log: {},
    loading: false,
    selectedTab: 'explore',
    dataset: 'testingPerfs',

    query: {},
    queries: [],

    analyzeSelectedRunId: '',

    tablePaginationRowsPerPage: 25,
    tablePaginationCurrentPage: 0,
    tablePaginationOffset: 0,
    tablePaginationLimit: 25,
    defaultPoints: false,

    comparisonTableColumns: comparisonTableColumns,
    comparisonTableHideCompare: false,
    compareAvailableQueries: [],
    compareAvailableProfiles: [],
    compareReferenceQuerySelected: {},
    compareReferenceProfileSelected: '',
    compareData: {},
    compareReferenceData: {},
    compareComparisonQuerySelected: {},
    compareComparisonData: {},

    openComparisonTableConfigModal: false,

    openEditRunModal: false,
    openEditRunId: '',
    openEditRun: {},
    openEditRunOnSuccess: () => {
      console.log('onSuccess is empty');
    }, // Function to be executed on load Success
    openEditRunOnCancel: () => {
      console.log('onSuccess is empty');
    }, // Function to be executed on load Cancel
    openEditRunOnFailure: () => {
      console.log('onSuccess is empty');
    }, // Function to be executed on load Failure
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
    setAnalyzeSelectedRunId(state: any, payload: any) {
      return { ...state, analyzeSelectedRunId: payload };
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
    setCompareAvailableQueries(state: any, payload: any) {
      return { ...state, compareAvailableQueries: payload };
    },
    setComparisonTableColumns(state: any, payload: any) {
      return { ...state, comparisonTableColumns: payload };
    },
    setCompareAvailableProfiles(state: any, payload: any) {
      return { ...state, compareAvailableProfiles: payload };
    },
    setCompareReferenceQuerySelected(state: any, payload: any) {
      return { ...state, compareReferenceQuerySelected: payload };
    },
    setCompareComparisonQuerySelected(state: any, payload: any) {
      return { ...state, compareComparisonQuerySelected: payload };
    },
    setCompareReferenceProfileSelected(state: any, payload: any) {
      return { ...state, compareReferenceProfileSelected: payload };
    },
    setOpenComparisonTableConfigModal(state: any, payload: any) {
      return { ...state, openComparisonTableConfigModal: payload };
    },
    setCompareData(state: any, payload: any) {
      return { ...state, compareData: payload };
    },
    setCompareReferenceData(state: any, payload: any) {
      return { ...state, compareReferenceData: payload };
    },
    setCompareComparisonData(state: any, payload: any) {
      return { ...state, compareComparisonData: payload };
    },
    setComparisonTableHideCompare(state: any, payload: any) {
      return { ...state, comparisonTableHideCompare: payload };
    },
    setOpenEditRunModal(state: any, payload: any) {
      return { ...state, openEditRunModal: payload };
    },
    setOpenEditRunId(state: any, payload: any) {
      return { ...state, openEditRunId: payload };
    },
    setOpenEditRun(state: any, payload: any) {
      return { ...state, openEditRun: payload };
    },
    setOpenEditRunOnSuccess(state: any, payload: any) {
      return { ...state, openEditRunOnSuccess: payload };
    },
    setOpenEditRunOnCancel(state: any, payload: any) {
      return { ...state, openEditRunOnCancel: payload };
    },
    setOpenEditRunOnFailure(state: any, payload: any) {
      return { ...state, openEditRunOnFailure: payload };
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
      logger.info('testingPerfs Logger initialized');
      dispatch.testingPerfs.setLog(logger);
    },

    async saveQuery() {
      console.log('MODEL SAVE QUERY');
    },
    async deleteQuery() {
      console.log('MODEL DELETE QUERY');
    },

    async updateQueryIfDifferent(newQuery: any, rootState: any) {
      const originalQuery = rootState.testingPerfs.query;
      // Only update the store if the query is different than store
      // Might need to replace stringify by Lodash isEqual
      if (JSON.stringify(originalQuery) !== JSON.stringify(newQuery)) {
        if (newQuery === null) {
          dispatch.testingPerfs.setQuery({});
        } else {
          dispatch.testingPerfs.setQuery(newQuery);
        }
      }
    },

    async updateTabIfDifferent(newTab: any, rootState: any) {
      const originalTab = rootState.testingPerfs.selectedTab;
      if (originalTab !== newTab) {
        dispatch.testingPerfs.setSelectedTab(newTab);
      }
    },
  }),
};
