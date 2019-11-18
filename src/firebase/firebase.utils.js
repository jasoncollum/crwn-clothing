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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();  // setup initial data in firestore
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();  // generates uid
        batch.set(newDocRef, obj)  // sets value = obj
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data(); //destructure off of doc.data

        return {    //create new collection object including routeName and id
            routeName: encodeURI(title.toLowerCase()),  //set routeName
            id: doc.id, //set id
            title,  //add title
            items   //add items
        };
    });

    // reduce transformedCollection to an object (key = title, value = collection)
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;