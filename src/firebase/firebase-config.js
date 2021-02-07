import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBJ3cvjGef4EivtqMhIntTBt0m89EAgENI",
    authDomain: "react-apps-6e8d4.firebaseapp.com",
    projectId: "react-apps-6e8d4",
    storageBucket: "react-apps-6e8d4.appspot.com",
    messagingSenderId: "821382727070",
    appId: "1:821382727070:web:4f9ce98ab00efb9d6d428f"
};

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

  export {
      db,
      googleAuthProvider,
      facebookAuthProvider,
      firebase
  }