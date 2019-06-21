import React, { Component } from "react";
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

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  userAuthLoading: PropTypes.bool.isRequired,
  userAuthError: PropTypes.object
};

const mapState = state => ({
  userAuthLoading: state.wizardView.userAuthLoading,
  userAuthError: state.wizardView.userAuthError
});

export default connect(
  mapState,
  null
)(withStyles(styles)(Loading));
