// Tamaño del laberinto
var m = 6; // Filas.
var n = 6; // Columnas.

// Propiedades graficas del canvas. (600x600 como tamaño estandar).
var ancho = 600;
var alto = 600;


var simulationFrameRate = 60;
var noSimulationFrameRate = 10;
var carSpeed = 0.05;

// Tamaño de las celdas.
var w;
var img;
var simulationStart = 0;
var colaX = 0;
var colaY = 0;
var tempXDraw = 0;
var tempYDraw = 0;
var globalTemp = 1;
var colaCardinal = 4;
/*
0: [0,0,0,0];
1: [0,0,0,1];
2: [0,0,1,0];
3: [0,0,1,1];
4: [0,1,0,0];
5: [0,1,0,1];
6: [0,1,1,0];
7: [0,1,1,1];
8: [1,0,0,0];
9: [1,0,0,1];
10: [1,0,1,0];
11: [1,0,1,1];
12: [1,1,0,0];
13: [1,1,0,1];
14: [1,1,1,0];
15: [1,1,1,1];
/*
NSEW = 0
-SEW = 1
N-EW = 2
NS-W = 4
NSE- = 8
NS-- = 12
--EW = 3
N--W = 6
N-E- = 10
-S-W = 5
-SE- = 9
N--- = 14
-S-- = 13
--E- = 11
---W = 7
---- = 15
*/

/*
var MazeWalls = [
    [9,10,10,10,13,12],
    [5,0,0,0,0,5],
    [5,0,9,12,0,5],
    [1,8,2,6,0,4],
    [7,0,0,0,0,13],
    [3,2,10,10,10,6],
];*/


var coordCelda = new Array();
    for(var i=0; i< m; i++){
        coordCelda[i]= new Array();
    }

function preload() {
	imgNorte = loadImage("./shankNorte.png");
	imgSur = loadImage("./shankSur.png");
    imgEste = loadImage("./shankEste.png");
    imgOeste = loadImage("./shankOeste.png");
}


function setup(){
    for(var i=0; i< m; i++){
        coordCelda[i]= new Array();
    }

    var canvas = createCanvas(ancho+1,alto+1);
    canvas.parent('canvas-position');
    w = adjustCells();

    loadImage("./shankEste.png", function(img) {
        imgDraw(0,0); 
    });

    background(180);
    frameRate(noSimulationFrameRate);

    // Creamos los objetos.
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            var celda = new Celda(i,j);
            coordCelda[i][j] = celda;
        }
    }
    // Posicion actual del carrito.
    // actual = coordCelda[0][0];
    // Dibujamos las lineas guias para que el usuario dibuje su laberinto.
    guidelines();
    stroke(0);
    borderWalls(coordCelda);
    printWalls(coordCelda);
}


function draw(){ // este es el main
    // Llamamos la funcion que permite al usuario dibujar el laberinto.
    userSetWalls(coordCelda);

    if(simulationStart==1  && globalTemp==1){
        // Borrar celda vieja.
        noStroke();
        fill(180);
        rect((tempXDraw*w),(tempYDraw*w),w,w);
        guidelines();
        printWalls(coordCelda);

        // Actualizamos las variables colaX y colaY.
        if(tempXDraw==colaX && tempYDraw==colaY){
        	// Si la cola esta vacia, terminamos la simulacion.
            if(colaCoordenadasX.isEmpty()==1) {
                globalTemp=0;
            }
            else{
                colaX = colaCoordenadasX.pop();
                colaY = colaCoordenadasY.pop();
                colaCardinal = colaCardinalGlobal.pop();
            }
        }

        if(tempXDraw!=colaX){
        	// Se coloca este globalTemp = 1 porque si no, cuando la cola este vacia va a terminar instantaneamente la simulacion, y aun le falta el ultimo paso.
            globalTemp=1;
            if(tempXDraw<colaX){
            	// Se multiplica y divide entre 100 para evitar problemas con decimales (0.6000000001 por ejemplo).
                tempXDraw = Math.round((tempXDraw + carSpeed)*100)/100;
            }
            else{
                tempXDraw = Math.round((tempXDraw - carSpeed)*100)/100;
            }
        }

        if(tempYDraw!=colaY){
            globalTemp=1;
            if(tempYDraw<colaY){
                tempYDraw = Math.round((tempYDraw + carSpeed)*100)/100;
            }
            else{
                tempYDraw = Math.round((tempYDraw - carSpeed)*100)/100;
            }
        }

        if(globalTemp==0 && colaX == 0 && colaY == 0){
            alert("Completaste el laberinto!");
            botonAction.innerText = "Simulacion Terminada";
            botonAction.className = "btn btn-success btn-lg";
            botonBorrar.className = "btn btn-danger btn-lg";
            botonDetener.className = "btn btn-default btn-lg";
            deshabilitarBorrar = 1;
        }

        // Actualizamos la posicion del carrito.
        imgDraw(tempYDraw, tempXDraw);
    }
}

function guidelines(){
	// Dibujamos las lineas guia en todo el laberinto (las paredes blancas).
    stroke(255); // Lineas blancas.
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            var x = j*w;
            var y = i*w;
            line(x, y, x + w, y);
            line(x + w, y, x + w, y + w);
            line(x + w, y + w, x, y + w);
            line(x, y + w, x, y);
        }
    }
}


// Dibujamos el carrito dependiendo de su direccion.
function imgDraw(i,j){
    if(colaCardinal == 1){
        imgNorte.resize(w, w);
        image(imgNorte, j*w, i*w);    
    }
    else if(colaCardinal == 2){
        imgSur.resize(w, w);
        image(imgSur, j*w, i*w);    
    }
    else if(colaCardinal == 4){
        imgEste.resize(w, w);
        image(imgEste, j*w, i*w);    
    }
    else if(colaCardinal == 8){
        imgOeste.resize(w, w);
        image(imgOeste, j*w, i*w);    
    }
}








/*function transladar(i,j){
    translate(j*w,i*w);
    image(img, 0, 0);
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}*/

/*function dibujar(){
    while(!(colaCoordenadasX.isEmpty())){
        sleep(2500);
    }
}*/

//PILA
function Stack (){
    this.top = 0;
    this.pila = [];
    //Metodo push para agregar un elemento a la pila
    this.push = function (elemento) 
    {
        this.pila[this.top] = elemento;
        this.top++;
    }
    //Metodo isEmpty Retorna true si la pila no esta vacia
    //  false en caso contrario
    this.isEmpty = function()
    {
        if(this.top==0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    //Metodo pop retorna el ultimo elemento de la pila en ser agregado
    this.pop = function()
    {
        if(!this.isEmpty())
        {   
            this.top--;
            return this.pila[this.top];
        }
        else{
            return null;
        }
    }
}


//PILA
function Cola (){
    this.top = 0;
    this.last = 0;
    this.cola = [];
    //Metodo push para agregar un elemento a la pila
    this.push = function (elemento) 
    {   
        this.cola[this.top] = elemento;
        this.top++;
    }
    //Metodo isEmpty Retorna true si la pila no esta vacia
    //  false en caso contrario
    this.isEmpty = function()
    {
        if(this.last==this.top)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    //Metodo pop retorna el ultimo elemento de la pila en ser agregado
    this.pop = function()
    {
        if(!this.isEmpty())
        {   
            this.last++;
            return this.cola[this.last-1];
        }
        else{
            return null;
        }
    }
}