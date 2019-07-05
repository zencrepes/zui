import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import IssuesTable from "./IssuesTable/index.js";

class IssuesTabs extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event, value) => {
    const { changeTab } = this.props;
    changeTab(value);
  };

  render() {
    const { selectedTab } = this.props;
    return (
      <React.Fragment>
        <Tabs
          value={selectedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Explore" value="stats" />
          <Tab label="List" value="list" />
          <Tab label="Plan" value="work" />
          <Tab label="Review (past 4 weeks)" value="contributions" />
          <Tab label="Network" value="graph" />
          <Tab label="Velocity" value="velocity" />
          <Tab label="Burndown" value="burndown" />
        </Tabs>
        {
          {
            stats: <span>Stats</span>,
            list: <IssuesTable />,
            work: <span>Summary</span>,
            contributions: <span>Contributions</span>,
            graph: <span>Graph</span>,
            velocity: <span>Velocity</span>,
            burndown: <span>Burndown</span>
          }[selectedTab]
        }
      </React.Fragment>
    );
  }
}

IssuesTabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired
};

const mapState = state => ({
  selectedTab: state.issuesView.selectedTab
});

export default connect(
  mapState,
  null
)(IssuesTabs);
