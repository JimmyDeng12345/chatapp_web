import React, { withRouter, useState, useEffect } from 'react'

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


const ChatList = () => {

    const query = firestore.collection('users').doc(auth.currentUser.uid).collection('strangers').orderBy('channelID').limitToLast(10);
    //console.log(query);
    const [channelidArr] = useCollectionData(query, { idField: 'id' });
    //console.log(channelIDs);
    // if(channelIDs)
    //     console.log(channelIDs[0].channelID);

    return (
        <div>
            {channelidArr && channelidArr.map(channelid =>
                <div>
                    <Link to={"/direct/" + channelid.channelID} key={channelid}>
                        {channelid.channelID}
                    </Link>
                    <br />
                </div>)}
            {channelidArr && channelidArr.map(channelid =>
                <Route path={"/direct/" + channelid.channelID} key={channelid}>
                    <ChatRoom2 channelid={channelid.channelID} />
                </Route>)}
        </div>

    );
};

export default ChatList;