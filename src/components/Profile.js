import React, { useState, useEffect } from 'react'
import firebase, {firestore, auth} from '../Firebase.js';

const Profile = () => {
    return auth.currentUser &&(
        <div>
            <h1>Name: {auth.currentUser.displayName}</h1>
            <img src={auth.currentUser.photoURL} alt="User's profile picture"/>
            <p>Email: {auth.currentUser.email}</p>
        </div>
    );
};

export default Profile;