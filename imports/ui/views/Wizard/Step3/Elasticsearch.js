import React, { Component } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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
          <span>
            You are successfully connected with username: {userAuth.username}
          </span>
          <br />
          <span>Your roles are: {JSON.stringify(userAuth.roles)}</span>
        </React.Fragment>
      );
    }
    return null;
  }
}

Elasticsearch.propTypes = {
  classes: PropTypes.object.isRequired,
  userAuthLoading: PropTypes.string.isRequired,
  userAuth: PropTypes.string.isRequired
};

const mapState = state => ({
  userAuth: state.wizardView.userAuth,
  userAuthLoading: state.wizardView.userAuthLoading
});

export default connect(
  mapState,
  null
)(withStyles(styles)(Elasticsearch));
