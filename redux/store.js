import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import devToolsEnhancer from "remote-redux-devtools";

const middleware = [thunk];
const initialState = {};

const initStore = () =>
  createStore(
    rootReducer,
    initialState,
    devToolsEnhancer(applyMiddleware(...middleware))
  );

module.exports = {
  initStore
};
