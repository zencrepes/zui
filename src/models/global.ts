// https://github.com/pimterry/loglevel
import * as log from 'loglevel';
import Keycloak from 'keycloak-js';
import axios from 'axios';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/link-context';

import { Dispatch } from '../store';
import Dexie from 'dexie';

interface Query {
  id?: number;
  dataset?: string;
  name?: string;
  query?: any;
}

const createApolloClient = (ghToken: string) => {
  const httpLink: any = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: ghToken !== '' ? `Bearer ${ghToken}` : '',
        // See https://developer.github.com/v4/previews/
        accept: 'application/vnd.github.bane-preview+json',
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([(authLink as unknown) as ApolloLink, httpLink]),
  });

  return client;
};

//https://github.com/dfahlander/Dexie.js/blob/master/samples/typescript-simple/src/index.ts
//https://github.com/dfahlander/Dexie.js/issues/801
class QueryDatabase extends Dexie {
  constructor() {
    super('queries');

    this.version(1).stores({
      queries: `++id,dataset,name,query`,
    });
  }
}

interface QueryDatabase {
  queries: Dexie.Table<Query, string>;
}

declare global {
  interface Window {
    Auth0: any;
  }
}

export const global = {
  state: {
    log: log.noConflict(),
    loading: false,
    showMenu: false,
    pageTitle: null,
    defaultPoints: true,

    // Authentication module
    authDisabled: JSON.parse(window._env_.KEYCLOAK_DISABLED), // Is authentication active, if false, then does not check authentication status
    loggedIn: false, // Is the user logged in
    keycloak: null,
    keycloakLogOut: null,
    authError: false,
    userName: '',
    userAvatarUrl: '',
    userEmail: null,
    userId: null,

    githubToken: null,
    githubClient: createApolloClient(''),

    auth0Initialized: false,
    authUser: null,
    authMessage: '',
    username: true,
    password: '',
    accessToken: '',

    loginMenuOpen: false,
    dexieDb: new QueryDatabase(),
  },
  reducers: {
    setLog(state: any, payload: any) {
      return { ...state, log: payload };
    },
    setLoading(state: any, payload: any) {
      return { ...state, loading: payload };
    },
    setKeycloak(state: any, payload: any) {
      return { ...state, keycloak: payload };
    },
    setAuthMessage(state: any, payload: any) {
      return { ...state, authMessage: payload };
    },
    setAuthUser(state: any, payload: any) {
      return { ...state, authUser: payload };
    },
    setLoggedIn(state: any, payload: any) {
      return { ...state, loggedIn: payload };
    },
    setUsername(state: any, payload: any) {
      return { ...state, username: payload };
    },
    setPassword(state: any, payload: any) {
      return { ...state, password: payload };
    },
    setAccessToken(state: any, payload: any) {
      return { ...state, accessToken: payload };
    },
    setDexieDB(state: any, payload: any) {
      return { ...state, dexieDb: payload };
    },
    setShowMenu(state: any, payload: any) {
      return { ...state, showMenu: payload };
    },
    setPageTitle(state: any, payload: any) {
      return { ...state, pageTitle: payload };
    },
    setDefaultPoints(state: any, payload: any) {
      return { ...state, defaultPoints: payload };
    },
    setLoginMenuOpen(state: any, payload: any) {
      return { ...state, loginMenuOpen: payload };
    },
    setAuthError(state: any, payload: any) {
      return { ...state, authError: payload };
    },
    setGithubToken(state: any, payload: any) {
      return { ...state, githubToken: payload };
    },
    setGithubClient(state: any, payload: any) {
      return { ...state, githubClient: payload };
    },
    setCallbackState(state: any, payload: any) {
      return {
        ...state,
        loggedIn: payload.loggedIn,
        accessToken: payload.accessToken,
        authUser: payload.authUser,
        auth0Initialized: payload.auth0Initialized,
      };
    },
    setUserSession(state: any, newState: any) {
      return {
        ...state,
        keycloak: Keycloak,
        keycloakLogOut: newState.keycloakLogOut,
        loggedIn: newState.loggedIn,
        userName: newState.name,
        userEmail: newState.Email,
        userId: newState.id,
      };
    },

    logOutUser(state: any) {
      return {
        ...state,
        keycloak: null,
        loggedIn: false,
        userName: '',
        userEmail: '',
        userId: '',
      };
    },
    logOutUserAuth(state: any) {
      return {
        ...state,
        keycloak: null,
        loggedIn: false,
        userName: '',
        userEmail: '',
        userId: '',
      };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async initApp(payload: any, rootState: any) {
      const logger = log.noConflict();
      if (process.env.NODE_ENV !== 'production') {
        logger.enableAll();
      } else {
        logger.disableAll();
      }
      logger.info('Logger initialized');
      dispatch.global.setLog(logger);

      if (rootState.global.authDisabled !== true && rootState.global.keycloak === null) {
        // https://stackoverflow.com/questions/41017287/cannot-use-new-with-expression-typescript
        const keycloak = Keycloak({
          url: window._env_.KEYCLOAK_AUTH_SERVER_URL,
          realm: window._env_.KEYCLOAK_REALM,
          clientId: window._env_.KEYCLOAK_CLIENT_ID,
        });
        keycloak
          .init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window._env_.KEYCLOAK_AUDIENCE + '/silent-check-sso.html',
          })
          .then((authenticated: boolean) => {
            if (authenticated === true && rootState.global.loggedIn === false && rootState.global.keycloak === null) {
              keycloak.loadUserInfo().then((userInfo: any) => {
                dispatch.global.setUserSession({
                  loggedIn: true,
                  keycloak: keycloak,
                  keycloakLogOut: keycloak.logout,
                  name: userInfo.name,
                  email: userInfo.email,
                  id: userInfo.sub,
                });
              });
              if (keycloak.token !== undefined) {
                localStorage.setItem('token', keycloak.token);
                //https://wjw465150.gitbooks.io/keycloak-documentation/server_admin/topics/identity-broker/tokens.html
                // Fetch GitHub user token
                // Using this feature requires `Stored Tokens Readable` to be enabled in Keycloak
                // This only works for new users, previously registered users will not have access to their tokens
                axios
                  .get(
                    window._env_.KEYCLOAK_AUTH_SERVER_URL +
                      'realms/' +
                      window._env_.KEYCLOAK_REALM +
                      '/broker/github/token',
                    {
                      headers: { Authorization: 'Bearer ' + keycloak.token },
                    },
                  )
                  .then(function (response) {
                    const decodedResponse = JSON.parse(
                      '{"' +
                        decodeURI(response.data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
                        '"}',
                    );
                    if (decodedResponse.access_token !== undefined) {
                      dispatch.global.setGithubToken(decodedResponse.access_token);
                      dispatch.global.setGithubApolloClient(decodedResponse.access_token);
                    }
                  })
                  .catch(function (error) {
                    console.log('Error fetching GitHub token');
                    console.log(error);
                    dispatch.global.setGithubToken(null);
                  });
              }
            } else {
              dispatch.global.setKeycloak(keycloak);
            }
          });
      }
    },

    async loginWithRedirect() {
      console.log('loginWithRedirect');
      const keycloak = Keycloak({
        url: window._env_.KEYCLOAK_AUTH_SERVER_URL,
        realm: window._env_.KEYCLOAK_REALM,
        clientId: window._env_.KEYCLOAK_CLIENT_ID,
      });
      keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
        console.log(authenticated);
        if (authenticated === true) {
          keycloak.loadUserInfo().then((userInfo: any) => {
            dispatch.global.setUserSession({
              loggedIn: true,
              keycloak: keycloak,
              name: userInfo.name,
              email: userInfo.email,
              id: userInfo.sub,
            });
          });
        }
      });
    },

    async setGithubApolloClient(ghToken: string) {
      const client = createApolloClient(ghToken);
      dispatch.global.setGithubClient(client);
    },

    async doLogOut(payload: any, rootState: any) {
      // Note: This is not a log-out, just a way to force the UI to re-login.
      // rootState.global.keycloak.logout();
      rootState.global.keycloakLogOut({ redirectUri: window._env_.ROOT_URL + '/login' });
      dispatch.global.logOutUser();
    },

    async doLogOutAuthError(payload: any, rootState: any) {
      // Note: This is not a log-out, just a way to force the UI to re-login.
      rootState.global.keycloakLogOut({ redirectUri: window._env_.ROOT_URL + '/login?authError' });
      dispatch.global.logOutUserAuth();
    },
  }),
};
