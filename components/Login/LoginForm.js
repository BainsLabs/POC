import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import { emailCheck } from "../../redux/actions/faceRecognition";
import { connect } from "react-redux";
import { setEmail } from "../../redux/actions/faceRecognition";
import { validateEmail } from "../../utils";

class LoginForm extends Component {
  state = {
    email: "",
    error: false,
    snackbar: false
  };
  onChange = value => {
    this.setState({ email: value });
  };
  onSubmit = async () => {
    this.props.navigate("Camera");
  };
  render() {
    const { error } = this.state;
    return (
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onSubmit()}
        >
          <Text style={styles.buttonText}>Punch-in</Text>
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
