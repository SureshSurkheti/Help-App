import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

const GeoLocation = ({ setLocation, setLatitude, setLongitude }) => {
  async function GetLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      {
        "Permission not granted",
          "Allow the app to use location service",
          [{ text: "OK" }],
          { cancelable: false };
      }
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.name}, ${item.postalCode}, ${item.city}, ${item.country}, ${item.district}, ${item.region}`;
        setLocation(address);
      }
    }

    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: "#F4511E",
            marginHorizontal: 10,
            borderRadius: 10,
            marginTop: 20,
            marginBottom: -90,
          },
        ]}
        onPress={GetLocation}
      >
        <Text style={styles.login}>Get your Location</Text>
        <StatusBar style="auto" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5CFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
    //  marginHorizontal:57,
    paddingHorizontal: 62,
  },
});

export default GeoLocation;
