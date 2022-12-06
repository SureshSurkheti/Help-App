import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  childRef,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import React, { useState, useEffect, useRef } from "react";
import { KeyboardAvoidingView } from "react-native";
import GeoLocation from "./component/GeoLocation";
import { Notification } from "expo-notifications";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
// import GooglePlacesInput from "./component/GooglePlacesInput";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import * as Location from "expo-location";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const GetLocation = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [validationerror, setValidationerror] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const Submit = () => {
    if (location === "" || latitude === "" || longitude === "") {
      setValidationerror("please click button to fill the location");
      return;
    }
    setDoc(doc(db, "user1", "LA"), {
      location: location,
      latitude: latitude,
      longitude: longitude,
    });
    navigation.navigate("HelpComing");
  };

  //     const Submit = () => {
  //         if(initial === "hattisar,kathmandu" && destination === "imadol,lalitpur"){
  //         Alert.alert(`thank you`);
  //         navigation.navigate("HelpComing");
  //     } else {
  //         Alert.alert(`address is not correct`);
  //     }
  // };
  // async function GeoLocation(){
  //     let { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status !== "granted") {
  //       Alert.alert(
  //         "Permission not granted",
  //         "Allow the app to use location service.",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //         );
  //     }
  //   }

  //     let { coords } = await Location.getCurrentPositionAsync();

  //     if (coords) {
  //       const { latitude, longitude } = coords;
  //       let response = await Location.reverseGeocodeAsync({
  //         latitude,
  //         longitude,
  //       });

  //       for (let item of response) {
  //         let address = `${item.name}, ${item.postalCode}, ${item.city}`;

  //         alert(address)
  //       }
  //     }
  // }
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.responsiveBox}>
            <Text style={styles.mainHeader}>Location Information</Text>
            <GeoLocation
              setLocation={setLocation}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />

            <Text style={styles.Address}>
              {location} {latitude} {longitude}
            </Text>
            {validationerror && (
              <View>
                <Text style={styles.validationerror}>{validationerror}</Text>
              </View>
            )}

            <View>
              <Text style={styles.helper}>
                Press the link below for the help
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#F4511E",
                  marginTop: 30,
                  marginBottom: 60,
                  marginHorizontal: 10,
                  borderRadius: 10,
                },
              ]}
              onPress={() => {
                Submit();
                sendPushNotification(expoPushToken);
                registerForPushNotificationsAsync();
              }}
            >
              <Text style={styles.login}>Please save me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

async function sendPushNotification(expoPushToken) {
  // setDoc(doc(db, "users2", "LA"), {
  //   expoPushToken: expoPushToken,
  // });
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Help App",
    body: "Be patient help is coming soon!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "white",
    marginBottom: 60,
  },
  mainHeader: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 15,
    textTransform: "capitalize",
    textAlign: "center",
    // marginVertical: -20,
    marginBottom: -30,
    marginTop: 70,
  },
  Container: {
    fontSize: 10,
  },
  inputStyle3: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 1,
    fontSize: 18,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: -50,
  },
  inputStyle2: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 1,
    fontSize: 18,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 10,
  },
  login: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
  },

  helper: {
    fontSize: 20,
    textAlign: "center",
    marginTop: -10,
    color: "green",
    marginBottom: 30,
  },
  mapping: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  scrollStyle: {
    marginVertical: 0,
    marginHorizontal: 0,
    marginTop: 0,
  },
  container7: {
    backgroundColor: "#F5CFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Address: {
    fontSize: 15,
    marginTop: 100,
    textAlign: "center",
    borderWidth: 1,
    marginBottom: 120,
    marginHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 20,
  },
  responsiveBox: {
    width: wp("80%"),
    height: hp("81%"),
    // borderWidth: 2,
    // borderColor: 'orange',
    flexDirection: "column",
    justifyContent: "space-around",
  },
  location: {
    marginBottom: 20,
  },
  container10: {
    flex: 1,
    marginTop: 0,
  },
  GooglePlacesInput: {
    marginTop: -150,
  },
  validationerror: {
    color: "red",
    fontSize: 16,
    marginLeft: 10,
    marginTop: -120,
  },
});

export default GetLocation;
