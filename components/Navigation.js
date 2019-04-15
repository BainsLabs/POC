import { createStackNavigator, createAppContainer } from "react-navigation";
import Camera from "./Camera";
import Login from "./Login";
import Profile from "./Profile";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Login },
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
