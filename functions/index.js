const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
var CryptoJS = require("crypto-js");
//const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const makeRoom = express();
//makeRoom.use(bodyParser.json());
makeRoom.use(cors({ origin: true }));
makeRoom.post('/', async (req, res) => {
    var uidA = req.body.uidA;
    var uidB = req.body.uidB;
    combinedID = uidA > uidB ? uidB + uidA : uidA + uidB
    await admin.firestore().collection('users').doc(uidA).collection('strangers').add({
        channelID: combinedID,
        ID: uidB,
    });
    await admin.firestore().collection('users').doc(uidB).collection('strangers').add({
        channelID: combinedID,
        ID: uidA,
    });
    res.send("");
});
makeRoom.delete("/:id", async (req, res) => {
    
});
makeRoom.get("/:id", async (req, res) => {
    
});
makeRoom.put("/:id", async (req, res) => {
    
});
exports.initConversation= functions.https.onRequest(makeRoom);

exports.writeToDataBase = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const email = user.email; // The email of the user.
    const displayName = user.displayName || "User"; // The display name of the user.
    const photoURL = user.photoURL || "https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/user-account-profile-human-avatar-face-head--512.png";
    const other = user.emailVerified;
    var userCountPath = await admin.firestore().collection('info').doc('userCount').get();
    await admin.auth().updateUser(uid, {
        displayName: displayName,
        photoURL: photoURL
    });
    if (!userCountPath.exists) {
        admin.firestore().collection('info').doc('userCount').set({
            userCount: 1
        }).then(
            await admin.firestore().collection('users').doc(user.uid).set({
                name: displayName,
                email: email,
                photoURL: photoURL,
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
                name: displayName,
                email: email,
                photoURL: photoURL,
                info: "NULL",
                userCount: count
            })
        );
    }
});



// exports.initConversation = functions.https.onCall((data, context) => {
//     var uidA = data.uidA;
//     var uidB = data.uidB;
//     combinedID = uidA > uidB ? uidB + uidA : uidA + uidB
//     admin.firestore().collection('users').doc(uidA).collection('strangers').add({
//         channelID: combinedID,
//         ID: uidB,
//     });

//     admin.firestore().collection('users').doc(uidB).collection('strangers').add({
//         channelID: combinedID,
//         ID: uidA,
//     });
// });

// const encrypt = express();
// encrypt.use(cors({ origin: true }));
// encrypt.post("/", async (req, res) => {
//     var msg = req.body.msg;
//     var ciphertext = CryptoJS.AES.encrypt(msg, 'secret key 123').toString();
//     res.send({ciphertext: ciphertext});
// });
// exports.encrypt= functions.https.onRequest(encrypt);

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


