import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

class Overlay extends Component {
  render() {
    const { reason, onChange, closeOverlay } = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            marginBottom: 5
          }}
        >
          <Text style={{ width: "90%" }}>Note</Text>
          <TouchableOpacity onPress={() => closeOverlay(null, false)}>
            <Icon name="x" type="feather" color="#000" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 0.5,
            marginBottom: 10,
            borderRadius: 100,
            padding: 2
          }}
          value={reason}
          placeholder="Reason"
          onChangeText={text => onChange(text)}
        />
        <TouchableOpacity onPress={() => closeOverlay("punch-out", true)}>
          <Icon name="check" type="feather" color="#000" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Overlay;
