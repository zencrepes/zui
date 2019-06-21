import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const styles = {
  root: {},
  subtitle: {
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.5
  },
  paragraph: {
    color: "#898989",
    lineHeight: 1.75,
    fontSize: "16px",
    margin: "0 0 10px",
    fontFamily: "Roboto",
    fontWeight: 400
  }
};

class Step1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <p className={classes.subtitle}>Not a client-side app!</p>
        <p className={classes.paragraph}>
          You are connected to the API-backed implementation of ZenCrepes. This
          version was created to address the primary issue with the first
          version: performance!
        </p>
        <p className={classes.subtitle}>Connect to an Elasticsearch cluster</p>
        <p className={classes.paragraph}>
          Performance issues are addressed by having an API running computation
          intensive tasks and connecting directly to an Elasticsearch cluster
          populated with GitHub data. <br />
          The next step of the wizard will let you specify a remote cluster to
          connect to. ZenCrepes API is stateless, it does process your data, but
          doesn&apos;t store anything outside of your Elasticsearch cluster.
        </p>
        <p className={classes.subtitle}>Still connected to GitHub</p>
        <p className={classes.paragraph}>
          But ZenCrepes still reaches out to GitHub API whenever you want to
          update content., so watch out for{" "}
          <a href="https://developer.github.com/v4/guides/resource-limitations/">
            API resources limits
          </a>
          . You get 5000 points per 1 hour window, ZenCrepes displays your
          current points quota at the bottom of the page.
        </p>
      </React.Fragment>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Step1);
