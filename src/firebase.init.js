// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//Don't share config with public

const firebaseConfig = {
  apiKey: "AIzaSyCH8rn1MalxNwOqRToVhTLdh5DK78HGWYQ",
  authDomain: "email-pass-auth-7ccef.firebaseapp.com",
  projectId: "email-pass-auth-7ccef",
  storageBucket: "email-pass-auth-7ccef.firebasestorage.app",
  messagingSenderId: "559543362798",
  appId: "1:559543362798:web:b6ae40eadb28e4139c7fff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)



