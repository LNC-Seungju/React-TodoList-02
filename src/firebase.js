import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBd7Fx7q0UrFv9QDJHTh2OJIpTh6ncf_Gw",
    authDomain: "cp-react-todolist.firebaseapp.com",
    projectId: "cp-react-todolist",
    storageBucket: "cp-react-todolist.appspot.com",
    messagingSenderId: "1058746014007",
    appId: "1:1058746014007:web:8d75ae22c9e9b5eab6e2b2",
    measurementId: "G-N3XPWHJ4ZD"
})

const db = firebaseApp.firestore();

export default db;
