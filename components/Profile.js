import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
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
export default class ProfileView extends ResponsiveComponent {
  static navigationOptions = {
    title: "Profile"
  };
  componentWillMount() {
    ScreenOrientation.allowAsync(
      ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN
    );
    loc(this);
  }
  componentWillUnmount() {
    rol();
  }
  render() {
    const { styles } = this;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar1.png"
              }}
            />

            <Text style={styles.name}>John Doe</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.textInfo}>johndoe@gmail.com</Text>

            <Text style={styles.textInfo}>Following: 244</Text>

            <Text style={styles.textInfo}>Followers: 1.250</Text>
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
            flexDirection: "row"
          },
          header: {
            backgroundColor: "#1E90FF",
            width: wp(50)
          },
          headerContent: {
            padding: 30,
            alignItems: "center"
          },
          avatar: {
            width: wp(20),
            height: hp(50),
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
          // body: {
          //   flexDirection: "row"
          // },
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
