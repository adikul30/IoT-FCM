const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const DialogflowApp = require('actions-on-google').DialogflowApp;

exports.receiveAssistantRequests = functions.https.onRequest((request, response) => {

    const app = new DialogflowApp({request: request, response: response});

    function handlerRequest(app) {

        const device = app.getArgument('devices');
        const status = app.getArgument('status');

        admin.database().ref(`/automation/${device}/value`).set(status)
            .then(snapshot => {
                app.ask(`Ok, switching ${device} ${status}. Do you want to control anything else?`);
                response.send(200);
            });

    }
    app.handleRequest(handlerRequest);
});

// const functions = require('firebase-functions');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions

// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);


//https://us-central1-it-fcm.cloudfunctions.net/lightsOn
exports.lightsOn = functions.https.onRequest((request, response) => {
	admin.database().ref(`/automation/light/value`).set("on").then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    response.end('lightson');
});
});


//https://us-central1-it-fcm.cloudfunctions.net/lightsOff
exports.lightsOff = functions.https.onRequest((request, response) => {
	admin.database().ref(`/automation/light/value`).set("off").then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    response.end('lightsoff');
});
});