import React from "react";
import SnackBar from "react-native-snackbar-component";

const Snackbar = props => (
  <SnackBar
    visible={props.show}
    textMessage={props.title}
    autoHidingTime={3000}
  />
);

export default Snackbar;
