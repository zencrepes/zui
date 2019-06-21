import axios from "axios";

export default {
  state: {
    steps: ["Welcome !", "Elasticsearch", "Test Connectivity", "Be Agile !"],
    activeStep: 0,
    reposIssues: 0,
    userAuth: {}
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
        reposIssuserAuthues: JSON.parse(JSON.stringify(payload))
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

    fetchAuth() {
      axios({
        method: "get",
        url: "http://localhost:5000/alive"
      })
        .then(function(response) {
          // handle success
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    }
  }
};
