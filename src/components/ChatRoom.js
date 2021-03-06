import React , { useRef, useState } from 'react';
import {
  Redirect
} from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase, {firestore, auth} from '../Firebase.js';
import ChatMessage from './ChatMessage.js';



function ChatRoom(){
  var encrypt = firebase.functions().httpsCallable('encrypt');

  //const decrypt = firebase.functions().httpsCallable('decrypt');
  const messagesRef = firestore.collection('posts');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    //var sanitizedMessage = "";
    // encrypt({msg: formValue}).then((result) => {
    //   // Read result of the Cloud Function.
    //   sanitizedMessage = result.data.ciphertext;
    //   console.log("write: " + sanitizedMessage)
    // }); 
    await messagesRef.add({
      text: (await encrypt({msg: formValue})).data.ciphertext, //sanitizedMessage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
  }
  
  return auth.currentUser ? (<>
    <main className = 'chatmain'>
      {messages && messages.map(m => <ChatMessage key={m.id} message={m}/>)}
    </main>

    <form className = 'chatform' onSubmit={sendMessage}>

      <input className = 'chatinput' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here!" />

      <button className = 'sendbutton' type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>) : <Redirect to='/signin'/>;
}


export default ChatRoom;