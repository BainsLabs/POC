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
      const { faceDetected } = this.state;
      const { setBase64 } = this.props;
      if (!faceDetected) {
        return;
      }
      let photo = await this.camera.takePictureAsync({
        base64: true,
        skipProcessing: true
      });

      this.setState({
        faceDetected: false
      });
      await setBase64(photo.base64);
      navigate("Profile");
      return;
    }
    console.log("error on snap");
  };

  handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      this.setState({ faceDetected: true });
      this.onFacesDetected();
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

const mapStateToProps = state => {
  return { email: _.get(state, "email") || {} };
};

export default connect(
  mapStateToProps,
  { setBase64 }
)(CameraComponent);
