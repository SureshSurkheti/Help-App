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
          <Stack.Screen options={{ headerShown: false }} name="HomeScreen">
            {(props) => <HomeScreen {...props} channelName={"application"} />}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: false }} name="LoginScreen">
            {(props) => <LoginScreen {...props} channelName={"application"} />}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: false }} name="GetLocation">
            {(props) => <GetLocation {...props} channelName={"application"} />}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: false }} name="HelpComing">
            {(props) => <HelpComing {...props} channelName={"application"} />}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: false }} name="PatientDetail">
            {(props) => (
              <PatientDetail {...props} channelName={"application"} />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="GooglePlacesInput"
          >
            {(props) => (
              <GooglePlacesInput {...props} channelName={"application"} />
            )}
          </Stack.Screen>
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
  },
});
