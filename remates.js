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

      var database = firebase.database();

      var prendas = firebase.database().ref().child('remates');

      prendas.on('child_added', (snap, key) => {
          var id = snap.key;
          var nombre = snap.child('nombre').val();
          var precio = snap.child('precio').val();
          var tipo = snap.child('tipo').val();
          $("#table_body").append("<tr><td>"+id+"</td><td>"+nombre+"</td><td>"+precio+"</td><td>"+tipo+"</td><td><a class='btn btn-info' href='edit.html?id="+id+"'>Update</a> <button class='btn btn-danger' onClick='eliminar("+'"'+id+'"'+")'>Delete</button></td></tr>");

      });
  });

  function eliminar(id) {
      firebase.database().ref('remates/' + id).remove();
      window.location.href = "remates.html";

  }
