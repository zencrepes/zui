import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

class Authenticated extends React.Component {
    constructor(props) {
        super(props);
        props.setAfterLoginPath(`${window.location.pathname}${window.location.search}`);
    }

    render() {
        const {loggingIn, authenticated, component, path, exact, ...rest} = this.props;

        //Redirect to wizard if connection to ES cluster is not configured
        let redirectWizard = false;
        if (JSON.parse(reactLocalStorage.get('cfg_es_host', null)) === null && JSON.parse(reactLocalStorage.get('cfg_ess_id', null)) === null && path !== '/wizard') {
            redirectWizard = true;
        }

        return (
            <Route
                path={path}
                exact={exact}
                render={props => (
                    authenticated ?
                        (
                            redirectWizard ? (
                                <Redirect to="/wizard" />
                            ) : (
                                React.createElement(component, {
                                ...props, ...rest, loggingIn, authenticated,
                                })
                            )
                        ) :
                        (<Redirect to="/login" />)
                )}
            />
        );
    }
}

Authenticated.defaultProps = {
    path: '',
    exact: false,
};

Authenticated.propTypes = {
    loggingIn: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    component: PropTypes.object.isRequired,
    setAfterLoginPath: PropTypes.func.isRequired,
    path: PropTypes.string,
    exact: PropTypes.bool,
};

export default Authenticated;