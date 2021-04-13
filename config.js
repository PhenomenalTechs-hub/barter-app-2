import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCijkEV6DWqR0dMzVfb2i-kghWiTrHBzS8",
    authDomain: "barter-app-33bee.firebaseapp.com",
    projectId: "barter-app-33bee",
    storageBucket: "barter-app-33bee.appspot.com",
    messagingSenderId: "619005648230",
    appId: "1:619005648230:web:85d9ca5222da9b63fd7ca7"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();