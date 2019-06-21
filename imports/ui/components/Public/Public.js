import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const Public = ({
  loggingIn,
  authenticated,
  component,
  path,
  exact,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      React.createElement(component, {
        ...props,
        ...rest,
        loggingIn,
        authenticated
      })
    }
  />
);

Public.defaultProps = {
  path: "",
  exact: false,
  afterLoginPath: null
};

Public.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  afterLoginPath: PropTypes.string,
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  exact: PropTypes.bool
};

export default Public;
