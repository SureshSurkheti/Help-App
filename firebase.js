import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);
