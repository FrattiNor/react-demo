import React from "react";
import ReactDOM from "react-dom";
import Routes from "@/routes";
import { Provider } from "react-redux";
import store from "@/redux/stroe";
import "./index.css";
import "./assets/iconfont/iconfont.css";

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
