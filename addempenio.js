
//  var dataDB = null;
//  var dataDBP = null;
//  var dataVP = null;

$(document).ready(function () {
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

  var clientes = firebase.database().ref().child('clientes');

  clientes.on('child_added', (snap, key) => {
    var id = snap.key;
    var nombre = snap.child('nombre').val();
    var apellido = snap.child('apellido').val();
    var telefono = snap.child('telefono').val();
    $("#cliente").append("<option value='" + id + "'>" + nombre + " " + apellido + "</option>");
  });

  // Se conecta con la base de datos de Firebase
  var dataDB = firebase.database().ref('clientes');
  var dataDBP = firebase.database().ref('prendas');
  var dataVP = firebase.database().ref('remates');

  var clientes = {};
  var prendas = {};

  getPrendas();

  // $("#product_1").on("keyup", function() {
  //   calcImporte("1");
  // });
  // $("#product_2").on("keyup", function() {
  //   calcImporte("2");
  // });
  // $("#product_3").on("keyup", function() {
  //   calcImporte("3");
  // });

  $("#cant_1").on("keyup", function() {
    calcImporte("1");
  });
  $("#cant_2").on("keyup", function() {
    calcImporte("2");
  });
  $("#cant_3").on("keyup", function() {
    calcImporte("3");
  });

});


function getPrendas() {
  var dataDBP = firebase.database().ref('prendas');
  dataDBP.on('value', function (datos) {
    //$('usuarios').children().remove();
    prendas = datos.val();
    for (var i = 1; i <= 3; i++) {
      var select = document.getElementById('prenda_' + i);
      $.each(prendas, function (indice, valor) {
        var option = document.createElement("option");
        option.setAttribute("value", indice);
        option.setAttribute("label", valor.nombre);
        select.appendChild(option);
      });
    }
  });
}

function getPrecio(prendax, preciox, index) {
  var dataDBP = firebase.database().ref('prendas');
  document.getElementById(preciox).value = "";
  var prenda = dataDBP.child(prendax);
  prenda.on('value', function (data) {
    var prendas = data.val();
    document.getElementById(preciox).value = prendas.precio;
  });
  calcImporte(index);
}

function calcImporte(index) {
  console.log(index);
  var cant = $("#cant_"+index).val();
  var precio = $("#precio_"+index).val();
  var imp = cant * precio;
  $("#importe_"+index).val(imp);
  // document.getElementById(importe).value = imp;
}

function guardarVenta() {
  var dataDB = firebase.database().ref('clientes');
  // Extraer la clave del usuario
  var user = document.getElementById('cliente');
  // Extraer la fecha del sistema
  var d = new Date();
  var m = d.getMonth() + 1;
  var mes = (m < 10) ? '0' + m : m;
  var fechag = d.getFullYear() + "-" + mes + "-" + d.getDate();
  //Guardando la venta
  dataDB.child(user.value).child('ventas').push({
    fecha: fechag
  });
  alert('Venta registrada');
}

function calcularTotal(idventa) {
  guardarVenta();
  var dataVP = firebase.database().ref('remates');
  var dataDB = firebase.database().ref('clientes');

  var user = document.getElementById('cliente');

  
  var query = dataDB.child(user.value).child('ventas').limitToLast(1);
  query.on('child_added', function (snap) {
    document.getElementById(idventa).value = snap.key;
  });
  var id = document.getElementById(idventa).value;
  var pzas = 0;
  var total = 0;
  for (var i = 1; i <= 3; i++) {
    var prendas = document.getElementById('prenda_' + i).value;
    var cant = document.getElementById('cant_' + i).value;
    var imp = document.getElementById('importe_' + i).value;

    if(id) {
      dataDB.child('remates')
    }

    if (prendas != 0) {
      pzas += parseInt(cant);
      total += parseInt(imp);
      dataVP.push({
        idventa: id,
        codprenda: prendas,
        cant: cant
      });
    }
  }
  //Actualizando el total y pzas en la venta
  if(id) {
    dataDB.child(user.value).child('ventas').child(id).update({
      pzas: pzas,
      total: total
    });
  } else {
    dataDB.child(user.value).child('ventas').push({
      pzas: pzas,
      total: total
    });
  }
}
