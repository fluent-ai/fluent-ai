import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  },
};

// Initialize Firebase
const app = initializeApp(config.firebase);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// console.log(config);

export default config;
