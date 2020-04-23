import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';

import { store } from './store';

const API_URL = window._env_.API_URL !== undefined ? window._env_.API_URL : 'http://127.0.0.1:5000/graphql';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: API_URL,
  }),
});

declare global {
  interface Window {
    store: any;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
