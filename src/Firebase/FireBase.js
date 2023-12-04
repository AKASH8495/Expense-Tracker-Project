import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBBEmPQ77oXLgPI2yoT5uiPcIBsxayKK_M",
  authDomain: "expense-auth-project.firebaseapp.com",
  projectId: "expense-auth-project",
  storageBucket: "expense-auth-project.appspot.com",
  messagingSenderId: "655220810950",
  appId: "1:655220810950:web:c8e0dcee1334e7b64863c7",
  measurementId: "G-TZQ02C1VCE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();


export {app, auth};