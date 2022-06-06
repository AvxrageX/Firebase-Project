var mainApp = {};

var userDetailsPublic = {
  photoURL: 'n/a',
  displayName: 'n/a',
};

var userDetailsPrivate = {
  uid:      'n/a',
  age:      'n/a',
  email:    'n/a',
};

var userDetails = {
  uid: 'n/a',
};

// Wrapping a function in parentheses to create a namespace
// So functions don't clash with outer function
(function(){
  var firebase = app_firebase;
  var uid = null;
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is Signed In, save details
      userDetails.uid      = user.uid;
      userDetailsPrivate.email    = user.email;
      userDetailsPrivate.name     = user.displayName;
      userDetailsPublic.photoURL = user.photoURL;

      // Database locations
      const publicRef = "userDetails/" + userDetails.uid + "/Public";
      const privateRef = "userDetails/" + userDetails.uid + "/Private";

      // Write details to database
      firebase.database().ref(publicRef).set(userDetailsPublic);
      firebase.database().ref(privateRef).set(userDetailsPrivate);
    }

    else {
      // Redirected to Login Page
      uid = null;
      window.location.replace("login.html");
    }
  });

  // Logout Function
  function logOut() {
    firebase.auth().signOut();
  }

  mainApp.logOut = logOut;
  
})();
