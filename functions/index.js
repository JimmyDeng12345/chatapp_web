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



exports.initConversation = functions.https.onCall((data,context) => {
    var uidA = data.uidA;
    var uidB = data.uidB;
    combinedID = uidA > uidB ? uidB+uidA : uidA+uidB
    admin.firestore().collection('messages').doc(combinedID).collection('chats').add({
        text: "hi",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        uidA:"A",
        uidB:"B",
        url: "url"
    });
    
    admin.firestore().collection('users').doc(uidA).collection('strangers').add({
        channelID: combinedID
    });

    admin.firestore().collection('users').doc(uidB).collection('strangers').add({
        channelID: combinedID
    });
});


