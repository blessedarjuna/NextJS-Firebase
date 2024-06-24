// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbyCmNzQhD2QuXXsZbvU5deCLdE4yd06Y",
  authDomain: "next-firebase-20240611.firebaseapp.com",
  projectId: "next-firebase-20240611",
  storageBucket: "next-firebase-20240611.appspot.com",
  messagingSenderId: "837025919433",
  appId: "1:837025919433:web:5602c9181222a28b2df818",
  measurementId: "G-N1SRHGS51S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//const analytics = getAnalytics(app);
export const auth =getAuth(app);

// Only include analytics code if window is defined (i.e., in the browser)
//  let analytics: any = null;
//  if (typeof window !== "undefined") {
//    import("firebase/analytics").then((module) => {
//      analytics = module.getAnalytics(app);
//    });
//  }

 // Export the Firestore instance
//export { users };


// Export the analytics instance
//export { analytics };
//export { db, auth };



