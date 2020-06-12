import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { onError } from '@apollo/link-error';

import './index.css';
import App from './App';

import { Provider } from 'react-redux';

import { store } from './store';

const API_URL = window._env_.API_URL !== undefined ? window._env_.API_URL : 'http://127.0.0.1:5000/graphql';

const httpLink: any = createHttpLink({
  uri: API_URL,
});

// https://www.apollographql.com/docs/react/v3.0-beta/networking/authentication/
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token') === null ? 'Missing token' : localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);

  if (networkError !== undefined && String(networkError).includes('403')) {
    store.dispatch.global.doLogOutAuthError();
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([(authLink as unknown) as ApolloLink, errorLink, httpLink]),
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
