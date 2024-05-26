// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj_rzB06cOfFZaqWCpEgRwtMezaLE53Ys",
  authDomain: "netfixgpt-41986.firebaseapp.com",
  projectId: "netfixgpt-41986",
  storageBucket: "netfixgpt-41986.appspot.com",
  messagingSenderId: "673017861834",
  appId: "1:673017861834:web:aa302a467a981059d80633",
  measurementId: "G-TEV9J57R3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();