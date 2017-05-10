import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBvwlHOgu0PShY4c_MGS_dyqFloHWHSqDY",
    authDomain: "reacttasker.firebaseapp.com",
    databaseURL: "https://reacttasker.firebaseio.com",
    projectId: "reacttasker",
    storageBucket: "reacttasker.appspot.com",
    messagingSenderId: "983226787081"
  };

firebase.initializeApp(config);

export default firebase;
