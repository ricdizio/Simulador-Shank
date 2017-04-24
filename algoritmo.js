// Tamaño del laberinto
var m = 6; // Filas.
var n = 6; // Columnas.

// Propiedades graficas del canvas. (800x800 como tamaño estandar).
var ancho = 600;
var alto = 600;

// Tamaño de las celdas.
var w = AdjustCells();
var WallsReady = 0;
var actual; // Posicion actual;


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


var MazeWalls = [
    [9,10,10,10,13,12],
    [5,0,0,0,0,5],
    [5,0,9,12,0,5],
    [1,8,2,6,0,4],
    [7,0,0,0,0,13],
    [3,2,10,10,10,6],
];*/


// Revisar los m y n.
var coord = new Array();
for(var i=0; i< m; i++){
    coord[i]= new Array();
}


function setup(){
    var canvas = createCanvas(ancho+1,alto+1);
    canvas.parent('canvas-position');
    background(180);
    frameRate(10);

    // Creamos los objetos.
    for(var i=0; i<m; i++){
        for(var j=0; j<n; j++){
            var celda = new Celda(i,j);
            coord[i][j] = celda;
        }
    }

    // Posicion actual del carrito.
    actual = coord[0][0];
    // Dibujamos las lineas guias para que el usuario dibuje su laberinto.
    LineasGuia();
    stroke(0);
    BorderWalls(coord);
    PrintWalls(coord);
}


function draw(){ // este es el main
    // Llamamos la funcion que permite al usuario dibujar el laberinto.
    // Esta funcion de UserSetWalls debe estar en un while hasta que presionemos un boton (aun no he creado eso).
    UserSetWalls(coord);

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