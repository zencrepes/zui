import { Meteor } from "meteor/meteor";
import axios from "axios";

const getIssuePoints = issue => {
  if (issue.labels !== undefined) {
    //Get points from labels
    // Regex to test: SP:[.\d]
    let pointsExp = RegExp("SP:[.\\d]");
    //let pointsLabelExp = RegExp('loe:(?<name>.+)');
    for (var currentLabel of issue.labels.edges) {
      if (pointsExp.test(currentLabel.node.name)) {
        let points = parseInt(currentLabel.node.name.replace("SP:", ""));
        return points;
      } else if (pointsExp.test(currentLabel.node.description)) {
        let points = parseInt(currentLabel.node.description.replace("SP:", ""));
        return points;
      } else if (
        Meteor.settings.public.labels.effort !== undefined &&
        Meteor.settings.public.labels.effort[currentLabel.node.name] !==
          undefined &&
        Number.isInteger(
          Meteor.settings.public.labels.effort[currentLabel.node.name]
        )
      ) {
        // Interesting edge case, if the label is actually named "constructor"
        // Added this check: Number.isInteger(Meteor.settings.public.labels.effort[currentLabel.node.name])
        return parseInt(
          Meteor.settings.public.labels.effort[currentLabel.node.name]
        );
        /*
            if (Meteor.settings.public.labels.effort !== undefined) {
                const pointsLabel = pointsLabelExp.exec(currentLabel.node.name);
                const efforts = Meteor.settings.public.labels.effort;
                if (efforts[pointsLabel.groups.name] !== undefined) {
                    issueObj['points'] = efforts[pointsLabel.groups.name];
                }
            }
            */
      }
    }
  }
};

export default {
  state: {
    query: {},
    selectedTab: "stats", // Selected tab to be displayed

    //Issues
    issues: [],
    paginationFrom: 0,
    paginationSize: 50,
    paginationTotal: 0
  },
  reducers: {
    setQuery(state, payload) {
      return { ...state, query: JSON.parse(JSON.stringify(payload)) };
    },
    setSelectedTab(state, payload) {
      return { ...state, selectedTab: payload };
    },
    setIssues(state, payload) {
      return { ...state, issues: payload };
    },
    setPaginationFrom(state, payload) {
      return { ...state, paginationFrom: payload };
    },
    setPaginationSize(state, payload) {
      return { ...state, paginationSize: payload };
    },
    setPaginationTotal(state, payload) {
      return { ...state, paginationTotal: payload };
    }
  },
  effects: {
    async updateQuery(queryParams, rootState) {
      const { query, paginationFrom, paginationSize } = queryParams;
      let updateIssues = false;
      if (
        JSON.stringify(query) !== JSON.stringify(rootState.issuesView.query)
      ) {
        this.setQuery(query);
        updateIssues = true;
      }
      if (query === null) {
        this.setQuery({});
        updateIssues = true;
      }
      if (parseInt(paginationFrom) !== rootState.issuesView.paginationFrom) {
        this.setPaginationFrom(parseInt(paginationFrom));
        updateIssues = true;
      }
      if (parseInt(paginationSize) !== rootState.issuesView.paginationSize) {
        this.setPaginationSize(parseInt(paginationSize));
        updateIssues = true;
      }
      if (updateIssues === true || rootState.issuesView.issues.length === 0) {
        this.fetchIssues();
      }
    },
    updatePaginationFrom(payload) {
      this.setPaginationFrom(payload);
      this.fetchIssues();
    },
    updatePaginationSize(payload) {
      this.setPaginationSize(payload);
      this.fetchIssues();
    },

    async updateSelectedTab(payload, rootState) {
      if (payload !== rootState.issuesView.selectedTab) {
        const log = rootState.global.log;
        log.info("Triggered updateSelectedTab() - " + payload);
        this.setSelectedTab(payload);
      }
    },

    async fetchIssues(payload, rootState) {
      const setIssues = this.setIssues;
      const setPaginationTotal = this.setPaginationTotal;
      axios({
        method: "get",
        headers: rootState.global.apiHeaders,
        url: rootState.global.api + "/issues",
        params: {
          q: rootState.issuesView.query,
          f: rootState.issuesView.paginationFrom,
          s: rootState.issuesView.paginationSize
        }
      })
        .then(function(response) {
          setIssues(
            response.data.issues
            //response.data.body.hits.hits.map(hit => hit._source)
            //.map(issue => {
            //  return { ...issue, points: getIssuePoints(issue) };
            //})
          );
          setPaginationTotal(response.data.total);
        })
        .catch(function() {
          setIssues([]);
          setPaginationTotal(0);
        });
    }
  }
};
