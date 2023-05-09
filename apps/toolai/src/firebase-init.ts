import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import * as dotenv from 'dotenv';
//dotenv.config();

const config = {
  firebase: {
    apiKey: process.env.NX_FIREBASE_KEY,
    authDomain: process.env.NX_FIREBASE_DOMAIN,
    databaseURL: process.env.NX_FIREBASE_DATABASE,
    projectId: process.env.NX_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NX_FIREBASE_SENDER_ID,
    appId: process.env.NX_FIREBASE_APP_ID,
    measurementId: process.env.NX_FIREBASE_MEASUREMENT_ID,
  },
};
console.log(config.firebase);

// Initialize Firebase
const app = initializeApp(config.firebase);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
