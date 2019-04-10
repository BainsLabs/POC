import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation";
import { initStore } from './redux/store';
import { Provider } from 'react-redux';
import Camera from './components/Camera';
import Home from './components/Home'

const store = initStore();

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Profile: { screen: Camera },

}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#000"
      },
      headerTintColor: "#fff",
    }
  });

const Navigation = createAppContainer(MainNavigator);

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
