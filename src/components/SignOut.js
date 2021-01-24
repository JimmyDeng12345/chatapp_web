import React from 'react';

import firebase, {firestore, auth} from '../Firebase.js';

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
};

export default SignOut;