import firebase from 'firebase/app';
import "firebase/functions";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBjZ-QWn0k8TZ7QhW8XnCVK5mvDoZLxGmI",
  authDomain: "chat-app-c0207.firebaseapp.com",
  projectId: "chat-app-c0207",
  storageBucket: "chat-app-c0207.appspot.com",
  messagingSenderId: "760182975306",
  appId: "1:760182975306:web:ea14e80bd7324b91bfafb3",
  measurementId: "G-HG4S8MSW38"
};
  //firebase.analytics();
firebase.initializeApp(firebaseConfig);
firebase.functions().useEmulator("localhost", 5001);
export const firestore = firebase.firestore();
if (window.location.hostname === "localhost") {
    firestore.useEmulator("localhost", 8080);
}
export const auth = firebase.auth();
firebase.auth().useEmulator('http://localhost:9099/');
export const analytics = firebase.analytics();
//export const storage = firebase.storage();

export default firebase;
