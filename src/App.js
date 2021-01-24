import React, { useRef, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import './App.css';

import firebase, {firestore, auth} from './Firebase.js';
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


// const auth = firebase.auth();  //firebase.auth.AUTH
// firebase.auth().useEmulator('http://localhost:9099/');
// const firestore = firebase.firestore();
// if (window.location.hostname === "localhost") {
//   firestore.useEmulator("localhost", 8080);
// }


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

      <BrowserRouter >
        <Footer />
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/new">
            <FindNew />
          </Route>
          {/* <Route path="/room">
            {user ? <ChatRoom /> : <SignIn auth={auth}/>}
          </Route> */}
          <Route path="/signup">
            {() => {
              if (!user) {
                return <SignUp />;
              }else{
                return null;
              }
            }}
          </Route>
          <Route path="/direct">
            {user ? <ChatList /> : <SignIn/>}
          </Route>
          <Route path="/">
          {user ? <ChatRoom/> : <SignIn/>}
          </Route>

        </Switch>
        
      </BrowserRouter>

    </div>
  );
};

export default App;
