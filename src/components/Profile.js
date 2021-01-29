import { user } from 'firebase-functions/lib/providers/auth';
import React, { useState, useEffect } from 'react'
import firebase, { firestore, auth, storage } from '../Firebase.js';

const Profile = () => {

    const [userName, setUserName] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [userPhotoURL, setUserPhotoURL] = useState("");


    // if(auth.currentUser){
    //     firestore.collection('users').doc(auth.currentUser.uid).get().then(function(doc){
    //         //setUserInfo(doc.get("info"));
    //     }).catch(function(err){
    //         console.log("Error getting document:", err);
    //     });
    //     //setUserName(auth.currentUser.displayName);
    //     //setUserName(auth.currentUser.photoURL);
    // }




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
    const onInfoUpdate = () => {
        auth.currentUser.updateProfile({
            info: userInfo,
        });
        firestore.collection('users').doc(auth.currentUser.uid).set({
            info: userInfo
        } , {merge : true});
    }
    return auth.currentUser && (
        <div>
            <h1>Name: {auth.currentUser.displayName}</h1>
            <form onSubmit={() => onNameUpdate()}>
                <input type="text" value={userName} onChange={(event) => { setUserName(event.target.value) }} />
                <button type="submit">Save Display Name</button>
            </form>
            <br />
            <p>Email: {auth.currentUser.email}</p>
            <br />
            <img src={auth.currentUser.photoURL} alt="User's profile picture" />
            <br />
            <form onSubmit={() => onPhotoUpdate()}>
                <input type="text" value={userPhotoURL} onChange={(event) => { setUserPhotoURL(event.target.value)}}/>
                <button type="submit">Upload Profile Picture</button>
            </form>

            <br />

            <p>Info: {auth.currentUser.info}</p>
            <form onSubmit={() => onInfoUpdate()}>
                <input type="text" value={userInfo} onChange={(event) => { setUserInfo(event.target.value) }} />
                <button type="submit">Edit Bio</button>
            </form>
        </div>
    );
};

export default Profile;