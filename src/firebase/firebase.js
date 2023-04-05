import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpRuDskxFa96ncU5fNUxz599X2Vh7v9UM",
  authDomain: "jobportal-2da6c.firebaseapp.com",
  projectId: "jobportal-2da6c",
  storageBucket: "jobportal-2da6c.appspot.com",
  messagingSenderId: "463347091712",
  appId: "1:463347091712:web:a790ed82f729fab9c1cbe5",
  measurementId: "G-823DPZS65L",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
