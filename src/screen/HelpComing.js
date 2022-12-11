// import React from "react";
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

// const HelpComing = ({ navigation }) => {
//   const Submit = () => {
//     Alert.alert(`Processed successfully`);
//     navigation.navigate("HomeScreen");
//   };
//   return (
//     <KeyboardAvoidingView>
//       <ScrollView style={styles.scrollStyle}>
//         <View style={styles.mainContainer}>
//           <View style={styles.responsiveBox}>
//             <Text style={styles.mainHeader}>
//               Be patience help is coming please send the Patient's Detail....
//             </Text>
//             <View>
//               <TouchableOpacity
//                 style={[
//                   styles.buttonStyle,
//                   {
//                     backgroundColor: "#F4511E",
//                     marginTop: 160,
//                     marginLeft: 35,
//                     marginRight: 35,
//                     borderRadius: 10,
//                   },
//                 ]}
//                 onPress={() => Submit()}
//               >
//                 <Text style={styles.login}>OK</Text>
//               </TouchableOpacity>
//             </View>
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
//     paddingTop: 20,
//     paddingBottom: 15,
//     textTransform: "capitalize",
//     textAlign: "center",
//     marginTop: 180,
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
//     height: hp("81%"),
//     // borderWidth: 2,
//     // borderColor: 'orange',
//     flexDirection: "column",
//     justifyContent: "space-around",
//   },
// });

// export default HelpComing;
