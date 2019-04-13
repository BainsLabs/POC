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

  onFacesDetected = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        base64: true,
        skipProcessing: true
      });
      if (!this.state.faceDetected) {
        return;
      }
      const { base64 } = photo;
      console.log(base64, "base");
      const { email, faceMatch } = this.props;
      const params = {
        image_base: base64,
        ...email
      };
      await faceMatch(params);
    }
    console.log("error on snap: ", e);
  };

  handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      this.setState({ faceDetected: true }, () => this.onFacesDetected());
    }
  };
  render() {
    console.log(this.state.base64);
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
            onFacesDetected={this.handleFacesDetected}
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
