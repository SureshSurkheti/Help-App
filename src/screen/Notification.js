// import React, { Component } from "react";
// import { View, Text, StyleSheet, Button, firebase } from "react-native";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase";
// import { Permissions, Notifications } from "expo";
// class DashboardScreen extends Component {
//   registerForPushNotificationsAsync = async () => {
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;

//     // only ask if permissions have not already been determined, because
//     // iOS won't necessarily prompt the user a second time.
//     if (existingStatus !== "granted") {
//       // Android remote notification permissions are granted during the app
//       // install, so this will only ask on iOS
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }

//     // Stop here if the user did not grant permissions
//     if (finalStatus !== "granted") {
//       return;
//     }

//     try {
//       // Get the token that uniquely identifies this device
//       let token = await Notifications.getExpoPushTokenAsync();

//       // POST the token to your backend server from where you can retrieve it to send push notifications.
//       firebase
//         .database()
//         .ref("users/" + this.currentUser.uid + "/push_token")
//         .set(token);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   async componentDidMount() {
//     this.currentUser = await firebase.auth().currentUser;
//     await this.registerForPushNotificationsAsync();
//   }

//   sendPushNotification = () => {
//     let response = fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         to: "khMIZNXoGldNI4wo4nlr",
//         sound: "default",
//         title: "Demo",
//         body: "Demo notificaiton",
//       }),
//     });
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>DashboardScreen</Text>
//         <Button
//           title="Send Push Notification"
//           onPress={() => this.sendPushNotification()}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
// export default DashboardScreen;

// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";
// // import { doc, setDoc } from "firebase/firestore";
// // import { db } from "../../firebase";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// const App = () => {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "space-around",
//       }}
//     >
//       <Button
//         title="Please save me"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//       />
//     </View>
//   );
// };

// // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   // setDoc(doc(db, "users2", "LA"), {
//   //   expoPushToken: expoPushToken,
//   // });
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Help App",
//     body: "Be patient help is coming soon!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     // console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }
//   return token;
// }

// export default App;
