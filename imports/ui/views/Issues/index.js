import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import General from "../../layouts/General/index.js";
import IssuesTabs from "./Tabs";

const style = {
  root: {
    marginRight: "10px"
  },
  fullWidth: {
    width: "100%"
  }
};

class Issues extends Component {
  constructor(props) {
    super(props);
  }

  //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  componentDidMount() {
    const { updateQuery, updateSelectedTab, match } = this.props;
    const params = new URLSearchParams(this.props.location.search);

    const query =
      params.get("q") !== null
        ? JSON.parse(decodeURIComponent(params.get("q")))
        : null;

    const paginationFrom = params.get("f") !== null ? params.get("f") : null;
    const paginationSize = params.get("s") !== null ? params.get("s") : null;
    const tab = match.params.tab !== undefined ? match.params.tab : null;

    if (
      query === null ||
      paginationFrom === null ||
      paginationSize === null ||
      tab === null
    ) {
      this.updateUrl(query, tab, paginationFrom, paginationSize);
    } else {
      updateQuery({ query, paginationFrom, paginationSize });
      updateSelectedTab(updateSelectedTab);
    }
  }

  componentDidUpdate() {
    const { updateQuery, updateSelectedTab, match } = this.props;
    const params = new URLSearchParams(this.props.location.search);
    const query =
      params.get("q") !== null
        ? JSON.parse(decodeURIComponent(params.get("q")))
        : null;

    const paginationFrom = params.get("f") !== null ? params.get("f") : null;
    const paginationSize = params.get("s") !== null ? params.get("s") : null;
    const tab = match.params.tab !== undefined ? match.params.tab : null;

    if (
      query === null ||
      paginationFrom === null ||
      paginationSize === null ||
      tab === null
    ) {
      this.updateUrl(query, tab, paginationFrom, paginationSize);
    } else {
      updateQuery({ query, paginationFrom, paginationSize });
      updateSelectedTab(tab);
    }
  }

  updateUrl = (query, tab, paginationFrom, paginationSize) => {
    const updatedQuery = query === null ? {} : query;
    const updatedTab = tab === null ? "stats" : tab;
    const updatedPaginationFrom = paginationFrom === null ? 0 : paginationFrom;
    const updatedPaginationSize = paginationSize === null ? 50 : paginationSize;
    this.props.history.push({
      pathname: "/issues/" + updatedTab,
      search:
        "?q=" +
        encodeURIComponent(JSON.stringify(updatedQuery)) +
        "&s=" +
        updatedPaginationSize +
        "&f=" +
        updatedPaginationFrom,
      state: { detail: query }
    });
  };

  // Receive request to change tab, update URL accordingly
  changeTab = newTab => {
    const params = new URLSearchParams(this.props.location.search);
    const query =
      params.get("q") !== null
        ? JSON.parse(decodeURIComponent(params.get("q")))
        : null;

    const paginationFrom = params.get("f") !== null ? params.get("f") : null;
    const paginationSize = params.get("s") !== null ? params.get("s") : null;
    this.updateUrl(query, newTab, paginationFrom, paginationSize);
  };

  render() {
    const { classes } = this.props;
    return (
      <General>
        <React.Fragment>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={8}
          >
            <Grid item>
              <span>Facets</span>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12} sm className={classes.fullWidth}>
                  <span>Query</span>
                </Grid>
                <Grid item xs={12} sm className={classes.fullWidth}>
                  <IssuesTabs changeTab={this.changeTab} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </General>
    );
  }
}

Issues.propTypes = {
  classes: PropTypes.object.isRequired,
  updateQuery: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  issues: PropTypes.array.isRequired,
  updateSelectedTab: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatch = dispatch => ({
  updateQuery: dispatch.issuesView.updateQuery,
  updateSelectedTab: dispatch.issuesView.updateSelectedTab
});

const mapState = state => ({
  issues: state.issuesView.issues
});

export default connect(
  mapState,
  mapDispatch
)(withRouter(withStyles(style)(Issues)));
