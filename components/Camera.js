import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { Camera, Permissions, FaceDetector } from "expo";
import { faceMatch } from "../redux/actions/faceRecognition";
import { connect } from "react-redux";
import { ScreenOrientation } from "expo";
import _ from "lodash";

const SCREEN_WIDTH = Dimensions.get("window").width;

class CameraComponent extends Component {
  static navigationOptions = {
    title: "Face Detection"
  };
  state = {
    hasCameraPermission: null,
    faceDetected: false,
    loader: false
  };

  async componentWillMount() {
    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  setFace = () => {
    this.setState(
      {
        faceDetected: true
      },
      () => this.onFacesDetected()
    );
  };
  onFacesDetected = async () => {
    const {
      faceMatch,
      navigation: { navigate },
      email
    } = this.props;
    if (this.camera) {
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
      if (response.status === 200) {
        navigate("Profile", {
          email
        });
        return;
      }
    }
    navigate("Home", {
      showSnackbar: true,
      message: "Face didnt Match"
    });
  };

  handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      this.setState({ faceDetected: true }, () => this.onFacesDetected());
    }
  };
  render() {
    console.log(Platform.Version, "Version-check");
    const { hasCameraPermission, loader } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {Platform.Version > 26 ? (
            <Camera
              style={{ flex: 1 }}
              type={"front"}
              ref={ref => {
                this.camera = ref;
              }}
              onFacesDetected={
                this.props.navigation.state.routeName === "Camera"
                  ? this.handleFacesDetected
                  : null
              }
              faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.fast,
                detectLandmarks: FaceDetector.Constants.Mode.none,
                runClassifications: FaceDetector.Constants.Mode.none
              }}
            >
              {loader ? (
                <Image
                  // resizeMode="contain"
                  style={{ width: SCREEN_WIDTH }}
                  source={require("../assets/loader.gif")}
                />
              ) : null}
            </Camera>
          ) : (
            <Camera
              style={{ flex: 1 }}
              type={"front"}
              ref={ref => {
                this.camera = ref;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setFace()}
                  style={{
                    flex: 0.1,
                    alignSelf: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <Text>Click</Text>
                </TouchableOpacity>
              </View>
              {loader ? (
                <Image
                  // resizeMode="contain"
                  style={{ width: SCREEN_WIDTH }}
                  source={require("../assets/loader.gif")}
                />
              ) : null}
            </Camera>
          )}
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
