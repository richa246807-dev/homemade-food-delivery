//import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
////import { getFirestore } from "firebase/firestore";
//import { initializeFirestore } from "firebase/firestore";
//
//const firebaseConfig = {
//  apiKey: "AIzaSyCyh7wmxnb1ej2HYDv2CUJWttAw6Pa_VJE",
//  authDomain: "ghakakhana-64cde.firebaseapp.com",
//  projectId: "ghakakhana-64cde",
//  storageBucket: "ghakakhana-64cde.firebasestorage.app",
//  messagingSenderId: "924049182206",
//  appId: "1:924049182206:web:4aa5c5305ea09f5de004af",
//};
//
//const app = initializeApp(firebaseConfig);
//
//export const auth = getAuth(app);
//
//export const db = initializeFirestore(app, {});
//
////export const db = getFirestore(app);
//console.log("Firebase App:", app);
//console.log("Project ID:", firebaseConfig.projectId);
//console.log("DB Instance:", db);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfxAxOQje4kJul3JUuYEtMixETe0pcPsA",
  authDomain: "ghrkakhana2865.firebaseapp.com",
  projectId: "ghrkakhana2865",
  storageBucket: "ghrkakhana2865.firebasestorage.app",
  messagingSenderId: "799344024686",
  appId: "1:799344024686:web:be8c5eb29ae416e51d5a7f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);