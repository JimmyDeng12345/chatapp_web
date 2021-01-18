import React , { useRef, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../Firebase.js';
import ChatMessage from './ChatMessage';

const firestore = firebase.firestore();
if (window.location.hostname === "localhost") {
  firestore.useEmulator("localhost", 8080);
}
const auth = firebase.auth();
firebase.auth().useEmulator('http://localhost:9099/');

function ChatRoom(){

  const messagesRef = firestore.collection('messages');
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


export default ChatRoom;