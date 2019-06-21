//https://github.com/pimterry/loglevel
import * as log from "loglevel";
import { Meteor } from "meteor/meteor";
import { reactLocalStorage } from "reactjs-localstorage";

export default {
  state: {
    log: {},
    menus: {},
    dataRefresh: false,
    updateQueryPath: "",
    updateQuery: {},
    cfg_es_type: "elasticsearch",
    cfg_es_host: null,
    cfg_ess_id: null,
    cfg_ess_username: null,
    cfg_ess_password: null
  },
  reducers: {
    setLog(state, payload) {
      return { ...state, log: payload };
    },
    setMenus(state, payload) {
      return { ...state, menus: payload };
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

      //Load credentials from local storage
      this.setCfgEsType(reactLocalStorage.get("cfg_es_type", "elasticsearch"));
      this.setCfgEsHost(JSON.parse(reactLocalStorage.get("cfg_es_host", null)));
      this.setCfgEssId(JSON.parse(reactLocalStorage.get("cfg_ess_id", null)));
      this.setCfgEssUsername(
        JSON.parse(reactLocalStorage.get("cfg_ess_username", null))
      );
      this.setCfgEssPassword(
        JSON.parse(reactLocalStorage.get("cfg_ess_password", null))
      );
    },

    async updateCfgEsType(payload) {
      let estype = payload;
      if (estype !== "elasticcloud" && estype !== "elasticsearch") {
        estype = "elasticsearch";
      }
      reactLocalStorage.set("cfg_es_type", payload);
      this.setCfgEsType(payload);
    },

    async updateCfgEsHost(payload) {
      reactLocalStorage.set("cfg_es_host", payload);
      this.setCfgEsHost(payload);
    },

    async updateCfgEssId(payload) {
      reactLocalStorage.set("cfg_ess_id", payload);
      this.setCfgEssId(payload);
    },

    async updateCfgEssUsername(payload) {
      reactLocalStorage.set("cfg_ess_username", payload);
      this.setCfgEssUsername(payload);
    },

    async updateCfgEssPassword(payload) {
      reactLocalStorage.set("cfg_ess_password", payload);
      this.setCfgEssPassword(payload);
    },

    async checkData() {
      const incorrectIssues = cfgIssues
        .find({ data_version: { $ne: Meteor.settings.public.data_version } })
        .count();
      if (incorrectIssues > 0) {
        this.setDataRefresh(true);
      }
    }
  }
};
