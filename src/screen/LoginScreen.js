import {
  Text,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";


const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [validationerror, setValidationerror] = useState("");

  const Submit = () => {
    if (id.trim() === "" || date.trim() === "") {
      setValidationerror("please fill all the fields");
      return;
    } else {
      Alert.alert(`Loged in successfully`);
    }

    setDoc(doc(db, "patientList", "login"), {
      id: id,
      date: date,
    });
    navigation.navigate("GooglePlacesInput");
  };
  const Return = () => {
    Alert.alert(`signed up successfully please get started again.`);
    navigation.navigate("HomeScreen");
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.responsiveBox}>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your ID:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="ID"
                autoCorrect={false}
                secureTextEntry={false}
                value={id}
                onChangeText={(id) => {
                  setId(id);
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Enter your date of birth:</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                placeholder="mm/dd/yy"
                autoCorrect={false}
                secureTextEntry={false}
                value={date}
                onChangeText={(date) => {
                  setDate(date);
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
                  marginTop: 35,
                  marginLeft: 35,
                  marginRight: 35,
                  borderRadius: 10,
                },
              ]}
              onPress={() => Submit()}
            >
              <Text style={styles.login}>Press Here</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.anyone}>Forgot your Information?</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => Return()}>
                <Text style={styles.anyone1}>Sign Up</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 60,
    backgroundColor: "white",
    marginBottom: 60,
  },
  mainHeader: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 15,
    textTransform: "capitalize",
    textAlign: "center",
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
    marginRight: -25,
  },
  login: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  anyone: {
    fontSize: 20,
    paddingTop: 40,
    color: "black",
  },
  anyone1: {
    fontSize: 20,
    paddingTop: 40,
    color: "green",
    marginBottom: 70,
  },
  scrollStyle: {
    marginVertical: 0,
    marginHorizontal: 0,
    marginBottom: 0,
  },
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

export default LoginScreen;
