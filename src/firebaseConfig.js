import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJRer0jF0YfNSdgOkMuKJOI-Rpyacxzz4",
    authDomain: "movie-search-2f81f.firebaseapp.com",
    projectId: "movie-search-2f81f",
    storageBucket: "movie-search-2f81f.firebasestorage.app",
    messagingSenderId: "212418113147",
    appId: "1:212418113147:web:08495d5d40e2032e077cde",
    measurementId: "G-XV6TLPK76C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
