import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Button from "../Button";

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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20
          }}
        >
          <Button
            onPress={() => closeOverlay("punch-out", false, true)}
            btnText="Skip"
          />
          <Button
            onPress={() => closeOverlay("punch-out", true, false)}
            btnText="Submit"
          />
        </View>
      </View>
    );
  }
}

export default Overlay;
