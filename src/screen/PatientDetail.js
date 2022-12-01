// import React, { useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   ScrollView,
// } from "react-native";
// import { TextInput } from "react-native";
// import { TouchableOpacity } from "react-native";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// const PatientDetail = () => {
//   const [userName, setUserName] = useState("");
//   const [address, setAddress] = useState("");
//   const [gender, setGender] = useState("");
//   const [number, setNumber] = useState("");
//   const [guardian, setGuardian] = useState("");
//   const [validationerror, setValidationerror] = useState("");

//   const Submit = () => {
//     if (
//       userName.trim() === "" ||
//       guardian.trim() === "" ||
//       gender.trim() === "" ||
//       number.trim() === "" ||
//       address.trim() === ""
//     ) {
//       setValidationerror("please fill all the fields");
//       return;
//     }

//     setDoc(doc(db, "users3", "LA"), {
//       userName: userName,
//       guardian: guardian,
//       gender: gender,
//       number: number,
//       address: address,
//     });
//   };

//   // const Submit = () => {
//   //     if(userName === "suresh" && address === "gorkha" && gender === "male" && number === "9803501277" && guardian === "9805858361"){
//   //     Alert.alert(`thank you ${userName}`);
//   // } else {
//   //     Alert.alert(`address is not correct`);
//   // }
//   // };
//   return (
//     <KeyboardAvoidingView>
//       <ScrollView style={styles.scrollStyle}>
//         <View style={styles.mainContainer}>
//           <View style={styles.responsiveBox}>
//             <Text style={styles.mainHeader}>Patient Detail</Text>
//             <View style={styles.inputContainer}>
//               <Text style={styles.labels}>Enter your name:</Text>
//               <TextInput
//                 style={styles.inputStyle}
//                 autoCapitalize="none"
//                 placeholder="Name"
//                 autoCorrect={true}
//                 secureTextEntry={false}
//                 value={userName}
//                 onChangeText={(actualData) => setUserName(actualData)}
//               />
//             </View>
//             <View style={styles.inputContainer}>
//               <Text style={styles.labels}>Enter your address:</Text>
//               <TextInput
//                 style={styles.inputStyle}
//                 autoCapitalize="none"
//                 placeholder="Address"
//                 autoCorrect={true}
//                 secureTextEntry={false}
//                 value={address}
//                 onChangeText={(actualData) => setAddress(actualData)}
//               />
//             </View>
//             <View style={styles.inputContainer}>
//               <Text style={styles.labels}>Enter your gender:</Text>
//               <TextInput
//                 style={styles.inputStyle}
//                 autoCapitalize="none"
//                 placeholder="Gender"
//                 autoCorrect={true}
//                 secureTextEntry={false}
//                 value={gender}
//                 onChangeText={(actualData) => setGender(actualData)}
//               />
//             </View>
//             <View style={styles.inputContainer}>
//               <Text style={styles.labels}>enter your mobile number:</Text>
//               <TextInput
//                 style={styles.inputStyle}
//                 autoCapitalize="none"
//                 placeholder="Number"
//                 autoCorrect={true}
//                 secureTextEntry={false}
//                 value={number}
//                 onChangeText={(actualData) => setNumber(actualData)}
//               />
//             </View>
//             <View style={styles.inputContainer}>
//               <Text style={styles.labels}>Enter Your guardian number:</Text>
//               <TextInput
//                 style={styles.inputStyle}
//                 autoCapitalize="none"
//                 placeholder="Guardian's number"
//                 autoCorrect={true}
//                 secureTextEntry={false}
//                 value={guardian}
//                 onChangeText={(actualData) => setGuardian(actualData)}
//               />
//             </View>
//             {validationerror && (
//               <View>
//                 <Text style={styles.validationerror}>{validationerror}</Text>
//               </View>
//             )}
//             <TouchableOpacity
//               style={[
//                 styles.buttonStyle,
//                 {
//                   backgroundColor: "red",
//                   marginTop: 35,
//                   marginLeft: 35,
//                   marginRight: 35,
//                   borderRadius: 10,
//                 },
//               ]}
//               onPress={() => Submit()}
//             >
//               <Text style={styles.login}>Press Here</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: "100%",
//     paddingHorizontal: 30,
//     paddingTop: 40,
//     backgroundColor: "white",
//     marginBottom: 70,
//   },
//   mainHeader: {
//     fontSize: 25,
//     color: "black",
//     fontWeight: "bold",
//     paddingTop: -10,
//     paddingBottom: 15,
//     textTransform: "capitalize",
//     textAlign: "center",
//     marginTop: 30,
//   },
//   inputContainer: {
//     fontSize: 10,
//   },
//   labels: {
//     color: "black",
//     paddingHorizontal: 8,
//     paddingVertical: 7,
//     fontSize: 18,
//   },
//   inputStyle: {
//     borderWidth: 1,
//     borderColor: "rgba(0,0,0,0.3)",
//     paddingHorizontal: 15,
//     paddingVertical: 3,
//     borderRadius: 1,
//     fontSize: 15,
//     borderRadius: 8,
//   },
//   login: {
//     fontSize: 30,
//     textAlign: "center",
//     color: "white",
//   },
//   scrollStyle: {
//     marginVertical: 0,
//     marginHorizontal: 0,
//   },
//   responsiveBox: {
//     width: wp("80%"),
//     height: hp("90%"),
//     // borderWidth: 2,
//     // borderColor: 'orange',
//     flexDirection: "column",
//     justifyContent: "space-around",
//   },
//   validationerror: {
//     color: "red",
//     fontSize: 16,
//   },
// });

// export default PatientDetail;
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";
// import registerNNPushToken from "native-notify";

// const useNotifications = () => {
//   registerForPushNotificationsAsync = async () => {
//     if (Device.isDevice) {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       const token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log(token);
//       this.setState({ expoPushToken: token });
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }
//   };
// };

// export default useNotifications;
