import firebase from 'firebase'


  var firebaseConfig = {
    apiKey: "AIzaSyC2wjA8kLsXJ1-Af3qSSlOE_aeMSoqoE3Y",
    authDomain: "login-vue-firebase-de3d3.firebaseapp.com",
    projectId: "login-vue-firebase-de3d3",
    storageBucket: "login-vue-firebase-de3d3.appspot.com",
    messagingSenderId: "404809271263",
    appId: "1:404809271263:web:cdab5249e725c2fd02666a",
    measurementId: "G-0NH4H0Z5P4"
  };
  // Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({timestampInSnapshots: true})

export default firebaseApp.firestore();



// var fire = new Vue({    
//     data:{

//     },
//     methods:{
//         state(collback){
//             auth.onAuthStateChanged(function(user){
//                 collback(user);
//             })
//         },
//         register(data){
//             return auth.createUserWithEmailAndPassword(data.email, data.password);
//         },
//         login(data){
//             return auth.signInWithEmailAndPassword(data.email, data.password);
//         },
//         logout(){
//             auth.signOut();
//         }
//     }
// })