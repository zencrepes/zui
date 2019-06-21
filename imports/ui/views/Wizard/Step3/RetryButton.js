import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {};

class RetryButton extends Component {
  constructor(props) {
    super(props);
  }

  retryAuth = () => {
    const { fetchAuth } = this.props;
    fetchAuth();
  };

  render() {
    const { userAuthLoading } = this.props;
    if (!userAuthLoading) {
      return (
        <Button
          aria-owns={"retry-auth"}
          aria-haspopup="true"
          onClick={this.retryAuth}
          color="primary"
        >
          Retry
        </Button>
      );
    }
    return null;
  }
}

RetryButton.propTypes = {
  classes: PropTypes.object.isRequired,
  userAuthLoading: PropTypes.bool.isRequired,
  fetchAuth: PropTypes.func.isRequired
};

const mapState = state => ({
  userAuthLoading: state.wizardView.userAuthLoading
});

const mapDispatch = dispatch => ({
  fetchAuth: dispatch.wizardView.fetchAuth
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(RetryButton));
