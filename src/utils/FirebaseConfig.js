import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
	apiKey           : "AIzaSyBNW35sc1XW4jz8km47M9R4n9hScEO-kvo",
	authDomain       : "narottam-portfolio.firebaseapp.com",
	databaseURL      : "https://narottam-portfolio.firebaseio.com",
	projectId        : "narottam-portfolio",
	storageBucket    : "narottam-portfolio.appspot.com",
	messagingSenderId: "387012073941",
	appId            : "1:387012073941:web:a125957edf7307c366855c",
	measurementId    : "G-V3E6ZHHZVF"
});

const firestoreDB = firebaseConfig.firestore();
const auth = firebase.auth();
const storageBucket = firebase.storage();
const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 43200000;

// Returns the firebase server timestamp in whichever timezone you have it hosted.
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestoreDB, auth, storageBucket, timeStamp, remoteConfig };
