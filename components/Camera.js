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
    faceDetected: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  shouldComponentUpdate() {
    return this.props.navigation.state.routeName === "Camera";
  }

  onFacesDetected = async () => {
    if (this.camera) {
      const { navigate } = this.props.navigation;
      let photo = await this.camera.takePictureAsync({
        base64: true,
        skipProcessing: true
      });
      navigate("Profile");

      // if (!this.state.faceDetected) {
      //   return;
      // }
      // const { base64 } = photo;
      // const { email, faceMatch } = this.props;
      // const params = {
      //   image_base: base64,
      //   ...email
      // };
      // await faceMatch(params);
    }
    console.log("error on snap: ");
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
              detectLandmarks: FaceDetector.Constants.Mode.all,
              runClassifications: FaceDetector.Constants.Mode.none
            }}
          >
            {/* <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
              }}
              onPress={() => this.snap(false)}>
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}Enroll{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'flex-end',
                alignItems: 'flex-end',
              }}
              onPress={() => this.snap(true)}>
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {' '}Recognize{' '}
              </Text>
            </TouchableOpacity> */}
          </Camera>
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
  { faceMatch }
)(CameraComponent);
