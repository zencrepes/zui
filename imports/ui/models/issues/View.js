export default {
  state: {
    issues: []
  },
  reducers: {
    setIssues(state, payload) {
      return { ...state, issues: payload };
    }
  },
  effects: {}
};
