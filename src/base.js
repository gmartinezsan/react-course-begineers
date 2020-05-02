import Rebase from 're-base';
import firebase from "firebase";


const firebaseApp = firebase.initializeApp({   
    apiKey: "AIzaSyAcPfX-u_xzA-lJrqZfWOmQgdoPILpy2oo",
    authDomain: "catch-of-the-day-gms.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-gms.firebaseio.com",        
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };


// default export
export default base;

