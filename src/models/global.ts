// https://github.com/pimterry/loglevel
import * as log from 'loglevel';
import Keycloak from 'keycloak-js';
import axios from 'axios';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { setContext } from '@apollo/link-context';
import { onError } from '@apollo/client/link/error';

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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([(authLink as unknown) as ApolloLink, errorLink, httpLink]),
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

/*
  This function refreshes the token
  The token is stored to localstorage and automatically fetched by Apollo (see src/index.tsx) for each call
*/
const refreshToken = (keycloak: any) => {
  setInterval(function () {
    keycloak
      .updateToken(30) // Number of seconds prior to expiry
      .then(() => {
        // console.log(
        //   new Date().toISOString() +
        //     ': successfully got a new token: ' +
        //     keycloak.token.slice(0, 10) +
        //     '-' +
        //     keycloak.token.slice(-10),
        // );
        localStorage.setItem('token', keycloak.token);
      })
      .catch(() => {
        console.log('Unable to refresh token');
      });
  }, 60000);
};

interface Global {
  state: any;
  reducers: any;
  effects: any;
}

export const global: Global = {
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
    zapiClient: createApolloClient(''),

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
    setZapiClient(state: any, payload: any) {
      return { ...state, zapiClient: payload };
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

      // Note: If current page is the login page, we simply don't instantiate keycloak, except if it's a callback (thus presence of session_state)
      if (
        rootState.global.authDisabled !== true &&
        rootState.global.keycloak === null &&
        (!window.location.href.includes('/login') || window.location.href.includes('&session_state='))
      ) {
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
            // If user is not authenticated, then we redirect the user to the login page
            // but only if he's not already on the login page
            if (authenticated === false) {
              logger.info(
                'User is currently not authenticated, redirecting the user from: ' +
                  window.location.href +
                  ' to: /login',
              );
              window.location.href = '/login';
            } else if (
              authenticated === true &&
              rootState.global.loggedIn === false &&
              rootState.global.keycloak === null
            ) {
              refreshToken(keycloak);
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
              //https://stackoverflow.com/questions/43422542/keycloak-js-automatic-token-refesh
              keycloak.onTokenExpired = () => {
                logger.info('Token expired');
                keycloak
                  .updateToken(30)
                  .then(() => {
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
                  })
                  .catch(() => {
                    console.log('Unable to refresh token');
                  });
              };
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

    async doLogOutAuthError() {
      console.log('doLogOutAuthError');
      if (!window.location.href.includes('/login')) {
        window.location.href = '/login?authError';
      }
    },

    async doLogOutExpiredToken() {
      // Note: This is not a log-out, just a way to force the UI to re-login.      console.log(rootState.global.keycloak);
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
        .then(() => {
          keycloak.logout({
            redirectUri: window._env_.ROOT_URL + '/login?expiredToken',
          });
        });
    },

    async deleteKeycloakProfile(payload: any, rootState: any) {
      console.log('deleteKeycloakProfile');

      // Note: This is not a log-out, just a way to force the UI to re-login.
      if (rootState.global.keycloak !== null) {
        console.log('User self delete keycloak profile');
        console.log(rootState.global.keycloak);
      }
    },
  }),
};
