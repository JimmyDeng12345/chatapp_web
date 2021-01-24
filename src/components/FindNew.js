import React, { useState, useEffect } from 'react'
import firebase, {firestore, auth} from '../Firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const FindNew = () => {
    firestore.collection('users')

    const messagesRef = firestore.collection('users');
    const query = messagesRef.orderBy('name');
    const [users] = useCollectionData(query, { idField: 'id' });
    const [foundUser, setFoundUser] = useState('no one');
    const onClick = () => {
        if (users) {
            setFoundUser(users[0].name);
            var initConversation = firebase.functions().httpsCallable('initConversation');
            initConversation({ uidA: auth.currentUser.uid, uidB: users[0].id });
        } else {
            setFoundUser("Matching");
        }

        // combinedID = uidA > uidB ? uidB+uidA : uidA+uidB
        // firestore.collection('messages').doc(combinedID).collection('chats').add({
        //     text: "hi",
        //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //     uid: auth.currentUser.uid,
        //     url: "auth.currentUser.uid"
        // });

        // firestore.collection('users').doc(combinedID).collection('strangers').add({
        //     channelID: combinedID
        // });
    }
    return auth.currentUser && (
        <div>
            <button onClick={onClick}>Find a random person to chat with!</button>
            <h1>Found: {foundUser}</h1>
        </div>
    );
};

export default FindNew;