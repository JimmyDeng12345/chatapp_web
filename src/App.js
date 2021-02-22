import React, { useRef, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import './App.css';

import firebase, { firestore, auth } from './Firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatList from './components/ChatList.js';
import FindNew from './components/FindNew.js';
import Footer from './components/Footer.js';
import Profile from './components/Profile.js';
import ChatRoom2 from './components/ChatRoom2.js';
import SignOut from './components/SignOut.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import ChatRoom from './components/ChatRoom.js';

function App() {
  console.log('App rendered');
  const [user] = useAuthState(auth);
  const [roomNum, setRoomNum] = useState(" ");
  const callbackFunction = (childData) => {
    setRoomNum(childData);
    console.log("APP:" + roomNum);
  };
  // const [roomNum, setRoomNum] = useState([]);

  // const callbackFunction = (childData) => {
  //     setRoomNum(childData);
  // };
  return (
    <div className="App">
        <h1>⚛️🔥💬</h1>
        <BrowserRouter className="navbar navbar-default">
          {user? <Footer className="" /> : null}
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/new">
              <FindNew />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            {/* <Route path="/room">
            {user ? <ChatRoom /> : <SignIn auth={auth}/>}
  </Route> */}

            {/* {directRooms.map(channelid => <Route path={"direct/"+channelid}>
            {user ? <div><ChatList parentCallback={callbackFunction}/> <ChatRoom2 channelid={channelid.channelID}/></div>  : <SignIn/>}
          </Route>)} */}
            <Route path="/direct">
              <ChatList parentCallback={callbackFunction} />
              {roomNum === " " ? <h1 className = 'text-light'>Either click the left nav bar to chat with someone, or match with a new random</h1> : <ChatRoom2 channelid={roomNum} />}
            </Route>
            <Route path="/">
              <ChatRoom />
            </Route>

          </Switch>
        </BrowserRouter>

      {/* <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section> */}



    </div>
  );
};

export default App;
