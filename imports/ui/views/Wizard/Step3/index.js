import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

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
        <span>Step 3 </span>
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
