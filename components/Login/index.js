import React, { Component } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LoginForm from "./LoginForm";
import Snackbar from "../common/Snackbar";
import { ScreenOrientation } from "expo";
import Spinner from "react-native-loading-spinner-overlay";
class Login extends Component {
  static navigationOptions = {
    title: "BainsLabs"
  };
  state = {
    fontLoaded: false,
    snackbarShow: false,
    loader: false
  };
  async componentWillMount() {
    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
    this.setState({
      fontLoaded: true
    });
  }
  showSnackbar = () => {
    this.setState({
      snackbarShow: true
    });
  };
  setLoader = () => {
    this.setState({
      loader: !this.state.loader
    });
  };
  render() {
    const { fontLoaded, snackbarShow, loader } = this.state;
    const { navigation } = this.props;
    const showSnackbar = snackbarShow || navigation.getParam("showSnackbar");
    const snackbarMessage = navigation.getParam("showSnackbar")
      ? navigation.getParam("message")
      : "User doesn't exist";
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          {fontLoaded ? <Text style={styles.logo}>BainsLabs</Text> : null}
        </View>

        <View style={styles.formContainer}>
          <LoginForm
            navigate={this.props.navigation.navigate}
            snackbarCallback={this.showSnackbar}
            setLoader={this.setLoader}
          />
        </View>
        <Snackbar title={snackbarMessage} show={showSnackbar} />
        <Spinner
          visible={loader}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50"
  },
  spinnerTextStyle: {
    color: "#FFF"
  },
  loginContainer: {
    flexGrow: 0.8,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    color: "#fff",
    fontSize: hp(10),
    fontFamily: "sans-serif"
  }
});

export default Login;
