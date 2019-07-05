import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import IssuesTableCo from "../../../../components/IssuesTable";

class IssuesTable extends Component {
  constructor(props) {
    super(props);
  }

  updatePaginationSize = paginationSize => {
    const { query, paginationFrom } = this.props;
    this.props.history.push({
      pathname: "/issues/list",
      search:
        "?q=" +
        encodeURIComponent(JSON.stringify(query)) +
        "&s=" +
        paginationSize +
        "&f=" +
        paginationFrom,
      state: { detail: query }
    });
  };

  updatePaginationFrom = paginationFrom => {
    const { query, paginationSize } = this.props;
    this.props.history.push({
      pathname: "/issues/list",
      search:
        "?q=" +
        encodeURIComponent(JSON.stringify(query)) +
        "&s=" +
        paginationSize +
        "&f=" +
        paginationFrom * paginationSize,
      state: { detail: query }
    });
  };

  render() {
    const {
      issues,
      paginationFrom,
      paginationSize,
      paginationTotal
    } = this.props;
    return (
      <IssuesTableCo
        issues={issues}
        paginationFrom={paginationFrom}
        paginationSize={paginationSize}
        paginationTotal={paginationTotal}
        updatePaginationFrom={this.updatePaginationFrom}
        updatePaginationSize={this.updatePaginationSize}
      />
    );
  }
}

IssuesTable.propTypes = {
  history: PropTypes.object.isRequired,

  issues: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
  paginationFrom: PropTypes.number.isRequired,
  paginationSize: PropTypes.number.isRequired,
  paginationTotal: PropTypes.number.isRequired
};

const mapState = state => ({
  issues: state.issuesView.issues,
  query: state.issuesView.query,
  paginationFrom: state.issuesView.paginationFrom,
  paginationSize: state.issuesView.paginationSize,
  paginationTotal: state.issuesView.paginationTotal
});

export default withRouter(
  connect(
    mapState,
    null
  )(IssuesTable)
);
