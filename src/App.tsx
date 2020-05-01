import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Dashboard from './views/dashboard';
import Settings from './views/settings';
import GithubPullrequests from './views/githubPullrequests';
import GithubVulnerabilities from './views/githubVulnerabilities';
import Login from './views/login';

const mapState = () => ({});

const mapDispatch = (dispatch: any) => ({
  initApp: dispatch.global.initApp,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const App: React.FC<connectedProps> = (props: connectedProps) => {
  const { initApp } = props;
  initApp();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Dashboard />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route exact path="/githubPullrequests" render={() => <GithubPullrequests />} />
          <Route exact path="/githubVulnerabilities" render={() => <GithubVulnerabilities />} />
        </Switch>
      </Router>
    </div>
  );
};

export default connect(null, mapDispatch)(App);
