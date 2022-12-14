import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import {
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_900Medium,
} from "@expo-google-fonts/josefin-sans";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  addDoc,
  doc,
  getDocs,
  QuerySnapshot,
  setDoc,
  collection,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { CheckBox } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import { async } from "@firebase/util";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(0);
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [validationerror, setValidationerror] = useState("");

  const Submit = () => {
    if (
      userName.trim() === "" ||
      date.trim() === "" ||
      gender.trim() === "" ||
      number.trim() === "" ||
      address.trim() === ""
    ) {
      setValidationerror("please fill all the fields");
      return;
    } else {
      Alert.alert(`Registered successfully`);
    }

    navigation.navigate("LoginScreen");
  };

  const addData = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      userName: userName,
      date: date,
      gender: gender,
      address: address,
      number: number,
    });
    console.log("Document written with ID:", docRef.id);
  };

  const Login = () => {
    navigation.navigate("LoginScreen");
  };

  let [fontLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    JosefinSans_400Regular,
    JosefinSans_900Medium,
  });

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.responsiveBox}>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your name:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="Name"
                autoCorrect={false}
                secureTextEntry={false}
                value={userName}
                onChangeText={(userName) => {
                  setUserName(userName);
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Select your gender:</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 23,
                  marginBottom: -10,
                }}
              >
                <CheckBox
                  checkedColor="red"
                  title="Male"
                  center
                  checked={gender === "male"}
                  checkedIcon="dot-circle-o"
                  onPress={() => {
                    setGender("male");
                  }}
                />
                <CheckBox
                  checkedColor="red"
                  title="Female"
                  center
                  checked={gender === "female"}
                  checkedIcon="dot-circle-o"
                  onPress={() => {
                    setGender("female");
                  }}
                />
                <CheckBox
                  checkedColor="red"
                  title="Other"
                  center
                  checked={gender === "other"}
                  checkedIcon="dot-circle-o"
                  onPress={() => {
                    setGender("other");
                  }}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your address:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="Address"
                autoCorrect={false}
                secureTextEntry={false}
                value={address}
                onChangeText={(address) => {
                  setAddress(address);
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your date of birth:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="mm/dd/yy"
                keyboardType="phone-pad"
                maxLength={10}
                autoCorrect={false}
                secureTextEntry={false}
                value={date}
                onChangeText={(date) => {
                  setDate(date);
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your mobile number:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="Number"
                keyboardType="number-pad"
                maxLength={10}
                minLength={10}
                autoCorrect={false}
                secureTextEntry={false}
                value={number}
                onChangeText={(number) => {
                  setNumber(number);
                }}
              />
            </View>

            {validationerror && (
              <View>
                <Text style={styles.validationerror}>{validationerror}</Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.registered}>Already registered?? </Text>
              <TouchableOpacity onPress={() => Login()}>
                <Text style={styles.logic}>Login</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#F4511E",
                  marginTop: 20,
                  marginLeft: 35,
                  marginRight: 35,
                  borderRadius: 10,
                  marginBottom: 20,
                },
              ]}
              onPress={() => {
                Submit();
                addData();
              }}
            >
              <Text style={styles.login}>Press Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "white",
    marginBottom: 60,
  },

  inputContainer: {
    fontSize: 10,
  },
  labels: {
    color: "black",
    paddingHorizontal: 8,
    paddingVertical: 7,
    fontSize: 18,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 1,
    fontSize: 15,
    borderRadius: 8,
    marginRight: -22,
  },
  login: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  // scrollStyle: {
  //     marginVertical: 0,
  //     marginHorizontal: 0,
  //   },
  responsiveBox: {
    width: wp("80%"),
    height: hp("81%"),
    // borderWidth: 2,
    // borderColor: 'orange',
    flexDirection: "column",
    justifyContent: "space-around",
  },
  validationerror: {
    color: "red",
    fontSize: 16,
  },
  registered: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  logic: {
    color: "blue",
    fontSize: 17,
  },
  CheckBox: {
    alignSelf: "center",
    backgroundColor: "white",
  },
});

export default HomeScreen;
