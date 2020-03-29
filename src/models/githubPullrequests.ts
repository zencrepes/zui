// https://github.com/pimterry/loglevel
import * as log from 'loglevel';
import { createModel } from '@rematch/core';

declare global {
  interface Window {
    _env_: any;
  }
}

export const githubPullrequests = createModel({
  state: {
    log: {},
    loading: false,
    selectedTab: 'stats',
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
