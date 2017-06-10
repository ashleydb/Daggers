// Connecting to a Firebase application to use the Database service
var firebase = require("firebase-admin");

// For making Firebase REST calls
var Axios = require('axios');

// Load Environment Variables, (copied from webpack)
var path = require('path');
var envFile = require('node-env-file');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
envFile(path.join(__dirname, '../../config/' + process.env.NODE_ENV + '.env'), {raise: false});

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

// The app only has access as defined in the Security Rules
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_SERVICE_PROJECT_ID}.firebaseio.com/`,
  databaseAuthVariableOverride: {
    uid: "my-service-worker"
  }
});

// Getting a reference to the root of the db
module.exports.firebaseRef = firebase.database().ref("/");


// Writes data to firebase at the given ref.
// Returns a promise that will get the ID back of the new object.
// ref: Pass in a ref you want a child from, (if null, uses the root of the db)
// childName: name of the child element you want to write, e.g. 'news', (safety measure so we can't wipe out all data)
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
// Returns true on success or false on failure.
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

    // We don't get an id back when removing, so return success
    return dataRef.then(() => { return true; })
    .catch(function(error) {
        console.log("ERR: Firebase Remove failed: " + error.message);
        return false;
    });
};

// Make REST calls to Firebase.
// See this doc for more info: https://firebase.google.com/docs/database/rest/retrieve-data
//  apiParams is the REST call to make to Firebase. Examples:
//   "news.json?shallow=true" - get IDs of years with data, e.g. 2017, 2016...
//   "news/2017.json?shallow=true" - get IDs of months with data for year 2017, e.g. 1, 2, 4, 12...
//   "news.json?orderBy=%22$key%22&limitToLast=1" - get the content for the most recent year
//   "&print=pretty" - add this for nice formatting to read for debugging
//   Note that "shallow=true"" can't be used with other filters, like orderBy.
module.exports.firebaseRest = function(apiParams) {
    return new Promise(
        // The resolver function is called with the ability to resolve or reject the promise
        function (resolve, reject) {
            var apiPath = `https://${process.env.FIREBASE_SERVICE_PROJECT_ID}.firebaseio.com/${apiParams}`;

            // Call our server to fetch some news
            Axios.get(apiPath)
                .then(function (response) {
                    // Just pass the results straight back
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log("ERR: Problem calling Firebase REST:", error);
                    reject(error);
                });
        }
    );
}
