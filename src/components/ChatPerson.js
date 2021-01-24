// import React, { useRef, useState } from 'react';
// import firebase from '../Firebase.js';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams
// } from "react-router-dom";
// import ChatRoom2 from './ChatRoom2.js';



// // const auth = firebase.auth();
// // firebase.auth().useEmulator('http://localhost:9099/');

// function ChatPerson() {
//   // const { channelID } = props.channelid;
//   // const onClick = () => {
//   //   let path = './' + channelID;
//   //   history.push(path);
//   //   console.log("clicked");

//   //   // combinedID = uidA > uidB ? uidB+uidA : uidA+uidB
//   //   // firestore.collection('messages').doc(combinedID).collection('chats').add({
//   //   //     text: "hi",
//   //   //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//   //   //     uid: auth.currentUser.uid,
//   //   //     url: "auth.currentUser.uid"
//   //   // });

//   //   // firestore.collection('users').doc(combinedID).collection('strangers').add({
//   //   //     channelID: combinedID
//   //   // });
//   // }
//   let { path, url } = useRouteMatch();
//   return (<>
//     <div>
//       <Link to="/profile" className="item">
//                 Profile
//             </Link>
//             <Link to="/" className="item">
//                 Chats
//             </Link>
//             <Link to="/new" className="item">
//                 Chat with a new stranger!
//             </Link> 
//             <Link to="/signup" className="item">
//                 SignUp
//             </Link>

//       {/* <Link to={`/${channelID}`} >Chat with this dude {channelID}</Link>
//       <Switch>
//         <Route path={`${path}/:${channelID}`}>
//           <ChatRoom2 channelid={channelID} />
//         </Route>
//       </Switch> */}

//     </div>
//   </>)
// };

// export default ChatPerson;
