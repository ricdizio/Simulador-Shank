// Tamaño del laberinto
var m = 6; // Filas.
var n = 6; // Columnas.

// Propiedades graficas del canvas. (800x800 como tamaño estandar).
var ancho = 600;
var alto = 600;

// Tamaño de las celdas.
var w;
var img;
var enabler=0;
var colaX = 0;
var colaY = 0;
var tempXDraw = 0;
var tempYDraw = 0;
var GlobalTemp = 1;
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


// Revisar los m y n.
var coordCelda = new Array();
    for(var i=0; i< m; i++){
        coordCelda[i]= new Array();
    }

function preload() {
  img = loadImage("./base.png");
}


function setup(){
    for(var i=0; i< m; i++){
        coordCelda[i]= new Array();
    }

    var canvas = createCanvas(ancho+1,alto+1);

    canvas.parent('canvas-position');
    w = AdjustCells();
    loadImage("./base.png", function(img) {
        imgDraw(0,0); 
    });
    background(180);
    frameRate(10);
    // Creamos los objetos.
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            var celda = new Celda(i,j);
            coordCelda[i][j] = celda;
        }
    }
    // Posicion actual del carrito.
    //actual = coordCelda[0][0];
    // Dibujamos las lineas guias para que el usuario dibuje su laberinto.
    LineasGuia();
    stroke(0);
    BorderWalls(coordCelda);
    PrintWalls(coordCelda);
}


function draw(){ // este es el main
    // Llamamos la funcion que permite al usuario dibujar el laberinto.
    // Esta funcion de UserSetWalls debe estar en un while hasta que presionemos un boton (aun no he creado eso).
    UserSetWalls(coordCelda);

    if(enabler==1  && GlobalTemp==1){
        // Borrar celda vieja.
        noStroke();
        fill(180);
        rect((tempXDraw*w),(tempYDraw*w),w,w);
        LineasGuia();
        stroke(0);
        PrintWalls(coordCelda);

        if(tempXDraw==colaX && tempYDraw==colaY){
            if(colaCoordenadasX.isEmpty()==1) {
                console.log("GlobalTemp 0");
                GlobalTemp=0;
            }
            else{
                console.log("Actualizando colas");
                colaX = colaCoordenadasX.pop();
                colaY = colaCoordenadasY.pop();
            }
        }

        if(tempXDraw!=colaX){
            GlobalTemp=1;
            if(tempXDraw<colaX){
                tempXDraw = Math.round((tempXDraw + 0.2)*100)/100;
            }
            else{
                tempXDraw = Math.round((tempXDraw - 0.2)*100)/100;
            }
        }
        if(tempYDraw!=colaY){
            GlobalTemp=1;
            if(tempYDraw<colaY){
                tempYDraw = Math.round((tempYDraw + 0.2)*100)/100;
            }
            else{
                tempYDraw = Math.round((tempYDraw - 0.2)*100)/100;
            }
        }
        if(GlobalTemp==0 && colaX != 0 && colaY != 0) alert("Llegaste al centro del laberinto"); // Cuidado con el 0 0
        console.log("Global Temp:" + GlobalTemp);
        console.log("colaX:" + colaX + " colaY: " + colaY);
        console.log("tempx: " + tempXDraw + " tempy: " + tempYDraw);
        imgDraw(tempYDraw,tempXDraw);
    }

    // Resolver el laberinto.
}

function LineasGuia(){
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


function imgDraw(i,j){
    img.resize(w, w);
    image(img, j*w, i*w);   
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