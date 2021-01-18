import React from 'react';
import firebase from '../Firebase.js';
import 'firebase/auth';


const auth = firebase.auth();
firebase.auth().useEmulator('http://localhost:9099/');
function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default SignIn;