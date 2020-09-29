import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCi-xjDd5ASsdgxfZB9cNYde-5yPxPr-y8",
    authDomain: "my-chat-49e43.firebaseapp.com",
    databaseURL: "https://my-chat-49e43.firebaseio.com",
    projectId: "my-chat-49e43",
    storageBucket: "my-chat-49e43.appspot.com",
    messagingSenderId: "770524267235",
    appId: "1:770524267235:web:fe49f4d2fac92ae4a17bd6"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()