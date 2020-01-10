import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './views/dashboard';
import Settings from './views/settings';
import Data from './views/data';

interface Type {
  key: string;
  name: string;
}

interface TypeData {
  types: Type[];
}

const App: React.FC = () => {
  const DATATYPES = gql`
    {
      types {
        key
        name
      }
    }
  `;
  const { data } = useQuery<TypeData>(DATATYPES);

  if (data === undefined) {
    return <p>Loading..., please wait</p>;
  } else {
    console.log(data);
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route
              exact
              path='/'
              render={props => <Dashboard {...props} types={data.types} />}
            />
            <Route
              exact
              path='/dashboard'
              render={props => <Dashboard {...props} types={data.types} />}
            />
            <Route
              exact
              path='/settings'
              render={props => <Settings {...props} types={data.types} />}
            />
            {data.types.map(({ key }) => (
              <Route
                key={key}
                exact
                path={'/' + key}
                render={props => (
                  <Data {...props} types={data.types} currentTypeKey={key} />
                )}
              />
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
};

export default App;
