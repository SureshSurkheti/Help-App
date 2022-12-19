// import * as Permissions from 'expo-permissions';
// import { StatusBar } from "expo-status-bar";
// import React, {Component} from "react";
// import {
//   StyleSheet,
//   Text,Image,
//   View,Button,Alert,TouchableOpacity,
// } from 'react-native';
// import * as Location from "expo-location";

// export default function App() {
//   async function GetLocation(){
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);

//     if (status !== "granted") {
//       Alert.alert(
//         "Permission not granted",
//         "Allow the app to use location service.",
//         [{ text: "OK" }],
//         { cancelable: false }
//       );
//     }

//     let { coords } = await Location.getCurrentPositionAsync();

//     if (coords) {
//       const { latitude, longitude } = coords;
//       let response = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });

//       for (let item of response) {
//         let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

//         alert(address)
//       }
//     }
//   };
//     return(
//       <View style = {styles.container}>
//     <Button title="Show My Location" onPress={GetLocation} />
//     <StatusBar style="auto" />
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5CFF',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  onChangeNumber,
  number,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GooglePlacesInput = ({ navigation }) => {
  const [autocomplete, setAutocomplete] = useState("");
  const [validationerror, setValidationerror] = useState("");

  const Submit = () => {
    if (autocomplete === "") {
      setValidationerror("please select the location");
      return;
    } else {
      Alert.alert(`location completed successfully`);
    }
    setDoc(doc(db, "patientList", "inputlocation"), {
      autocomplete: autocomplete,
    });
    navigation.navigate("GetLocation");
  };
  const Skip = () => {
    navigation.navigate("GetLocation");
  };

  console.log(autocomplete);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        TextInput
        style={styles.input}
        placeholder="Enter the location"
        keyboardType="numeric"
        query={{
          key: "AIzaSyATDvsSSy3CbZZw9Dc3mnibgWWZF7M7eHc",
          language: "en", // language of the results
        }}
        onPress={(data, details) => setAutocomplete({ data, details })}
        textInputProps={{
          marginTop: 30,
          marginHorizontal: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: `#808080`,
          // InputComp: Input,
          leftIcon: { type: "font-awesome", name: "chevron-left" },
          errorStyle: { color: "red" },
        }}
      />
      {validationerror && (
        <View>
          <Text style={styles.validationerror}>{validationerror}</Text>
        </View>
      )}
      <View>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: "#F4511E",
              marginBottom: 15,
              marginHorizontal: 20,
              borderRadius: 10,
            },
          ]}
          onPress={() => Submit()}
        >
          <Text style={styles.login}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: "blue",
              marginBottom: 40,
              marginHorizontal: 20,
              borderRadius: 7,
            },
          ]}
          onPress={() => Skip()}
        >
          <Text style={styles.login1}>skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "white",
    marginBottom: 70,
  },
  login: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
  },
  text: {
    textAlign: "center",
    color: "black",
    marginBottom: 20,
    fontSize: 20,
  },
  login1: {
    fontSize: 25,
    textAlign: "center",
    paddingHorizontal: 30,
    color: "white",
  },
  validationerror: {
    color: "red",
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 15,
  },
});

export default GooglePlacesInput;
