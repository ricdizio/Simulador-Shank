




var botonPausar = document.getElementById("pause");
var botonConsola = document.getElementById("console");
var botonBorrar = document.getElementById("delete");
var botonAction = document.getElementById("action");
botonPausar.addEventListener("click",pausarSimulacion);
botonConsola.addEventListener("click",abrirConsola);
botonBorrar.addEventListener("click",borrarLaberinto);
botonAction.addEventListener("click",botonAction);
var x;
var y;

function action() {
    capturar();
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
    if (x == "" || y == ""){
        alert("Debe introducir dimensiones");

    }
    else{
        alert("aceptado");
    }
    return x;
    //console.log("valores x= "+x+" y= "+y);
    //dibujarMaze();
}
