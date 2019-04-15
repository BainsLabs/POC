import React, { Component } from "react";
import { View, TextInput, Image, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setEmail } from "../redux/actions/faceRecognition";
import { validateEmail } from "../utils/index";

const SCREEN_WIDTH = Dimensions.get("window").width;
class HomeScreen extends Component {
  render() {
    const { error, email } = this.state;
    const { imageStyle, textStyle } = styles;
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{
            uri:
              "https://logos.textgiraffe.com/logos/logo-name/Bains-designstyle-colors-m.png"
          }}
          style={imageStyle}
        />
        <TextInput
          style={textStyle}
          onChangeText={text => this.onChange(text)}
          value={email}
          underlineColorAndroid={error ? "red" : null}
          enablesReturnKeyAutomatically
          placeholder="Email@bainslabs.com"
          placeholderTextColor="grey"
        />
        <Icon
          title="Login"
          reverse
          raised
          name="log-in"
          onPress={() => this.onSubmit()}
          type="feather"
          color="#000"
        />
      </View>
    );
  }
}
const styles = {
  imageStyle: {
    height: 300,
    width: SCREEN_WIDTH - 50
  },
  textStyle: {
    marginBottom: 10,
    height: 40,
    padding: 10
  }
};

export default connect(
  null,
  { setEmail }
)(HomeScreen);
