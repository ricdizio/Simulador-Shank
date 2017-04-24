

var botonPausar = document.getElementById("pause");
var botonConsola = document.getElementById("console");
var botonBorrar = document.getElementById("delete");
var botonAction = document.getElementById("action");
var botonUpdate = document.getElementById("update");
botonPausar.addEventListener("click",pausarSimulacion);
botonConsola.addEventListener("click",abrirConsola);
botonBorrar.addEventListener("click",borrarLaberinto);
botonAction.addEventListener("click",action);
botonUpdate.addEventListener("click",actualizar);
var x = 6;
var y = 6;
var tempX = x;
var tempY = y;

function action() {
    X = x;
    Y = y;
    destino = [ [X/2-1,Y/2-1],[X/2,Y/2-1],[X/2-1,Y/2],[X/2,Y/2] ];

    // coordenada de inicio
    var inicio = new coord();
    inicio.x = 0;
    inicio.y = 0;

    // Cardinal
    var cardinalGlobal = 4;
    //var cardinales= ['north','south','east','west'];

    //Coordenada actual global
    var coord_actual_global = new coord();
    coord_actual_global.x = 0;
    coord_actual_global.y = 0;
    globalCoord.x = 0;
    globalCoord.y = 0;
    globalEnd.x = 0;
    globalEnd.y = 0;
    iniciar();
}

function actualizar(){
    tempX = x;
    tempY = y;
    var estado = capturar();
    if(estado && !(tempY == y && tempX==x)){
        n = x;
        m = y;
        X = x;
        Y = y;
        setup();
    } 
    else{alert("No se han modificado las dimensiones");}
}

function borrarLaberinto() {
    setup();
}

function abrirConsola(){

}

function pausarSimulacion(){

}

function capturar(){
    var bool;
    // obtenemos e valor por el numero de elemento
    x = document.getElementById("dimensionX").value;
    // Obtenemos el valor por el id
    y = document.getElementById("dimensionY").value;
    // Obtenemos el valor por el Nombre
    //console.log("X: " + x + " Y: " + y);
    if (x == "" || y == "")
    {
        bool = 0;
        alert("Dimensiones por defecto X:6 , Y:6");
    }
    else if((tempY == x && tempX == x))
    {
        bool = 0;
    }
    else
    {
        alert("valor X: "+ x +" valor X: " + y);
        bool = 1;
    }
    //console.log("valores x= "+x+" y= "+y);
    //dibujarMaze();
    return bool;
}
