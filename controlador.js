

var botonDetener = document.getElementById("detener");
var botonReiniciar = document.getElementById("reiniciar");
var botonBorrar = document.getElementById("delete");
var botonAction = document.getElementById("action");
var botonUpdate = document.getElementById("update");
var botonInstrucciones = document.getElementById("instruction");
botonDetener.addEventListener("click",detenerSimulacion);
botonReiniciar.addEventListener("click",reiniciar);
botonBorrar.addEventListener("click",borrarLaberinto);
botonAction.addEventListener("click",action);
botonUpdate.addEventListener("click",actualizar);
botonInstrucciones.addEventListener("click",instructiones);
var x = 6;
var y = 6;
var tempX = x;
var tempY = y;
var colaCoordenadasX = new Cola();
var colaCoordenadasY = new Cola();
var colaCardinalGlobal = new Cola();
var disable = 1; // variable que indica si se activa la simulacion desativa el boton
// de iniciar simulacion (para el boton de iniciar simulacion)
var deshabilitarBorrar = 1;

function action() {
    if(disable==1){
    	frameRate(5);

    	SimulationStart=1;
        X = x;
        Y = y;
        destino = [ [X/2-1,Y/2-1],[X/2,Y/2-1],[X/2-1,Y/2],[X/2,Y/2] ];

        // coordenada de inicio
        inicio.x = 0;
        inicio.y = 0;

        // Cardinal
        cardinalGlobal = 4;
        //var cardinales= ['north','south','east','west'];

        //Coordenada actual global
        coord_actual_global.x = 0;
        coord_actual_global.y = 0;
        globalCoord.x = 0;
        globalCoord.y = 0;
        globalEnd.x = 0;
        globalEnd.y = 0;
        //setup();
        colaCoordenadasY.cola = new Array();
        colaCoordenadasX.cola = new Array();
        colaCardinalGlobal.cola = new Array();
        this.innerText = "Simulacion iniciada";
        this.className = "btn btn-default btn-lg";
        botonUpdate.className = "btn btn-default btn-lg";
        botonBorrar.className = "btn btn-default btn-lg";
        botonDetener.className = "btn btn-danger btn-lg";
        disable = 0;
        deshabilitarBorrar = 0;
        iniciar_maze();
        iniciar();
    }
    else{
        // No hacer nada
    }

}

function actualizar(){
    if (disable==1){
        tempX = x;
        tempY = y;
        disable = 1;
        borrarLaberinto();
        var estado = capturar();
        if(estado && !(tempY == y && tempX==x)){
            n = x;
            m = y;
            X = x;
            Y = y;
            setup();
        } 
        else{alert("No se han modificado las dimensiones")
            //setup();
        }
    }
    else{
        //No hacer nada
    }
}

function borrarLaberinto() {
    if (deshabilitarBorrar==1){
        alert("Se limpiará el maze en pantalla");
        botonAction.className = "btn btn-primary btn-lg";
        botonAction.innerText = "Iniciar Simulacion";
        botonUpdate.className = "btn btn-success btn-lg";
        SimulationStart=0;
        disable = 1;
        colaX = 0;
        colaY = 0;
        colaCardinal = 4;
        tempXDraw = 0;
        tempYDraw = 0;
        GlobalTemp = 1;
        X = x;
        Y = y;
        destino = [ [X/2-1,Y/2-1],[X/2,Y/2-1],[X/2-1,Y/2],[X/2,Y/2] ];

        // coordenada de inicio
        inicio.x = 0;
        inicio.y = 0;

        // Cardinal
        cardinalGlobal = 4;
        //var cardinales= ['north','south','east','west'];

        //Coordenada actual global
        coord_actual_global.x = 0;
        coord_actual_global.y = 0;
        globalCoord.x = 0;
        globalCoord.y = 0;
        globalEnd.x = 0;
        globalEnd.y = 0;
        colaCoordenadasY.cola = new Array();
        colaCoordenadasX.cola = new Array();
        colaCardinalGlobal.cola = new Array();
        setup();
    }
    else{
        //No hacer nada
    }
}

function reiniciar(){
	frameRate(10);
    botonAction.className = "btn btn-primary btn-lg";
    botonAction.innerText = "Iniciar Simulacion";
    botonUpdate.className = "btn btn-success btn-lg";
    botonBorrar.className = "btn btn-danger btn-lg";
    botonDetener.className = "btn btn-default btn-lg";
    SimulationStart=0;
    disable = 1;
    colaX = 0;	
    colaY = 0;
    colaCardinal = 4;
    GlobalTemp = 1;
    deshabilitarBorrar = 1;

    // coordenada de inicio
    inicio.x = 0;
    inicio.y = 0;

    // Cardinal
    cardinalGlobal = 4;
    //var cardinales= ['north','south','east','west'];

    // Borramos el carrito en su ultima posicion.
    noStroke();
    fill(180);
    rect((tempXDraw*w),(tempYDraw*w),w,w);

    //Coordenada actual global
    coord_actual_global.x = 0;
    coord_actual_global.y = 0;
    globalCoord.x = 0;
    globalCoord.y = 0;
    globalEnd.x = 0;
    globalEnd.y = 0;

    // Vaciamos las colas ?????????????????????? Por alguna razon funciona xD!
    while(colaCoordenadasX.isEmpty()!=1 && colaCoordenadasY.isEmpty()!=1 && colaCardinalGlobal.isEmpty()!=1){
    	tempXDraw = colaCoordenadasX.pop();
   		tempYDraw = colaCoordenadasY.pop();
   		tempxDraw = colaCardinalGlobal.pop();
    }

    tempXDraw = 0;
    tempYDraw = 0;
    imgDraw(inicio.x, inicio.y);
    LineasGuia();
    PrintWalls(coordCelda);
}

function detenerSimulacion(){
	reiniciar();
}

function instructiones() {
    //Body
    alert("Leo Chupalo");
    alert("Leo Gay");
    alert("Ya pues chupalo Leo");
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

