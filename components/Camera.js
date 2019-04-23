import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { Camera, Permissions, FaceDetector } from "expo";
import { faceMatch } from "../redux/actions/faceRecognition";
import { connect } from "react-redux";
import { ScreenOrientation } from "expo";
import _ from "lodash";
import { Icon } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

const SCREEN_WIDTH = Dimensions.get("window").width;

class CameraComponent extends Component {
  static navigationOptions = {
    title: "Face Detection"
  };
  state = {
    hasCameraPermission: null,
    faceDetected: false,
    loader: false,
    is_mounted: false
  };

  async componentWillMount() {
    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
  }
  async componentDidMount() {
    this.setState({
      is_mounted: true
    });
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  componentWillUnmount() {
    this.setState({
      is_mounted: false
    });
  }
  setFace = () => {
    if (this.state.is_mounted) {
      this.setState(
        {
          faceDetected: true
        },
        () => this.onFacesDetected()
      );
    }
  };
  onFacesDetected = async () => {
    if (this.state.is_mounted) {
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
          email,
          punch_type: this.props.navigation.getParam("punch_type"),
          note: this.props.navigation.getParam("note")
        };

        const response = await faceMatch(params);
        this.setState({
          loader: false
        });
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
    }
  };

  handleFacesDetected = ({ faces }) => {
    if (this.state.is_mounted) {
      if (faces.length > 0) {
        this.setState({ faceDetected: true }, () => this.onFacesDetected());
      }
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
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Icon raised name="camera" type="font-awesome" color="#000" />
              </TouchableOpacity>
            </View>
            <Spinner
              visible={this.state.loader}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
          </Camera>
        </View>
      );
    }
  }
}
const mapStateToProps = state => ({
  email: _.get(state, "employee.email") || {}
});

const styles = {
  spinnerTextStyle: {
    color: "#FFF"
  }
};
export default connect(
  mapStateToProps,
  { faceMatch }
)(CameraComponent);
