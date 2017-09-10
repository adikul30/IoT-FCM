const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


//https://us-central1-it-fcm.cloudfunctions.net/lightsOn
exports.lightsOn = functions.https.onRequest((request, response) => {
	admin.database().ref(`/Hall`).set("1").then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    response.end('lightson');
});
});


//https://us-central1-it-fcm.cloudfunctions.net/lightsOff
exports.lightsOff = functions.https.onRequest((request, response) => {
	admin.database().ref(`/Hall`).set("0").then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    response.end('lightsoff');
});
});