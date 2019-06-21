//https://github.com/pimterry/loglevel
import * as log from "loglevel";
import { Meteor } from "meteor/meteor";
import { reactLocalStorage } from "reactjs-localstorage";

export default {
  state: {
    log: {},
    menus: {},
    api: null,
    apiHeaders: {},
    dataRefresh: false,
    updateQueryPath: "",
    updateQuery: {},
    cfg_es_type: "elasticsearch",
    cfg_es_host: "",
    cfg_ess_id: "",
    cfg_ess_username: "",
    cfg_ess_password: ""
  },
  reducers: {
    setLog(state, payload) {
      return { ...state, log: payload };
    },
    setMenus(state, payload) {
      return { ...state, menus: payload };
    },
    setApi(state, payload) {
      return { ...state, api: payload };
    },
    setApiHeaders(state, payload) {
      return { ...state, apiHeaders: JSON.parse(JSON.stringify(payload)) };
    },
    setDataRefresh(state, payload) {
      return { ...state, dataRefresh: payload };
    },
    setUpdateQueryPath(state, payload) {
      return { ...state, updateQueryPath: payload };
    },
    setUpdateQuery(state, payload) {
      return { ...state, updateQuery: JSON.parse(JSON.stringify(payload)) };
    },
    setCfgEsType(state, payload) {
      return { ...state, cfg_es_type: payload };
    },
    setCfgEsHost(state, payload) {
      return { ...state, cfg_es_host: payload };
    },
    setCfgEssId(state, payload) {
      return { ...state, cfg_ess_id: payload };
    },
    setCfgEssUsername(state, payload) {
      return { ...state, cfg_ess_username: payload };
    },
    setCfgEssPassword(state, payload) {
      return { ...state, cfg_ess_password: payload };
    }
  },
  effects: {
    async initApp() {
      const logger = log.noConflict();
      if (process.env.NODE_ENV !== "production") {
        logger.enableAll();
      } else {
        logger.disableAll();
      }
      logger.info("Logger initialized");
      this.setLog(logger);

      if (Meteor.settings.public.menus !== undefined) {
        this.setMenus(Meteor.settings.public.menus);
      }

      if (Meteor.settings.public.api !== undefined) {
        this.setApi(Meteor.settings.public.api);
      }

      //Load credentials from local storage
      this.setCfgEsType(reactLocalStorage.get("cfg_es_type", "elasticsearch"));
      this.setCfgEsHost(reactLocalStorage.get("cfg_es_host", ""));
      this.setCfgEssId(reactLocalStorage.get("cfg_ess_id", ""));
      this.setCfgEssUsername(reactLocalStorage.get("cfg_ess_username", ""));
      this.setCfgEssPassword(reactLocalStorage.get("cfg_ess_password", ""));
      this.updateApiHeaders();
    },

    async updateCfgEsType(payload) {
      let estype = payload;
      if (estype !== "elasticcloud" && estype !== "elasticsearch") {
        estype = "elasticsearch";
      }
      reactLocalStorage.set("cfg_es_type", estype);
      this.setCfgEsType(estype);
      this.updateApiHeaders();
    },

    async updateCfgEsHost(payload) {
      reactLocalStorage.set("cfg_es_host", payload);
      this.setCfgEsHost(payload);
      this.updateApiHeaders();
    },

    async updateCfgEssId(payload) {
      reactLocalStorage.set("cfg_ess_id", payload);
      this.setCfgEssId(payload);
      this.updateApiHeaders();
    },

    async updateCfgEssUsername(payload) {
      reactLocalStorage.set("cfg_ess_username", payload);
      this.setCfgEssUsername(payload);
      this.updateApiHeaders();
    },

    async updateCfgEssPassword(payload) {
      reactLocalStorage.set("cfg_ess_password", payload);
      this.setCfgEssPassword(payload);
      this.updateApiHeaders();
    },

    async updateApiHeaders(payload, rootState) {
      const cfgConnector = {
        cfg_es_type: rootState.global.cfg_es_type,
        cfg_es_host: rootState.global.cfg_es_host,
        cfg_ess_id: rootState.global.cfg_ess_id,
        cfg_ess_username: rootState.global.cfg_ess_username,
        cfg_ess_password: rootState.global.cfg_ess_password
      };
      const apiHeaders = {
        cfg_connector: JSON.stringify(cfgConnector)
      };
      this.setApiHeaders(apiHeaders);
    }
  }
};
