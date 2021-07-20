import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore";

firebase.initializeApp(
    {
        apiKey: "AIzaSyDjKxfYvvpMLoCAQSP9CpNvHvu0ePmccGk",
    authDomain: "reels-71acf.firebaseapp.com",
    projectId: "reels-71acf",
    storageBucket: "reels-71acf.appspot.com",
    messagingSenderId: "1042503554064",
    appId: "1:1042503554064:web:a324b79d5de106272f2695"
    }
)
const firestore = firebase.firestore();

export const database ={
    users:firestore.collection('users'),//creating collections here so that our main app doesn't have access to firestore 
    //for safety reasons
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
// export default firebase;
//difference between storage and database is that a storage stores a txt file or image 
//whereas a database stores a structured/semi-structured type of data like IDs, records etc
export const storage = firebase.storage();
export const auth = firebase.auth();