import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAyhxoFfcjlDQkPkwyold-Jy3fVqZNd74o",
  authDomain: "ecomm-eae4a.firebaseapp.com",
  projectId: "ecomm-eae4a",
  storageBucket: "ecomm-eae4a.appspot.com",
  messagingSenderId: "243268112463",
  appId: "1:243268112463:web:1efb3530093e7b75f8da3a",
  measurementId: "G-12QF5Y46ZG"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDXEv50rerac3VZt4bUdMIe1-hBYbmgo8I",
//   authDomain: "ecomm2-61ead.firebaseapp.com",
//   projectId: "ecomm2-61ead",
//   storageBucket: "ecomm2-61ead.appspot.com",
//   messagingSenderId: "1066009909706",
//   appId: "1:1066009909706:web:6f66f1939bd6d949a39733",
//   measurementId: "G-Z7ZZ17N06T"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)