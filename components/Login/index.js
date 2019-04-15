import React, { Component } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LoginForm from "./LoginForm";
import { Font } from "expo";
class Login extends Component {
  static navigationOptions = {
    title: "BainsLabs"
  };
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      "operator-mono": require("../../assets/fonts/OperatorMono-Book.otf")
    });
    this.setState({
      fontLoaded: true
    });
  }
  render() {
    const { fontLoaded } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={fontLoaded ? styles.logo : {}}>BainsLabs</Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm navigate={this.props.navigation.navigate} />
        </View>
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
