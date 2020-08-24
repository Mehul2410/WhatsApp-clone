import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDKWDDTSYjYtoqj8-Hx_Lhezr9l9ZbJ_tc",
    authDomain: "whats-app-clone-a4926.firebaseapp.com",
    databaseURL: "https://whats-app-clone-a4926.firebaseio.com",
    projectId: "whats-app-clone-a4926",
    storageBucket: "whats-app-clone-a4926.appspot.com",
    messagingSenderId: "846510622129",
    appId: "1:846510622129:web:ffb97eea27431a29836990",
    measurementId: "G-R02THBR4L5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {db ,auth , provider};
export default db;