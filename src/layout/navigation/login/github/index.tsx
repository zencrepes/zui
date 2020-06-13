import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';

import GithubMenu from './menu';

const GQL_QUERY = loader('./getUser.graphql');

const GithubLogin: React.FC<any> = () => {
  const { data } = useQuery(GQL_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined) {
    return null;
  }
  return <GithubMenu userData={data.viewer} />;
};

export default GithubLogin;
