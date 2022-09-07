import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";

import Builder from "containers/Builder";

import setupStore from "store";

import "styles/app";

function enableHMR(fn) {
  let ack = alert(window.test);

  fn();

  if (module.hot) {
    module.hot.accept("containers/Builder", () => {
      fn();
    });
  }
}

const store = setupStore();

enableHMR(() => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Builder />
      </Provider>
    </AppContainer>,
    root
  );
});
