import React from 'react';
import { connect } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { iRootState } from '../../../store';

import DefaultLogin from './default';
import GithubLogin from './github/index';

const mapState = (state: iRootState) => ({
  loggedIn: state.global.loggedIn,
  githubToken: state.global.githubToken,
  githubClient: state.global.githubClient,
});

const mapDispatch = (dispatch: any) => ({
  doLogOut: dispatch.global.doLogOut,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const Login: React.FC<connectedProps> = (props: connectedProps) => {
  const { loggedIn, githubToken, githubClient } = props;

  if (loggedIn === false) {
    return null;
  }

  if (githubToken !== null) {
    return (
      <ApolloProvider client={githubClient}>
        <GithubLogin />
      </ApolloProvider>
    );
  } else {
    return <DefaultLogin />;
  }
};

export default connect(mapState, mapDispatch)(Login);
