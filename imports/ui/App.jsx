import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {connect} from "react-redux";
import { withTracker } from 'meteor/react-meteor-data';

import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import ApolloProviderGithub from './services/ApolloProviderGithub.js';

import Public from './components/Public/Public.js';
import Authenticated from './components/Authenticated/Authenticated.js';

import Index from './Index.js';
import Wizard from './views/Wizard/index.js';
import Login from './views/Login/index.js';
import Issues from './views/Issues/index.js';
import Terms from './views/Terms/index.js';
import About from './views/About/index.js';

import UsersFetch from './data/Users/Fetch/index.js';

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { afterLoginPath: null };
      autoBind(this);
  }

  componentDidMount() {
    const { initApp } = this.props;
    initApp();
  }

  setAfterLoginPath(afterLoginPath) {
      this.setState({ afterLoginPath });
  }

  render() {
    const { props, state, setAfterLoginPath } = this;

    return (
      <ApolloProviderGithub> 
        <UsersFetch />
        <div className="App">
          <Router>
            <Switch>
                <Route exact name="index" path="/" component={Index} />
                <Public path="/login" component={Login} {...props} {...state} />
                <Authenticated exact path="/wizard" component={Wizard} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/issues" component={Issues} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/issues/:tab" component={Issues} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Public exact path="/terms" component={Terms} {...props} {...state} />
                <Public exact path="/about" component={About} {...props} {...state} />
            </Switch>
          </Router>
        </div>
      </ApolloProviderGithub>
    )
  }
}

App.propTypes = {
  initApp: PropTypes.func.isRequired,

};

const mapDispatch = dispatch => ({
  initApp: dispatch.global.initApp,
});

export default
    connect(null, mapDispatch)(
        withTracker(() => {
            const loggingIn = Meteor.loggingIn();
            const user = Meteor.user();
            const userId = Meteor.userId();
            const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
            const emailAddress = user && user.emails && user.emails[0].address;

            return {
                loggingIn,
                authenticated: !loggingIn && !!userId,
                name: name || emailAddress,
                userId,
                emailAddress,
                emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
            };
        })(App)
    );
