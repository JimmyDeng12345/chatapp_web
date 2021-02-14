import React , { useRef, useState } from 'react';
import firebase, {firestore, auth} from '../Firebase.js';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import './ChatMessage.css';


function ChatMessage(props) {
  var { text, uid, photoURL } = props.message;
  const [originalText, setOriginalText] = useState("");
  const decrypt = firebase.functions().httpsCallable('decrypt');
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  //text = (await decrypt({msg: text})).data.originalText;
  decrypt({msg: text}).then((result) => {
    // Read result of the Cloud Function.
    console.log("read: " + result.data.originalText);
    setOriginalText(result.data.originalText);
  });
  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{originalText}</p>
    </div>
  </>)
};

export default ChatMessage;
