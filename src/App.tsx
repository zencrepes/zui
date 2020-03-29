import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './views/dashboard';
import Settings from './views/settings';
import GithubPullrequests from './views/githubPullrequests';
import Data from './views/data';

interface Dataset {
  key: string;
  name: string;
}

interface DatasetData {
  nodes: Dataset[];
}

interface Config {
  config: {
    datasets: DatasetData;
  };
}

const App: React.FC = () => {
  const DATASETS = gql`
    {
      config {
        datasets {
          nodes {
            key
            name
          }
        }
      }
    }
  `;
  const { data } = useQuery<Config>(DATASETS);

  if (data === undefined) {
    return <p>Loading..., please wait</p>;
  } else {
    console.log(data);
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
            {data.config.datasets.nodes.map(({ key }) => (
              <Route
                key={key}
                exact
                path={'/' + key}
                render={(props) => <Data {...props} datasets={data.config.datasets.nodes} currentDatasetKey={key} />}
              />
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
};

export default App;
