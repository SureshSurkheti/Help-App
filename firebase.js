import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
import "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/analytics';
import { firestore } from "@react-native-firebase/firestore";
import { App } from "@react-native-firebase/app";
import Constants from "expo-constants";
import 'firebase/firestore';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAcF_ILypH_o8uTup_aftjNTPHw395zDsY",
  authDomain: "help-app-75d4e.firebaseapp.com",
  databaseURL: "https://help-app-75d4e-default-rtdb.firebaseio.com",
  projectId: "help-app-75d4e",
  storageBucket: "help-app-75d4e.appspot.com",
  messagingSenderId: "427126916257",
  appId: "1:427126916257:web:15a08924672b052cb75ce0",
  measurementId: "G-W8FK2BETBW",
};
let persistence;
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { persistence };



// let app;
// let auth;
// let db;
// if (getApps().length < 1) {
//   app = initializeApp(firebaseConfig);
//   db = initializeFirestore();
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// } else {
//   app = getApp();
//   auth = getAuth();
// }

// export { app, auth, db };
