import React, { Component } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import Button from "../common/Button";
import OverlayComponent from "../common/Modal/Overlay";
import { Overlay } from "react-native-elements";

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
    const {
      buttonContainer,
      buttonContainerRed,
      buttonText,
      overlayStyle
    } = styles;
    return (
      <View>
        <Overlay
          isVisible={this.state.showNoteFiled}
          onBackdropPress={() => this.setState({ showNoteFiled: false })}
          overlayStyle={overlayStyle}
        >
          <OverlayComponent
            onChange={this.onChange}
            reason={reason}
            closeOverlay={this.punchOut}
          />
        </Overlay>
        <Button
          style={buttonContainer}
          onPress={() => this.onSubmit()}
          btnText="Punch-in"
          btnTextStyle={buttonText}
        />
        <Button
          style={buttonContainerRed}
          onPress={() => this.punchOut("punch-out")}
          btnText="Punch-out"
          btnTextStyle={buttonText}
        />
      </View>
    );
  }
}

export default LoginForm;
