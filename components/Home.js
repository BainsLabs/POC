import React, { Component } from 'react'
import { Button, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import _ from 'lodash'

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: 'BainsLabs',
  };
  state = {
    text: ""
  }

  setEmail = value => {
    this.setState({ text: value })
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput style={{ marginBottom: 10 }}
          onChangeText={text => this.setEmail(text)}
          value={this.state.text}
          placeholder="Email@bainslabs.com" />
        <Icon
          title="Login"
          reverse
          raised
          name='log-in'
          onPress={() => navigate('Profile')}
          type='feather'
          color='#000'
        />
      </View>
    );
  }
}