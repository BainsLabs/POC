import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from "./Camera";
import Home from "./Home";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Camera }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#000"
      },
      headerTintColor: "#fff"
    }
  }
);

export default (Navigation = createAppContainer(MainNavigator));
