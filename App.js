import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import firebase from "./firebase";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import GetLocation from "./src/screen/GetLocation";
import HelpComing from "./src/screen/HelpComing";
import HomeScreen from "./src/screen/HomeScreen";
import LoginScreen from "./src/screen/LoginScreen";
import PatientDetail from "./src/screen/PatientDetail";
import GooglePlacesInput from "./src/screen/component/GooglePlacesInput";
import Notification from "./src/screen/Notification";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Information Form",
              headerStyle: {
                display: "flex",
                backgroundColor: "#F4511E",
              },
              headerTintColor: "black",
              fontWeight: "bold",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 23,
              },
            }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              title: "Login Form",
              headerStyle: {
                display: "flex",
                backgroundColor: "#F4511E",
              },
              headerTintColor: "black",
              fontWeight: "bold",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 23,
              },
            }}
          />
          <Stack.Screen
            name="GetLocation"
            component={GetLocation}
            options={{
              title: "Get the location",
              headerStyle: {
                display: "flex",
                backgroundColor: "#F4511E",
              },
              headerTintColor: "black",
              fontWeight: "bold",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 23,
              },
            }}
          />
          {/* <Stack.Screen
            name="HelpComing"
            component={HelpComing}
            options={{
              title: "Help Coming",
              headerStyle: {
                display: "flex",
                backgroundColor: "#F4511E",
              },
              headerTintColor: "black",
              fontWeight: "bold",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 23,
              },
            }}
          /> */}
          <Stack.Screen options={{ headerShown: false }} name="PatientDetail">
            {(props) => (
              <PatientDetail {...props} channelName={"application"} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="GooglePlacesInput"
            component={GooglePlacesInput}
            options={{
              title: "Get the location",
              headerStyle: {
                display: "flex",
                backgroundColor: "#F4511E",
              },
              headerTintColor: "black",
              fontWeight: "bold",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 23,
              },
            }}
          />
          <Stack.Screen options={{ headerShown: false }} name="firebase">
            {(props) => <firebase {...props} channelName={"application"} />}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: false }} name="Notification">
            {(props) => <Notification {...props} channelName={"application"} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "red",
  },
});
