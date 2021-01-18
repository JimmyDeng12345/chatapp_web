// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


exports.writeToDataBase = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.
    const photoURL = user.photoURL;
    const other = user.emailVerified;
    const writeResult = await admin.firestore().collection('users').doc(user.uid).set({
        name: displayName || "NULL",
        email: email,
        photoURL: photoURL || "NULL",
    });
});