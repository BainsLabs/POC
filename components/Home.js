import React, { Component } from 'react'
import { Button, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { setEmail } from '../redux/actions/faceRecognition'

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'BainsLabs',
  };
  state = {
    text: ""
  }

  onChange = value => {
    this.setState({ text: value })
  }

  onSubmit = async (navigate) => {
    await setEmail(this.state.text)
    navigate("Profile")
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput style={{ marginBottom: 10 }}
          onChangeText={text => this.onChange(text)}
          value={this.state.text}
          placeholder="Email@bainslabs.com" />
        <Icon
          title="Login"
          reverse
          raised
          name='log-in'
          onPress={() => this.onSubmit(navigate)}
          type='feather'
          color='#000'
        />
      </View>
    );
  }
}

export default connect(null, { setEmail })(HomeScreen)