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
import React, { useState } from "react";
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
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

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

    setDoc(doc(db, "users", "LA"), {
      userName: userName,
      date: date,
      gender: gender,
      number: number,
      address: address,
    });
    navigation.navigate("LoginScreen");
  };

  // const Submit = () => {
  //     if(userName === "suresh" && date === "2055/11/27" && gender === "male" && number === "9803501277" && address === "gorkha"){
  //     Alert.alert(`thank you`);
  //     navigation.navigate("LoginScreen");
  // } else {
  //     Alert.alert(`address is not correct`);
  // }
  // };

  let [fontLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    JosefinSans_400Regular,
    JosefinSans_900Medium,
  });
  // if (! fontLoaded) {
  //     <AppLoading/>;
  // }

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
              <Text style={styles.labels}>Enter your date of birth:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="DOB"
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
              <Text style={styles.labels}>Enter your gender:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="Gender"
                autoCorrect={false}
                secureTextEntry={false}
                value={gender}
                onChangeText={(gender) => {
                  setGender(gender);
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
            {validationerror && (
              <View>
                <Text style={styles.validationerror}>{validationerror}</Text>
              </View>
            )}

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
              onPress={() => Submit()}
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
});

export default HomeScreen;
