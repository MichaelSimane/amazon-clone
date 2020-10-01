import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBt7SXyzoejjKwh7midAV1DVCulxd8DcAA",
    authDomain: "clone-57143.firebaseapp.com",
    databaseURL: "https://clone-57143.firebaseio.com",
    projectId: "clone-57143",
    storageBucket: "clone-57143.appspot.com",
    messagingSenderId: "620526174384",
    appId: "1:620526174384:web:8985addf88c1383de03b75",
    measurementId: "G-YSTHGK7WTH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

// help us to use them outside of the file 
export { db, auth };