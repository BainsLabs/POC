import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { setEmail } from "../redux/actions/faceRecognition";
import { validateEmail } from "../utils/index";
class HomeScreen extends Component {
  static navigationOptions = {
    title: "BainsLabs"
  };
  state = {
    email: "",
    error: false
  };

  onChange = value => {
    this.setState({ email: value });
  };

  onSubmit = async navigate => {
    const { email } = this.state;
    const validEmail = validateEmail(email);
    if (validEmail) {
      await setEmail(email);
      navigate("Camera");
      return;
    }
    this.setState({
      error: true
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { error } = this.state;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={{ marginBottom: 10 }}
          onChangeText={text => this.onChange(text)}
          value={this.state.text}
          placeholder="Email@bainslabs.com"
        />
        {error ? <Text>Error</Text> : null}
        <Icon
          title="Login"
          reverse
          raised
          name="log-in"
          onPress={() => this.onSubmit(navigate)}
          type="feather"
          color="#000"
        />
      </View>
    );
  }
}

export default connect(
  null,
  { setEmail }
)(HomeScreen);
