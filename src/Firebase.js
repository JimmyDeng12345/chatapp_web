import firebase from 'firebase/app';
import "firebase/functions";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
    //enter config details
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
