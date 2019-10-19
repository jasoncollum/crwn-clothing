import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDaqZSoACtvUToD5e5bymWvyK7bZ997Wsg",
    authDomain: "crwn-db-c574e.firebaseapp.com",
    databaseURL: "https://crwn-db-c574e.firebaseio.com",
    projectId: "crwn-db-c574e",
    storageBucket: "crwn-db-c574e.appspot.com",
    messagingSenderId: "545975163017",
    appId: "1:545975163017:web:3979e8bb5ddbb548548e58",
    measurementId: "G-TPQN6CPN17"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;