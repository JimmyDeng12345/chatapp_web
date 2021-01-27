import React, { useState, useEffect } from 'react'
import firebase, {firestore, auth} from '../Firebase.js';

const Profile = () => {
    return auth.currentUser &&(
        <div>
            <h1>Name: {auth.currentUser.displayName}</h1>
            <button>Edit Display Name</button>
            <img src={auth.currentUser.photoURL} alt="User's profile picture"/>
            <button>Edit Profile Picture</button>
            <p>Email: {auth.currentUser.email}</p>
            <p>Info: </p>
            <button>Edit Info</button>
        </div>
    );
};

export default Profile;