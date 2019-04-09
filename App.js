import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from './components/Camera';
import Home from './components/Home'


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

const App = createAppContainer(MainNavigator);


export default App;
