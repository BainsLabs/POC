import React, { Component } from "react";
import { Text, View } from "react-native";
import { Camera, Permissions, FaceDetector } from "expo";
import { faceMatch } from "../redux/actions/faceRecognition";
import { connect } from "react-redux";
import _ from "lodash";
class CameraComponent extends Component {
  static navigationOptions = {
    title: "Face Detection"
  };
  state = {
    hasCameraPermission: null,
    faceDetected: false,
    loader: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onFacesDetected = async () => {
    if (this.camera) {
      const {
        faceMatch,
        navigation: { navigate },
        email
      } = this.props;
      if (!this.state.faceDetected) {
        return;
      }
      let photo = await this.camera.takePictureAsync({
        base64: true,
        skipProcessing: false
      });
      this.setState({
        faceDetected: false,
        loader: true
      });
      const params = {
        img_base: photo.base64,
        email
      };

      const response = await faceMatch(params);
      console.log(response, "response");
      navigate("Profile");
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
    const { hasCameraPermission, loader } = this.state;
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
          >
            {loader ? <Text style={{ color: "white" }}>Loading</Text> : null}
          </Camera>
        </View>
      );
    }
  }
}
const mapStateToProps = state => ({
  email: _.get(state, "employee.email") || {}
});
export default connect(
  mapStateToProps,
  { faceMatch }
)(CameraComponent);
