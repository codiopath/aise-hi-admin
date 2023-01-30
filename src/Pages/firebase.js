
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj1g2ThqcdGgfle0DWkpM87H-z0wTS6dQ",
  authDomain: "hospital-storage-3eb14.firebaseapp.com",
  projectId: "hospital-storage-3eb14",
  storageBucket: "hospital-storage-3eb14.appspot.com",
  messagingSenderId: "689831712485",
  appId: "1:689831712485:web:15e2d74450e04cbe12a60c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)