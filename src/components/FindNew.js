import React, { useState, useEffect } from 'react'
import firebase, { firestore, auth } from '../Firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import axios from 'axios';
import {
    Redirect
  } from "react-router-dom";

const FindNew = () => {
    //firestore.collection('users')
    const [foundUser, setFoundUser] = useState('no one');
    const [userCount, setUserCount] = useState(0);
    // const [existed, setExisted] = useState([]);
    // if(auth.currentUser){
    //     const currentUser = firestore.collection('users').doc(auth.currentUser.uid);
    //     const strangerList = currentUser.collection('strangers');
    //     currentUser.get().then(function (doc) {
    //         const currentUserIndex = doc.data().userCount;
    //         if(!existed.includes(currentUserIndex)){
    //             setExisted(existed.push(currentUserIndex));
    //         }
    //     });
    // }


    const onClick = () => {
        setFoundUser("Matching");
        const ref = firestore.collection('info').doc('userCount');
        ref.get().then(function (doc) {
            setUserCount(doc.data().userCount);
        });
        console.log("userCount "+ userCount);
        var randomIndex = Math.floor(Math.random() * userCount) + 1;  // returns a random integer from 1 to userCount
        console.log("random: "+ randomIndex);
        const messagesRef = firestore.collection('users');
        var query = messagesRef.where("userCount", "==", randomIndex);
        query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var users = doc;
                
                setFoundUser(users.data().name);
                var initConversation = firebase.functions().httpsCallable('initConversation');
                axios.post("http://localhost:5001/chat-app-c0207/us-central1/initConversation", {uidA: auth.currentUser.uid, uidB: users.id });
                //initConversation({ uidA: auth.currentUser.uid, uidB: users.id });
            });
        });
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
    return auth.currentUser ? (
        <div>
            <button onClick={onClick}>Find a random person to chat with!</button>
            <h1 className = 'text-light'>Found: {foundUser}</h1>
        </div>
    )  : <Redirect to='/signin'/>;
};

export default FindNew;