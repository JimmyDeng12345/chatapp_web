import React from 'react';

import firebase, {firestore, auth} from '../Firebase.js';

function SignOut(props) {
  return auth.currentUser && (
    <button onClick={() => {props.parentCallback(" "); auth.signOut()}}>Sign Out</button>
  )
};

export default SignOut;