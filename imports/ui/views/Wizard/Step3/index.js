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

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchAuth: PropTypes.func.isRequired
};

const mapDispatch = dispatch => ({
  fetchAuth: dispatch.wizardView.fetchAuth
});

export default connect(
  null,
  mapDispatch
)(withStyles(styles)(Step3));
