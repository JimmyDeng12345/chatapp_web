import React, { useMemo, useRef, useState } from 'react';
import {
    Redirect
  } from "react-router-dom";
import { useCollectionData, useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import firebase, { firestore, auth } from '../Firebase.js';
import ChatMessage from './ChatMessage';
import { _onRequestWithOptions } from 'firebase-functions/lib/providers/https';
import './ChatRoom2.css';

const ChatRoom2 = (props) => {
    var encrypt = firebase.functions().httpsCallable('encrypt');
    console.log("chat room rendered");
    var decrypt = firebase.functions().httpsCallable('decrypt');

    function saveQuery() {
        const channelid = props.channelid;
        const messagesRef = firestore.collection('messages').doc(channelid).collection('chats');
        const query = messagesRef.orderBy('createdAt').limitToLast(25);
        return [messagesRef, query];
    }

    const [messagesRef, query] = useMemo(() => saveQuery(), [props.channelid]);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const [quit, setQuit] = useState('');
    //const [value, loading, error] = useDocument(firestore.collection('messages').doc(props.channelid));
    //const profile = value.data().profile;
    //const [profile, showProfile] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        console.log(messagesRef);
        console.log(query);
        console.log(messages);

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: (await encrypt({ msg: formValue })).data.ciphertext,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
    }

    const onQuit = () => {
        setQuit('quit');
    }
    const onProfileRequest = () => {
        firestore.collection('messages').doc(props.channelid).set({
            profile: "yes",
        })
    }
    return auth.currentUser ? (<div>
        <main className = 'chatmain2'>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </main>

        <form className = 'chatform' onSubmit={sendMessage}>

            <input className = 'chatinput' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here!" />

            <button className = 'sendbutton' type="submit" disabled={!formValue}>🕊️</button>

        </form>


        {/* <button onClick={()=>onQuit()}>Quit</button>
        <button onClick={()=>onProfileRequest()}>Request Profile</button> */}
    </div>)  : <Redirect to='/signin'/>;
}


export default ChatRoom2;