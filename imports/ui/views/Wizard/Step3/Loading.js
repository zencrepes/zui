import React, { Component } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {};

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userAuthLoading, userAuthError } = this.props;
    if (userAuthLoading) {
      return <CircularProgress />;
    } else if (!userAuthLoading && userAuthError !== null) {
      return <span>Unable to reach the elasticsearch server.</span>;
    }
    return null;
  }
}

const mapState = state => ({
  userAuthLoading: state.wizardView.userAuthLoading,
  userAuthError: state.wizardView.userAuthError
});

const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Loading));
