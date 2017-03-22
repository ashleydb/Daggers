// Connecting to a Firebase application to use the Database service

/*
// CLIENT IMPLEMENTATION

import firebase from 'firebase';

try {
  // Initialize Firebase, but only do this once
  var config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID
  };
  firebase.initializeApp(config);
} catch (e) {
    console.log("ERR: Problem Initializing Firebase ", e);
}

// Getting a reference to the root of the db
export var firebaseRef = firebase.database().ref();
// Also exporting the firebase object, so only this file needs to be imported,
// not also the firebase dependency at the top of this file
export default firebase;

// Pass in the ref, e.g. firebaseRef, the name of the child object under that ref, e.g. 'news', and the data to write there. Returns a promise that will get the ID back of the new object.
export writeToFirebase(ref, childName, data) {
    // Send the data to our server (firebase)
    var dataRef = ref.child(childName).push(data);

    // Need to update our state so that the content is re-rendered.
    // This uses an API based on promises to write, gets back an ID for that
    // new object on the server, then chains actions to update state and render.
    return dataRef.then(() => { return dataRef.key; });
};
*/

// SERVER IMPLEMENTATION

var firebase = require("firebase-admin");

//var serviceAccount = require("../config/daggers-demo-firebase-adminsdk-42gbx-ec62d2dd4e.json");
var serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_SERVICE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_SERVICE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_SERVICE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_SERVICE_CLIENT_X509_CERT_URL
}
console.log(process.env.NODE_ENV);
console.log(serviceAccount);

// The app only has access as defined in the Security Rules
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://daggers-demo.firebaseio.com/",
  databaseAuthVariableOverride: {
    uid: "my-service-worker"
  }
});

// Getting a reference to the root of the db
module.exports.firebaseRef = firebase.database().ref("/");


// Writes data to firebase at the given ref.
// Returns a promise that will get the ID back of the new object.
// ref: Pass in a ref you want a child from, (if null, uses the root of the db)
// childName: name of the child element you want to write, e.g. 'news'
// id: id of existing element to update, or null for new data, e.g. '-Kf-uyuCGliTBTNfB_Lr'
// data: Data to write at that ref
module.exports.writeToFirebase = function(ref = null, childName, id, data) {
    if (!childName || childName === '' || !data) {
        console.log("WARN: Trying to write to Firebase with no data.")
        return null;
    }
    
    // Send the data to our server (firebase)
    var dbRef = (ref) ? ref : firebaseRef;
    var dataRef = null;
    
    if (!id) {
        // New data, just push it up
        dataRef = dbRef.child(childName).push(data);
            
        // This uses an API based on promises to write, gets back an ID for that
        // new object on the server, then returns it to send to the client.
        return dataRef.then(() => { return dataRef.key; })
        .catch(function(error) {
            console.log("ERR: Firebase Write failed: " + error.message);
            return null;
        });
    } else {
        // Updating data, so find the right element first
        dataRef = dbRef.child(`${childName}/${id}`).update(data);
        
        // We don't get an id back when updating, so return the existing ID
        return dataRef.then(() => { return id; })
        .catch(function(error) {
            console.log("ERR: Firebase Write failed: " + error.message);
            return null;
        });
    }
};

// Returns a firebase ref for a given child element
// ref: Pass in a ref you want a child from, (if null, uses the root of the db)
// childName: name of the child element you want from the ref, (default is root of the given ref, '/')
module.exports.getFirebaseRef = function(ref = null, childName = '/') {
    return ref ? ref.child(childName) : firebaseRef.child(childName);
}

// Gets data from firebase at the given ref.
// Returns a promise that will get the raw data back.
// ref: Pass in a ref you want a child from, (if null, uses the root of the db)
// childName: name of the child element you want to read, e.g. 'news' or 'news/-Kf-uyuCGliTBTNfB_Lr', (default uses the root of the ref)
module.exports.readFromFirebase = function(ref = null, childName = '/') {
    var dataRef = ref ? ref.child(childName) : firebaseRef.child(childName);
    
    // First, get the data from our server (firebase), which is async
    return dataRef.once('value').then(function(dataSnapshot) {
      // Now we have the data, so can parse it, update our state and re-render

      // data could be {'some_key':{same_param: some_value, another_param: another_value}, ...} or empty
      var data = dataSnapshot.val() || {};
      return data;
    })
    .catch(function(error) {
        console.log("ERR: Firebase Read failed: " + error.message);
        return null;
    });
}

// Deletes data from firebase at the given ref.
// Returns a promise that will return the ID of the deleted object.
// ref: Pass in a ref you want a child from, (if null, uses the root of the db)
// childName: name of the child element you want to remove, e.g. 'news' or 'news/-Kf-uyuCGliTBTNfB_Lr'
module.exports.removefromFirebase = function(ref = null, childName) {
    if (!childName || childName === '') {
        console.log("WARN: Trying to remove from Firebase with no ref/data.")
        return null;
    }
    
    // Dealing with database on our server (firebase)
    var dbRef = (ref) ? ref : firebaseRef;
    
    // Removing data, so find the right element to do so
    var dataRef = dbRef.child(childName).remove();

    // We don't get an id back when removing, so return the existing ID
    return dataRef.then(() => { return id; })
    .catch(function(error) {
        console.log("ERR: Firebase Remove failed: " + error.message);
        return null;
    });
};
