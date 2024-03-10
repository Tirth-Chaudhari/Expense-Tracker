

// Import the functions you need from the SDKs you need
import {getApp,getApps,initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyC-Nkms-rD3LSc6VQW6Nh-4tfdAgGqHD6s",
//   authDomain: "fir-e2e78.firebaseapp.com",
//   projectId: "fir-e2e78",
//   storageBucket: "fir-e2e78.appspot.com",
//   messagingSenderId: "280880259274",
//   appId: "1:280880259274:web:ecb1c1d91ffc5b2e5c1433",
//   measurementId: "G-VL9GR9RZ7S"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD1iL0LIfyau9rO2MMIuJ_copeZIPlLUgI",
//   authDomain: "fir-token-c8de4.firebaseapp.com",
//   projectId: "fir-token-c8de4",
//   storageBucket: "fir-token-c8de4.appspot.com",
//   messagingSenderId: "1070004107451",
//   appId: "1:1070004107451:web:42853283e7c638a9e5919e"
// };

// Initialize Firebase
const app=  getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

export {app};