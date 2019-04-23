import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import OverlayComponent from "../common/Overlay";
import { Overlay } from "react-native-elements";
import { emailCheck } from "../../redux/actions/faceRecognition";
import { connect } from "react-redux";
import { setEmail } from "../../redux/actions/faceRecognition";

class LoginForm extends Component {
  state = {
    email: "",
    error: false,
    snackbar: false,
    showNoteFiled: false,
    reason: ""
  };
  onChange = value => {
    this.setState({ reason: value });
  };
  onSubmit = () => {
    this.props.navigate("Camera", {
      punch_type: "punch-in"
    });
  };
  punchOut = (punchType, push) => {
    if (push) {
      console.log(this.state.reason, "reason");
      this.props.navigate("Camera", {
        note: this.state.reason,
        punch_type: punchType
      });
    }
    this.setState({
      showNoteFiled: !this.state.showNoteFiled
    });
  };
  render() {
    const { reason } = this.state;
    return (
      <View>
        <Overlay
          isVisible={this.state.showNoteFiled}
          onBackdropPress={() => this.setState({ showNoteFiled: false })}
          overlayStyle={{
            height: 150
          }}
        >
          <OverlayComponent
            onChange={this.onChange}
            reason={reason}
            closeOverlay={this.punchOut}
          />
        </Overlay>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onSubmit()}
        >
          <Text style={styles.buttonText}>Punch-in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainerRed}
          onPress={() => this.punchOut("punch-out")}
        >
          <Text style={styles.buttonText}>Punch-out</Text>
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
  buttonContainerRed: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    backgroundColor: "red",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  buttonTextRed: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

export default connect(
  null,
  { setEmail }
)(LoginForm);
