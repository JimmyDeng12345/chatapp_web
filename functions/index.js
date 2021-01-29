// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
var CryptoJS = require("crypto-js");


exports.writeToDataBase = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.
    const photoURL = user.photoURL;
    const other = user.emailVerified;
    var userCountPath = await admin.firestore().collection('info').doc('userCount').get();
    if (!userCountPath.exists) {
        admin.firestore().collection('info').doc('userCount').set({
            userCount: 1
        }).then(
            await admin.firestore().collection('users').doc(user.uid).set({
                name: displayName || "NULL",
                email: email,
                photoURL: photoURL || "NULL",
                info: "NULL",
                userCount: 1
            })
        );
    } else {
        var count = userCountPath.data().userCount + 1;
        await admin.firestore().collection('info').doc('userCount').set({
            userCount: count
        }).then(
            await admin.firestore().collection('users').doc(user.uid).set({
                name: displayName || "NULL",
                email: email,
                photoURL: photoURL || "NULL",
                info: "NULL",
                userCount: count
            })
        );
    }
});



exports.initConversation = functions.https.onCall((data, context) => {
    var uidA = data.uidA;
    var uidB = data.uidB;
    combinedID = uidA > uidB ? uidB + uidA : uidA + uidB
    // admin.firestore().collection('messages').doc(combinedID).collection('chats').add({
    //     text: CryptoJS.AES.encrypt("hi", 'secret key 123').toString(),
    //     createdAt: admin.firestore.FieldValue.serverTimestamp(),
    //     uidA:"A",
    //     uidB:"B",
    //     url: "url"
    // });

    admin.firestore().collection('users').doc(uidA).collection('strangers').add({
        channelID: combinedID
    });

    admin.firestore().collection('users').doc(uidB).collection('strangers').add({
        channelID: combinedID
    });
});


exports.encrypt = functions.https.onCall((data, context) => {
    var msg = data.msg;
    var ciphertext = CryptoJS.AES.encrypt(msg, 'secret key 123').toString();
    return {
        ciphertext: ciphertext,
    };
});

exports.decrypt = functions.https.onCall((data, context) => {
    var ciphertext = data.msg;
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return {
        originalText: originalText,
    };
})


// exports.chooseRoom = functions.https.onCall((data,context) => {
//     var uid = data.uid;
//     var roomNum = data.roomNum;
//     admin.firestore().collection('users').doc(uid).set({
//         currentRoom: roomNum
//     },  {merge: true});
// });


