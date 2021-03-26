import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Loading from './utils/loading';

import Dashboard from './views/dashboard';
import Settings from './views/settings';
import GithubPullrequests from './views/githubPullrequests';
import GithubVulnerabilities from './views/githubVulnerabilities';
import GithubRepositories from './views/githubRepositories';
import GithubWatchers from './views/githubWatchers';
import GithubLabels from './views/githubLabels';
import GithubMilestones from './views/githubMilestones';
import GithubProjects from './views/githubProjects';
import GithubReleases from './views/githubReleases';
import GithubIssues from './views/githubIssues';
import GithubMavenPoms from './views/githubMavenPoms';
import JiraIssues from './views/jiraIssues';
import CircleciEnvvars from './views/circleciEnvvars';
import CircleciPipelines from './views/circleciPipelines';
import CircleciInsights from './views/circleciInsights';
import TestingStates from './views/testingStates';
import TestingRuns from './views/testingRuns';
import BambooRuns from './views/bambooRuns';
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
      <Loading />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Dashboard />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route exact path="/githubPullrequests" render={() => <GithubPullrequests />} />
          <Route exact path="/githubVulnerabilities" render={() => <GithubVulnerabilities />} />
          <Route exact path="/githubRepositories" render={() => <GithubRepositories />} />
          <Route exact path="/githubWatchers" render={() => <GithubWatchers />} />
          <Route exact path="/githubLabels" render={() => <GithubLabels />} />
          <Route exact path="/githubMilestones" render={() => <GithubMilestones />} />
          <Route exact path="/githubProjects" render={() => <GithubProjects />} />
          <Route exact path="/githubReleases" render={() => <GithubReleases />} />
          <Route exact path="/githubIssues" render={() => <GithubIssues />} />
          <Route exact path="/githubMavenPoms" render={() => <GithubMavenPoms />} />
          <Route exact path="/jiraIssues" render={() => <JiraIssues />} />
          <Route exact path="/circleciEnvvars" render={() => <CircleciEnvvars />} />
          <Route exact path="/circleciPipelines" render={() => <CircleciPipelines />} />
          <Route exact path="/circleciInsights" render={() => <CircleciInsights />} />
          <Route exact path="/testingStates" render={() => <TestingStates />} />
          <Route exact path="/testingRuns" render={() => <TestingRuns />} />
          <Route exact path="/bambooRuns" render={() => <BambooRuns />} />
        </Switch>
      </Router>
    </div>
  );
};

export default connect(null, mapDispatch)(App);
