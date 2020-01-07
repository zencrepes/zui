import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import './App.css';
import Content from './Content';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://127.0.0.1:5000/graphql'
  })
});

const App: React.FC = () => {
  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <Content />
      </ApolloProvider>
    </div>
  );
};

export default App;
