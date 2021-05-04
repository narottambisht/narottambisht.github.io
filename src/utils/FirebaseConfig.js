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
remoteConfig.settings.minimumFetchIntervalMillis = 360000;
remoteConfig.defaultConfig = {
  "theme"            : "",
  "name"             : "",
  "achievements"     : "",
  "skill_description": "",
  "social_links"     : "",
  "language"         : [],
  "profile_points"   : []
};

/**
 * On application load fetches all the lastest values from the firebase remote parses the response
 * genertes a new object with all the values and stores in the remote config context
 * @param setRemoteConfigStore sets the parsed remote config data in remote config context
 */
const fetchAndActivateRemoteConfig = (setRemoteConfigStore) => {
  remoteConfig.fetchAndActivate()
    .then(() => {
      const remoteConfigData = remoteConfig.getAll();

      let remoteConfigParsed = {
        theme            : JSON.parse(remoteConfigData.theme.asString()),
        name             : remoteConfigData.name.asString(),
        achievements     : remoteConfigData.achievements.asString(),
        skill_description: remoteConfigData.skill_description.asString(),
        social_links     : JSON.parse(remoteConfigData.social_links.asString()),
        language         : JSON.parse(remoteConfigData.language.asString()),
        profile_points   : JSON.parse(remoteConfigData.profile_points.asString())
      }

      setRemoteConfigStore(remoteConfigParsed);
    })
    .catch(err => {
      alert("Failed to fetch and activate remote config values!!");
    });
}

// Returns the firebase server timestamp in whichever timezone you have it hosted.
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export {
  auth,
  timeStamp,
  firestoreDB,
  remoteConfig,
  storageBucket,
  fetchAndActivateRemoteConfig
};
