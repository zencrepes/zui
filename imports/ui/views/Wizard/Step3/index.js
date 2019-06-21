import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Loading from "./Loading";
import Elasticsearch from "./Elasticsearch";
import RetryButton from "./RetryButton";

const styles = {};

class Step3 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchAuth } = this.props;
    fetchAuth();
  }

  render() {
    return (
      <React.Fragment>
        <Loading />
        <Elasticsearch />
        <RetryButton />
      </React.Fragment>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  fetchAuth: dispatch.wizardView.fetchAuth
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Step3));
