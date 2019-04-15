import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from "./Camera";
import Home from "./Home";
import Profile from "./Profile";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Profile },
    Camera: { screen: Camera },
    Profile: { screen: Profile }
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
