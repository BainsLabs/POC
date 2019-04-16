import React, { Component } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LoginForm from "./LoginForm";
import { Font } from "expo";
import Snackbar from "../common/Snackbar";
import { ScreenOrientation } from "expo";
class Login extends Component {
  static navigationOptions = {
    title: "BainsLabs"
  };
  state = {
    fontLoaded: false,
    snackbarShow: false
  };
  async componentWillMount() {
    await Font.loadAsync({
      "operator-mono": require("../../assets/fonts/OperatorMono-Book.otf")
    });
    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
    this.setState({
      fontLoaded: true
    });
  }
  showSnackbar = () => {
    console.log("snahakjsfaskj");
    this.setState({
      snackbarShow: true
    });
  };
  render() {
    const { fontLoaded, snackbarShow } = this.state;
    const { navigation } = this.props;

    const showSnackbar = snackbarShow || navigation.getParam("showSnackbar");
    const snackbarMessage = navigation.getParam("showSnackbar")
      ? navigation.getParam("message")
      : "User doesn't exist";
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={fontLoaded ? styles.logo : {}}>BainsLabs</Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm
            navigate={this.props.navigation.navigate}
            snackbarCallback={this.showSnackbar}
          />
        </View>
        <Snackbar title={snackbarMessage} show={showSnackbar} />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  loginContainer: {
    flexGrow: 0.8,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    color: "#fff",
    fontSize: hp(10),
    fontFamily: "operator-mono"
  }
});

export default Login;
