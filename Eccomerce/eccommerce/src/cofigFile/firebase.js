
import firebase from "firebase";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDtGnMygSfb1SZF1JQWADhoM7HZ9l1G4BI",
    authDomain: "enterprise-dev-54ac6.firebaseapp.com",
    databaseURL: "https://enterprise-dev-54ac6.firebaseio.com",
    projectId: "enterprise-dev-54ac6",
    storageBucket: "enterprise-dev-54ac6.appspot.com",
    messagingSenderId: "815592612135",
    appId: "1:815592612135:web:06470d4dad974bcbb1c902",
    measurementId: "G-51Z06LKTDR"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

export default fire;