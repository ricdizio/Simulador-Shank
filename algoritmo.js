// Tamaño del laberinto
var m = 6; // Filas.
var n = 6; // Columnas.

// Propiedades graficas del canvas. (800x800 como tamaño estandar).
var ancho = 600;
var alto = 600;

// Tamaño de las celdas.
var w;

var canvas = createCanvas(ancho+1,alto+1);
canvas.parent('canvas-position');
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




function setup(){
    w = AdjustCells();
    background(180);
    frameRate(10);

    // Revisar los m y n.
    var coordCelda = new Array();
    for(var i=0; i< m; i++){
        coordCelda[i]= new Array();
    }
    
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


