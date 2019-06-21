import axios from "axios";

export default {
  state: {
    steps: ["Welcome !", "Elasticsearch", "Test Connectivity", "Be Agile !"],
    activeStep: 0,
    reposIssues: 0,
    userAuth: {},
    userAuthError: null,
    userAuthLoading: false
  },
  reducers: {
    setActiveStep(state, payload) {
      return { ...state, activeStep: payload };
    },
    setReposIssues(state, payload) {
      return { ...state, reposIssues: payload };
    },
    setUserAuth(state, payload) {
      return {
        ...state,
        userAuth: JSON.parse(JSON.stringify(payload))
      };
    },
    setUserAuthError(state, payload) {
      return {
        ...state,
        userAuthError: payload
      };
    },
    setUserAuthLoading(state, payload) {
      return {
        ...state,
        userAuthLoading: payload
      };
    }
  },
  effects: {
    changeActiveStep(payload) {
      this.setActiveStep(payload);
      this.updateReposIssues();
    },
    updateReposIssues() {
      const issuesCount = 0;
      //            const issuesCount = cfgSources.find({active: true}).map(repo => repo.issues.totalCount).reduce((acc, count) => acc + count, 0);
      this.setReposIssues(issuesCount);
    },

    // Fetch the auth status of the Elasticsearch instance.
    // This is used to validate the ES cluster is actually reachable for querying
    fetchAuth(payload, rootState) {
      const setUserAuth = this.setUserAuth;
      const setUserAuthLoading = this.setUserAuthLoading;
      const setUserAuthError = this.setUserAuthError;
      setUserAuthLoading(true);
      setUserAuth({});
      axios({
        method: "get",
        url: rootState.global.api + "/alive",
        headers: rootState.global.apiHeaders
      })
        .then(function(response) {
          setUserAuth(response.data.body);
          setUserAuthError(null);
        })
        .catch(function(error) {
          setUserAuth({});
          setUserAuthError(error);
        })
        .finally(function() {
          setUserAuthLoading(false);
        });
    }
  }
};
