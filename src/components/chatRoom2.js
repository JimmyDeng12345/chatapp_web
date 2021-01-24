import React, { useRef, useState } from 'react';
import {withRouter} from 'react-router';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, {firestore, auth} from '../Firebase.js';
import ChatMessage from './ChatMessage';


function ChatRoom2(props) {
    console.log("render");
    const { channelid } = props.channelid;
    const messagesRef = firestore.collection('messages').doc(channelid).collection('chats');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
    }
    return (<>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}


export default withRouter(ChatRoom2);