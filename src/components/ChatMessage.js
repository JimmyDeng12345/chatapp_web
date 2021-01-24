import React , { useRef, useState } from 'react';
import firebase, {firestore, auth} from '../Firebase.js';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  </>)
};

export default ChatMessage;
