import React, { Component } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {};

class Elasticsearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userAuth, userAuthLoading } = this.props;
    if (!isEmpty(userAuth) && !userAuthLoading) {
      return (
        <React.Fragment>
          <span>Success</span> <br />
          <span>{JSON.stringify(userAuth)}</span>
        </React.Fragment>
      );
    }
    return null;
  }
}

const mapState = state => ({
  userAuth: state.wizardView.userAuth,
  userAuthLoading: state.wizardView.userAuthLoading
});

const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Elasticsearch));
