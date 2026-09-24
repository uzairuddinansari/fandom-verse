// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5y4vXxH3oo_MGRULj7PVHwwwILotLDc0",
  authDomain: "techwiz-c19bc.firebaseapp.com",
  databaseURL: "https://techwiz-c19bc-default-rtdb.firebaseio.com",
  projectId: "techwiz-c19bc",
  storageBucket: "techwiz-c19bc.firebasestorage.app",
  messagingSenderId: "622510009071",
  appId: "1:622510009071:web:ab77ca3415646fe7f6091a",
  measurementId: "G-WQW0D39LTF"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);