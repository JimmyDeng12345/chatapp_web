import React, { useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import './App.css';

import firebase from './Firebase.js';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatList from './components/ChatList.js';
import FindNew from './components/FindNew.js';
import Footer from './components/Footer.js';
import Profile from './components/Profile.js';
import ChatRoom from './components/ChatRoom.js';
import SignOut from './components/SignOut.js';
import SignIn from './components/SignIn.js';


const auth = firebase.auth();  //firebase.auth.AUTH
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {

  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut auth = {auth}/>
      </header>

      {/* <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section> */}

      <Router>
        <Footer />
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/new">
            <FindNew />
          </Route>
          <Route path="/room">
            {user ? <ChatRoom /> : <SignIn auth={auth}/>}
          </Route>
          <Route path="/">
            {user ? <ChatList /> : <SignIn auth={auth}/>}
          </Route>
        </Switch>
        
      </Router>

    </div>
  );
};

export default App;
