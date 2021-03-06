import React, { withRouter, useState, useEffect } from 'react'
import "./ChatList.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

import firebase, { firestore, auth } from '../Firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatPerson from './ChatPerson.js'
import ChatRoom2 from './ChatRoom2.js';



const ChatList = (props) => {
    const currentuid = auth.currentUser ? auth.currentUser.uid : " ";
    console.log("list rendered");
    const query = firestore.collection('users').doc(currentuid).collection('strangers').orderBy('channelID');
    //console.log(query);
    const [channelidArr] = useCollectionData(query, { idField: 'id' });
    //console.log(channelIDs);
    // if(channelIDs)
    //     console.log(channelIDs[0].channelID);

    // const sendData = () => {
    //     //props.parentCallback(channelid.channelID);
    //     props.parentCallback( channelidArr)}


    // const onClick = (roomID) => {
    //     console.log("Clicked button");
    //     var chooseRoom = firebase.functions().httpsCallable('chooseRoom');
    //     chooseRoom({ uid: auth.currentUser.uid, roomNum: roomID });
    // }
    return auth.currentUser && (
        <div className = "vertical-menu">
            {channelidArr && channelidArr.map(channelid =>
                    <a key={channelid.channelID} onClick={()=>props.parentCallback(channelid.channelID)}>{channelid.ID}</a>
                )}
        </div>
    );
};

export default ChatList;

{/* <Link to={"/direct/" + channelid.channelID} key={channelid}>
                        {channelid.channelID}
                    </Link> */}