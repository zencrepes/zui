import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '/imports/ui/App'

import { init } from "@rematch/core";
import { Provider } from "react-redux";

import * as models from "/imports/ui/models/index.js";

// generate Redux store
const store = init({
  models
});

//TODO - To be removed, for debugging
window.store = store;

Meteor.startup(() => {
  render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('render-target')
  );
});
