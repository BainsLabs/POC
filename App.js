import React, { Component } from "react";
import { initStore } from "./redux/store";
import { Provider } from "react-redux";
import Navigation from "./components/Navigation";
const store = initStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
export default App;
