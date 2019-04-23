import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";
import {
  ResponsiveComponent,
  ResponsiveStyleSheet
} from "react-native-responsive-ui";
import { ScreenOrientation } from "expo";
import _ from "lodash";
class ProfileView extends ResponsiveComponent {
  static navigationOptions = {
    title: "Profile",
    headerLeft: null
  };
  async componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 10000);
    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
    loc(this);
    const { navigation } = this.props;
    const params = {
      email: navigation.getParam("email")
    };
  }
  componentWillUnmount() {
    rol();
  }
  render() {
    const { styles } = this;
    const { profile, profile_user, state } = this.props;
    console.log(state, "profile");
    const image_url =
      profile_user.image_url ||
      "https://bootdey.com/img/Content/avatar/avatar1.png";
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: image_url
              }}
            />

            <Text style={styles.name}>{profile_user.name}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.textInfo}>
              Email:&nbsp;{profile.official_email || ""}
            </Text>
            <Text style={styles.textInfo}>
              Employee-ID:&nbsp;{profile.employee_id || ""}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  get styles() {
    return ResponsiveStyleSheet.select([
      {
        query: { orientation: "landscape" },
        style: {
          container: {
            flex: 1,
            width: wp("50%"),
            height: hp("100%"),
            flexDirection: "row"
          },
          header: {
            backgroundColor: "#1E90FF",
            width: wp(50)
          },
          headerContent: {
            flex: 1,
            width: wp(50),
            padding: 30,
            alignItems: "center"
          },
          heading: {
            color: "#000"
          },
          avatar: {
            width: wp(30),
            height: hp(40),
            borderRadius: wp(100) / 2,
            borderWidth: 4,
            borderColor: "white",
            marginBottom: 10
          },
          name: {
            fontSize: 22,
            color: "#FFFFFF",
            fontWeight: "600"
          },
          bodyContent: {
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
            flex: 1,
            width: wp(50)
          },
          textInfo: {
            fontSize: hp(5),
            marginTop: 20,
            color: "#696969"
          }
        }
      },
      {
        query: { orientation: "portrait" },
        style: {
          header: {
            backgroundColor: "#1E90FF"
          },
          headerContent: {
            padding: 30,
            alignItems: "center"
          },
          avatar: {
            width: wp(50),
            height: hp(30),
            borderRadius: wp(100) / 2,
            borderWidth: 4,
            borderColor: "white",
            marginBottom: 10
          },
          name: {
            fontSize: 22,
            color: "#FFFFFF",
            fontWeight: "600"
          },
          bodyContent: {
            flex: 1,
            alignItems: "center",
            padding: 30
          },
          textInfo: {
            fontSize: hp(3),
            marginTop: 20,
            color: "#696969"
          },
          container: {
            flex: 1,
            width: wp("100%"),
            height: hp("100%")
          }
        }
      }
    ]);
  }
}
const mapStateToProps = state => ({
  profile: _.get(state, "employee.employee.employee_profile") || {},
  profile_user: _.get(state, "employee.employee.user") || {},
  state
});
export default connect(mapStateToProps)(ProfileView);
