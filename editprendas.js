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

  let params = new URLSearchParams(location.search);
    var id = params.get('id');

    $("#id").val(id);

    var prendas = firebase.database().ref().child('prendas/'+id);

    prendas.on('child_added', (snap, key) => {
        console.log(snap.key + " " +snap.val());
        $("#"+snap.key).val(snap.val());
    });

});

function editar() {

    var id = $("#id").val();

    firebase.database().ref('prendas/' + id).set({
            nombre: $("#nombre").val(),
            precio: $("#precio").val(),
            tipo: $("#tipo").val()
        },
        function (error) {
            if (error) {
                alert(error);
            } else {
                window.location.href = "prendas.html";
            }
        }
    );
}
