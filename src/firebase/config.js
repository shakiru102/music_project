import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVBqhKD0L6paYsDwMFh6BFmLmIlj_KGFg",
    authDomain: "newmusicproject-1e094.firebaseapp.com",
    projectId: "newmusicproject-1e094",
    storageBucket: "newmusicproject-1e094.appspot.com",
    messagingSenderId: "31425851537",
    appId: "1:31425851537:web:7afbadb5c69f5bca99cf30",
    measurementId: "G-T9LHZ3YBB2"
  };

  firebase.initializeApp(firebaseConfig)
   const db = firebase.firestore()
   const dbAuth = firebase.auth()
   const dbStorage = firebase.storage()
   const stamps = firebase.firestore.FieldValue.serverTimestamp




   export {db , dbAuth, dbStorage, stamps}
