// https://github.com/pimterry/loglevel
import * as log from 'loglevel';
import Keycloak from 'keycloak-js';

import { Dispatch } from '../store';
import Dexie from 'dexie';

interface Query {
  id?: number;
  dataset?: string;
  name?: string;
  query?: any;
}

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
const setAuth0Config = async () => {
  const authConfig = {
    domain: window._env_.AUTH0_DOMAIN,
    clientId: window._env_.AUTH0_CLIENT_ID,
    audience: window._env_.AUTH0_AUDIENCE,
  };

  // eslint-disable-next-line
  window.Auth0 = await createAuth0Client({
    domain: authConfig.domain,
    // eslint-disable-next-line
    client_id: authConfig.clientId,
    audience: authConfig.audience,
  });
  return window.Auth0;
};
*/
console.log('Load global');
export const global = {
  state: {
    log: {},
    loading: false,
    showMenu: false,
    pageTitle: null,
    defaultPoints: true,

    // Authentication module
    authDisabled: JSON.parse(window._env_.KEYCLOAK_DISABLED), // Is authentication active, if false, then does not check authentication status
    loggedIn: false, // Is the user logged in
    keycloak: null,
    userName: '',
    userAvatarUrl: '',
    userEmail: null,
    userId: null,

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
    setCallbackState(state: any, payload: any) {
      console.log('setCallbackState', payload.loggedIn);
      return {
        ...state,
        loggedIn: payload.loggedIn,
        accessToken: payload.accessToken,
        authUser: payload.authUser,
        auth0Initialized: payload.auth0Initialized,
      };
    },
    setUserSession(state: any, newState: any) {
      console.log('setUser', true);
      console.log(state);
      console.log(newState);
      return {
        ...state,
        keycloak: Keycloak,
        loggedIn: newState.loggedIn,
        userName: newState.name,
        userEmail: newState.Email,
        userId: newState.id,
      };
    },

    logOutUser(state: any, newState: any) {
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

      if (rootState.global.keycloak === null) {
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
                  name: userInfo.name,
                  email: userInfo.email,
                  id: userInfo.sub,
                });
              });
            } else {
              dispatch.global.setKeycloak(keycloak);
            }
          });
      }
    },

    async loginWithRedirect(payload: any, rootState: any) {
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

    async doLogOut(payload: any, rootState: any) {
      // Note: This is not a log-out, just a way to force the UI to re-login.
      // rootState.global.keycloak.logout();
      dispatch.global.logOutUser();
    },
  }),
};
