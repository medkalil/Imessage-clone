import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA7JtVvB0W14FbjYTgtmD2rZeXtau30QMY",
  authDomain: "imessage-clone-fff8c.firebaseapp.com",
  projectId: "imessage-clone-fff8c",
  storageBucket: "imessage-clone-fff8c.appspot.com",
  messagingSenderId: "551176255147",
  appId: "1:551176255147:web:20b096623fd385fc34a9ee",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
