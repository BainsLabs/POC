import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = props => (
  <TouchableOpacity style={props.style} {...props}>
    <Text style={props.btnTextStyle}>{props.btnText}</Text>
  </TouchableOpacity>
);

export default Button;
