import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBuPpjfEvrCOU_w2MTwgZKcfj4zWajhD40",
  
    authDomain: "e-commerce-5db87.firebaseapp.com",
  
    projectId: "e-commerce-5db87",
  
    storageBucket: "e-commerce-5db87.appspot.com",
  
    messagingSenderId: "377064810828",
  
    appId: "1:377064810828:web:da36cbfbefa48d951f07e9",
  
    measurementId: "G-B2B12CBWFS"
  
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app); 

