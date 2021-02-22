import { user } from 'firebase-functions/lib/providers/auth';
import React, { useState, useEffect } from 'react'
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import {
    Redirect
  } from "react-router-dom";
import firebase, { firestore, auth, storage } from '../Firebase.js';
import SignOut from './SignOut'
import './Profile.css'

const Profile = () => {
    // var info = "";

    // if(auth.currentUser){
    //     firestore.collection('users').doc(auth.currentUser.uid).get().then(function(doc){
    //         info = doc.data().info;
    //     }).catch(function(err){
    //         console.log("Error getting document:", err);
    //     });
    //     //setUserName(auth.currentUser.displayName);
    //     //setUserName(auth.currentUser.photoURL);
    // }

    const [userName, setUserName] = useState("");
    // const [userInfo, setUserInfo] = useState("");
    const [userPhotoURL, setUserPhotoURL] = useState("");
    



    const onNameUpdate = () => {
        auth.currentUser.updateProfile({
            displayName: userName,
        });
        firestore.collection('users').doc(auth.currentUser.uid).set({
            name: userName,
        }, {merge : true});
    }
    const onPhotoUpdate = () => {
        auth.currentUser.updateProfile({
            photoURL: userPhotoURL,
        });
        firestore.collection('users').doc(auth.currentUser.uid).set({
            photoURL: userPhotoURL,
        }, {merge : true});
    }
    // const onInfoUpdate = async () => {
    //     // auth.currentUser.updateProfile({
    //     //     phoneNumber: userInfo,
    //     // });
    //     firestore.collection('users').doc(auth.currentUser.uid).set({
    //         info: userInfo
    //     } , {merge : true});
    // }
    return auth.currentUser ? (
        <div className = 'justify-content-center'>
            <img className = 'profileimg mb-4 mt-4' src={auth.currentUser.photoURL} alt="User's profile picture" />
            <h2 className = "text-light">{auth.currentUser.displayName}</h2>
            <p className = "text-light">Your email: {auth.currentUser.email}</p>
            {/* <p>About: {userPhotoURL}</p> */}
            <form onSubmit={() => onPhotoUpdate()}>
                <input type="text" value={userPhotoURL} onChange={(event) => { setUserPhotoURL(event.target.value)}}/>
                <button type="submit">Upload Profile Picture</button>
            </form>
            <form onSubmit={() => onNameUpdate()}>
                <input type="text" value={userName} onChange={(event) => { setUserName(event.target.value) }} />
                <button type="submit">Save Display Name</button>
            </form>
            {/* <form onSubmit={() => onInfoUpdate()}>
                <input type="text" value={userInfo} onChange={(event) => { setUserInfo(event.target.value) }} />
                <button type="submit">Edit Bio</button>
            </form> */}
            <SignOut/>
        </div>
    )  : <Redirect to='/signin'/>;
};

export default Profile;