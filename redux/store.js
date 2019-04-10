import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers/index';

const middleware = [thunk];
const initialState = {}

const initStore = () => createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

module.exports = {
  initStore
};