import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";
import { setEmail } from "../../redux/actions/faceRecognition";
import { validateEmail } from "../../utils";
class LoginForm extends Component {
  state = {
    email: "",
    error: false
  };
  onChange = value => {
    this.setState({ email: value });
  };
  onSubmit = async () => {
    const { navigate, setEmail } = this.props;
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
    const { error } = this.state;
    return (
      <View>
        <TextInput
          style={error ? styles.errorInput : styles.input}
          autoCapitalize="none"
          onChangeText={text => this.onChange(text)}
          autoCorrect={false}
          onEndEditing={() => this.setState({ error: false })}
          ref={input => (this.emailInput = input)}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          placeholderTextColor="rgba(225,225,225,0.7)"
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onSubmit()}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  errorInput: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

export default connect(
  null,
  { setEmail }
)(LoginForm);
