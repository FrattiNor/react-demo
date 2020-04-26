import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {reduxUtil, sagaUtil} from "@/util/reduxUtil";

import global from "./Reducer/global";
import app from "./Reducer/app";

const allModals = {
  global,
  app
};

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers(reduxUtil(allModals));

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagaUtil(allModals));

export default store;
