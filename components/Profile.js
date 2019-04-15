import React, { Component } from "react";
import { View, Text } from "react-native";

class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };
  render() {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}

export default Profile;
