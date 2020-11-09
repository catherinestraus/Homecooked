import firebase from "firebase";

// "Password" to authenticate to Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDEr9q3ZLmJrQdBjBPsOsjv9G3r37CqtQ",
  authDomain: "homecooked-b9888.firebaseapp.com",
  databaseURL: "https://homecooked-b9888.firebaseio.com",
  projectId: "homecooked-b9888",
  storageBucket: "homecooked-b9888.appspot.com",
  messagingSenderId: "935099969763",
  appId: "1:935099969763:web:d8975b6374d6f5c73f95d6",
  measurementId: "G-58ZYFJX8WM",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
