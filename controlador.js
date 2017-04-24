

var botonPausar = document.getElementById("pause");
var botonConsola = document.getElementById("console");
var botonBorrar = document.getElementById("delete");
var botonAction = document.getElementById("action");
var botonUpdate = document.getElementById("update");
botonPausar.addEventListener("click",pausarSimulacion);
botonConsola.addEventListener("click",abrirConsola);
botonBorrar.addEventListener("click",borrarLaberinto);
botonAction.addEventListener("click",capturar);
botonUpdate.addEventListener("click",actualizar);
var x = 6;
var y = 6;

function action() {
    capturar();
    actualizar();
    iniciar();
}

function actualizar(){
    capturar();
    n = x;
    m = y;
    setup();
}

function borrarLaberinto() {

}

function abrirConsola(){

}

function pausarSimulacion(){

}

function capturar(){
    // obtenemos e valor por el numero de elemento
    x = document.getElementById("dimensionX").value;
    // Obtenemos el valor por el id
    y = document.getElementById("dimensionY").value;
    // Obtenemos el valor por el Nombre
    console.log("x: " + x + " y: " + y);
    if (x == "" || y == ""){
        alert("Debe introducir dimensiones");

    }
    else{
        alert("valor x: "+ x +" valor y: " + y);
    }
    //console.log("valores x= "+x+" y= "+y);
    //dibujarMaze();
}
