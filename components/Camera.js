import React, { Component } from "react";
import { Text, View } from "react-native";
import { Camera, Permissions, FaceDetector } from "expo";
import { setBase64 } from "../redux/actions/faceRecognition";
import { connect } from "react-redux";
import _ from "lodash";

class CameraComponent extends Component {
  static navigationOptions = {
    title: "Face Detection"
  };
  state = {
    hasCameraPermission: null,
    faceDetected: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  componentWillUnmount() {
    this.camera.remove();
  }

  onFacesDetected = async () => {
    if (this.camera) {
      const { navigate } = this.props.navigation;
      const { setBase64 } = this.props;
      if (!this.state.faceDetected) {
        return;
      }
      let photo = await this.camera.takePictureAsync({
        base64: true,
        skipProcessing: true
      });
      setBase64(photo.base64);
      navigate("Profile");
      this.setState({
        faceDetected: false
      });
      return;
    }
    console.log("error on snap");
  };

  handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      this.setState({ faceDetected: true }, () => this.onFacesDetected());
    }
  };
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={"front"}
            onFacesDetected={
              this.props.navigation.state.routeName === "Camera"
                ? this.handleFacesDetected
                : null
            }
            ref={ref => {
              this.camera = ref;
            }}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Mode.none,
              runClassifications: FaceDetector.Constants.Mode.none
            }}
          />
        </View>
      );
    }
  }
}

export default connect(
  null,
  { setBase64 }
)(CameraComponent);
