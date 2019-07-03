const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyCHX-uS1bRpR7fRv0-73EqziP995N-3dTM",
    authDomain: "podgornaya22-b95cc.firebaseapp.com",
    databaseURL: "https://podgornaya22-b95cc.firebaseio.com",
    projectId: "podgornaya22-b95cc",
    storageBucket: "podgornaya22-b95cc.appspot.com",
    messagingSenderId: "574001408436",
    appId: "1:574001408436:web:80f6a114fec7af67"
});

let db = firebase.firestore();

export default db;