import firebase from 'firebase/app';

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
//firebase.functions().useEmulator("localhost", 5001);

  export default firebase;