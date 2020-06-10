$(document).ready(function(){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBwdcv5NWt0NePIwynX4NpgPfsfrcSNiII",
    authDomain: "donbola-1fd3e.firebaseapp.com",
    databaseURL: "https://donbola-1fd3e.firebaseio.com",
    projectId: "donbola-1fd3e",
    storageBucket: "donbola-1fd3e.appspot.com",
    messagingSenderId: "639142836728",
    appId: "1:639142836728:web:e8f222836b0f206762be0d"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

});

function agregar() {

    firebase.database().ref('clientes').push({
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            telefono: $("#telefono").val()
        },
        function (error) {
            if (error) {
                alert(error);
            } else {
                window.location.href = "client.html";
            }
        }
    );
}
