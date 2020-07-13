import { Dispatch } from '../store';

export const loading = {
  state: {
    loading: false, // Flag indicating something is loading
    loadingTitle: null, // Title to be displayed
    loadingMsg: null, // Message to be displayed in the modal or the snackbar
    loadingMsgAlt: null, // Alternative message (2nd line) to be displayed in the modal or the snackbar
    loadingModal: true, // True to display a modal, false to display a snackbar
    loadingIterateCurrent: 0, // For progressbar, current count
    loadingIterateTotal: 0, // For progressbar, maximum count
    loadingSuccess: false, // Flag indicating if loading was successful
    loadingSuccessMsg: null, // Message to be displayed at the end of loading (successful or not)

    onSuccess: () => {
      console.log('onSuccess is empty');
    }, // Function to be executed on load Success
    onCancel: () => {
      console.log('onSuccess is empty');
    }, // Function to be executed on load Cancel
    onFailure: () => {
      console.log('onSuccess is empty');
    }, // Function to be executed on load Failure
  },

  reducers: {
    setLoading(state: any, payload: any) {
      if (payload === true) {
        return { ...state, loading: payload };
      } else {
        return {
          ...state,
          loading: payload,
          loadingTitle: null,
          loadingMsg: null,
          loadingMsgAlt: null,
          loadingModal: true,
          loadingIterateCurrent: 0,
          loadingIterateTotal: 0,
        };
      }
    },
    setLoadingTitle(state: any, payload: any) {
      return { ...state, loadingTitle: payload };
    },
    setLoadingMsg(state: any, payload: any) {
      return { ...state, loadingMsg: payload };
    },
    setLoadingMsgAlt(state: any, payload: any) {
      return { ...state, loadingMsgAlt: payload };
    },
    setLoadingModal(state: any, payload: any) {
      return { ...state, loadingModal: payload };
    },
    setLoadingIterateCurrent(state: any, payload: any) {
      return { ...state, loadingIterateCurrent: payload };
    },
    incLoadingIterateCurrent(state: any, payload: any) {
      return { ...state, loadingIterateCurrent: state.loadingIterateCurrent + payload };
    },
    setLoadingIterateTotal(state: any, payload: any) {
      return { ...state, loadingIterateTotal: payload };
    },
    setLoadingSuccess(state: any, payload: any) {
      return { ...state, loadingSuccess: payload };
    },
    setLoadingSuccessMsg(state: any, payload: any) {
      return { ...state, loadingSuccessMsg: payload };
    },

    setOnSuccess(state: any, payload: any) {
      return { ...state, onSuccess: payload };
    },
    setOnCancel(state: any, payload: any) {
      return { ...state, onCancel: payload };
    },
    setOnFailure(state: any, payload: any) {
      return { ...state, onFailure: payload };
    },
  },

  effects: (dispatch: Dispatch) => ({
    async cancelLoading() {
      dispatch.loading.setLoading(false);
      dispatch.loading.setLoadingMsg('');
    },

    async resetLoading() {
      dispatch.loading.setLoading(false);
      dispatch.loading.setLoadingMsg('');
      dispatch.loading.setLoadingMsgAlt('');
      dispatch.loading.setLoadingModal(true);
      dispatch.loading.setLoadingIterateCurrent(0);
      dispatch.loading.setLoadingIterateTotal(0);
      dispatch.loading.setLoadingSuccess(false);
      dispatch.loading.setLoadingSuccessMsg('');
    },
  }),
};
