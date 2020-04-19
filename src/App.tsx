import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Dashboard from './views/dashboard';
import Settings from './views/settings';
import GithubPullrequests from './views/githubPullrequests';
import Data from './views/data';

import { Dataset } from './global';

interface DatasetData {
  nodes: Dataset[];
}

interface Config {
  config: {
    datasets: DatasetData;
  };
}

const mapDispatch = (dispatch: any) => ({
  initApp: dispatch.global.initApp,
});

type connectedProps = ReturnType<typeof mapDispatch>;

const App: React.FC<connectedProps> = (props: connectedProps) => {
  const { initApp } = props;
  initApp();
  const DATASETS = gql`
    {
      config {
        datasets {
          nodes {
            id
            name
            platform
          }
        }
      }
    }
  `;
  const { data } = useQuery<Config>(DATASETS);

  if (data === undefined) {
    return <p>Loading..., please wait</p>;
  } else {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <Dashboard {...props} datasets={data.config.datasets.nodes} />} />
            <Route
              exact
              path="/dashboard"
              render={(props) => <Dashboard {...props} datasets={data.config.datasets.nodes} />}
            />
            <Route
              exact
              path="/settings"
              render={(props) => <Settings {...props} datasets={data.config.datasets.nodes} />}
            />
            <Route
              exact
              path="/githubPullrequests"
              render={(props) => <GithubPullrequests {...props} datasets={data.config.datasets.nodes} />}
            />
            {data.config.datasets.nodes.map(({ id }) => (
              <Route
                key={id}
                exact
                path={'/' + id}
                render={(props) => <Data {...props} datasets={data.config.datasets.nodes} currentDatasetKey={id} />}
              />
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
};

export default connect(null, mapDispatch)(App);
