var app_firebase = {};

// Wrapping a function in parentheses to create a namespace
// So functions don't clash with outer function
(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0hKn59ydN4RwSJslPlkuighduEHeguak",
    authDomain: "comp-fb-project.firebaseapp.com",
    projectId: "comp-fb-project",
    storageBucket: "comp-fb-project.appspot.com",
    messagingSenderId: "846952182108",
    appId: "1:846952182108:web:e389dc4649911531111199",
    measurementId: "G-GLM9L141JL",
    databaseURL: "https://comp-fb-project-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

  firebase.initializeApp(config);
  app_firebase = firebase;

})();

