import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import General from "../../layouts/General/index.js";

const style = {
  root: {
    marginRight: "10px"
  },
  fullWidth: {
    width: "100%"
  }
};

class Issues extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <General>
        <span>Some issues content</span>
      </General>
    );
  }
}

Issues.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Issues);
