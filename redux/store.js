import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "remote-redux-devtools";

const middleware = [thunk];
const initialState = {};
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = composeWithDevTools({ realtime: true, port: 19001 });
const initStore = () =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

module.exports = {
  initStore
};
