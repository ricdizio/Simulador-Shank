
/*
Name:    Shank.js
Description:    Micromouse Version JavaScript 
Created:    15/04/2017 9:51:42 AM
Last update: 17/04/2017 5:03:42 PM
Author:     Ricardo Di Zio
            Gabriel Noya
*/



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

function coord()
{
	this.x;
	this.y;
}

function entry()
{
	this.distancia;
	this.walls;
}

function instruction()
{
	this.desiredPos;
	this.desiredHeading;
}


//Coordenadas ejes Globales
//funcion terminado
//MODIFICAR SEGUN LA DIMENSION DEL MAZE
var destino = [ [2,2],[2,3],[3,2],[3,3] ];
var X = 6;
var Y = 6;

// coordenada de inicio
var inicio = new coord();
inicio.x = 0;
inicio.y = 0;

// Cardinal
var cardinalGlobal = 4;

//Cardinales N,S,E,W
var cardinales= [ 1,2,4,8 ];
//var cardinales= ['north','south','east','west'];

//Coordenada actual global
var coord_actual_global = new coord();
coord_actual_global.x = 0;
coord_actual_global.y = 0;

/*
//Instrucciones de navegacion
var instrucciones = new instruction;
var ListaNavegacion = new queue;
*/

// Constantes de LEDS
var Media_L = 1, DiagonalD = 1, DiagonalI = 1, DelanteroD = 1, DelanteroI = 1, ParedD = 1, ParedI = 1;

// inicamos maze

function Create2DArray(X) {
  var arr = [];
  for (var i=0;i<X;i++) {
     arr[i] = [];
  }
  return arr;
}
var maze = Create2DArray(X);


//Coordenadas GLobales
var globalCoord = new coord;
var globalEnd = new coord;
globalCoord.x = 0;
globalCoord.y = 0;
globalEnd.x = 0;
globalEnd.y = 0;


function iniciar_maze() {
  maze = Create2DArray(X);
  var j;
  var i;
  for(i = 0; i<Y; i++){
  	  for(j = 0; j<X; j++){
  	    maze[i][j] = new entry;
  	  }
  }
  maze[0][0].walls = 6;
  maze[Y - 1][0].walls = 5;
  maze[0][X - 1].walls = 10;
  maze[X - 1][Y - 1].walls = 9;
  for (j = 0; j<Y; j++) {
    for (i = 0; i<X; i++) {
      maze[j][i].distancia = calcCentro(i, j, X);
      if (j != 0 && j != Y - 1 && i != 0 && i != X - 1) {
        maze[j][i].walls = 15;
      }
      //Si es la columna izquierda (0,x)
      if (i == 0 && j != 0 && j != Y - 1) {
        maze[j][i].walls = 7;
      }
      //Si es la fila superior
      if (j == 0 && i != 0 && i != X - 1) {
        maze[j][i].walls = 14;
      }
      //si es la fila inferior
      if (j == (Y - 1) && i != X - 1 && i != 0) {
        maze[j][i].walls = 13;
      }
      //Si es la columna de la derecha
      if (i == (X - 1) && j != Y - 1 && j != 0) {
        maze[j][i].walls = 11;
      }
    }
  }
}

// Calcular distacia al centro 
function calcCentro(posx,posy,dim) 
{
  var centro = dim / 2;
  var dist = 0;
  if (posy<centro) {
    if (posx<centro) {
      //Si estas en la esquina superior izquierda del maze
      dist = calcDist(posx, posy, (centro - 1), (centro - 1));
    }
    else {
      //Si estas en la esquina superior derecha del maze
      dist = calcDist(posx, posy, centro, (centro - 1));
    }
  }
  else {
    if (posx >= centro) {
      //Si estás en la parte inferior derecha del maze
      dist = calcDist(posx, posy, centro, centro);
    }
    else {
      //Si estás en la parte inferior izquierda del maze
      dist = calcDist(posx, posy, (centro - 1), centro);
    }
  }
  return dist;
}

//Calcula la distancia mas optima entre dos puntos en el arreglo sin paredes
function calcDist(posx,posy,destinoX,destinoY) {
  var dist = (Math.abs(destinoY - posy) + Math.abs(destinoX - posx));
  return dist;
}

function printMazewalls(){
  for(var j=0; j<Y; j++){
  	var temp = new Array();
    for(var i=0; i<X; i++){
      temp[i] = maze[j][i].walls;
    }
    console.log(temp);
  }
}

function printMazedistancia(){
  for(var j=0; j<Y; j++){
  	var temp = new Array();
    for(var i=0; i<X; i++){
      temp[i] = maze[j][i].distancia;
    }
    console.log(temp);
  }
}
/*
console.log("Distancia");
printMazedistancia();
console.log("Paredes");
printMazewalls();
*/

//Chequear con las esquinas si la coordenada esta dentro o fuera del maze
//Si la coordena esta fuera del maze chequear_esquina retorna false

function chequear_esquina(actual) {
  if ((actual.x >= X) || (actual.y >= Y) || (actual.x < 0) || (actual.y < 0)) {
    return false;
  }
  else {
    return true;
  }
}

//INPUT: Coordenada actual ,  cardinal
//OUTPUT: Coordenada 
function coordVecina(actual,cardinal) {
  var sig_coord = new coord(); 
  sig_coord.x = 0;
  sig_coord.y = 0;
  switch (cardinal) {
	  case 1:
	    //Me dirijo hacia el Norte
	    sig_coord.x = actual.x;
	    sig_coord.y = actual.y - 1;
	    break;
	  case 2:
	    //Me dirijo hacia el Sur
	    sig_coord.x = actual.x;
	    sig_coord.y = actual.y + 1;
	    break;
	  case 4:
	    //Me dirijo hacia el Este
	    sig_coord.x = actual.x + 1;
	    sig_coord.y = actual.y;
	    break;
	  case 8:
	    //Me dirijo hacia el Oeste
	    sig_coord.x = actual.x - 1;
	    sig_coord.y = actual.y;
	    break;
  }
  return sig_coord;
}



/*
INPUT: void
OUTOUT: Retorna un int que indica las paredes de la casilla actual
*/

function Haypared() {
  // Intercambiar x  por y si no funciona
  console.log("global en x: "+coord_actual_global.x + " global en y: " + coord_actual_global.y);
  var casilla = checkWall(coordCelda[coord_actual_global.y][coord_actual_global.x].walls);
  return casilla;
}

/*
INPUT: Coordenada actual , cardinal
OUTPUT: Optima direccion en funcion de la coordenada.
*/

function orientar(actual,cardinal) {
	var sig_menor = new coord();
	sig_menor.x = 0;
	sig_menor.y = 0;  
	//El valor mas largo posible (dimension de la matriz)
	var sig_menor_val = X*Y;
	var sig_dir = cardinal;
	//Si al frente esta disponible seguir
	if ((maze[actual.y][actual.x].walls & cardinal) != 0){
		var sig_temp = new coord();
	    sig_temp = coordVecina(actual, cardinal);    
	    if(chequear_esquina(sig_temp)){
	    	sig_menor = sig_temp;
	    	sig_menor_val = maze[sig_menor.y][sig_menor.x].distancia;
	    }
	}
  
	for (var i = 0; i<cardinales.length; i++) {
		var dir = cardinales[i];
    	//Si la direccion es accesible
    	if ((maze[actual.y][actual.x].walls & dir) != 0) {    
      		//definimos la coord para la direccion
      		var dirCoord = new coord();
      		dirCoord = coordVecina(actual, dir);
     		//Chequeo Direcciones disponibles
     		if (chequear_esquina(dirCoord)) {
        		//Si este direccion es más óptima que continuar recto
        		if (maze[dirCoord.y][dirCoord.x].distancia < sig_menor_val) {
          			//actualiza el sig menor valor disponible
          			sig_menor_val = maze[dirCoord.y][dirCoord.x].distancia;
          			//actualiza el valor de sig menor a la direccion
          			sig_menor = dirCoord;
          			sig_dir = dir;
          			console.log("Siguente direccion posible del for: " + sig_dir);
        		}
      		}
    	}
  	}
  	console.log("Cardinal actual: " + cardinal);
  	return sig_dir;
}

/*
INPUT: coordenada y byte con la informacion de las paredes actuales
OUTPUT: Actualiza el maze con el valor correspondiente segun si hay pared
*/

function actualizar_coord(coordenada,pared) {
  if (chequear_esquina(coordenada)) {
    if ((maze[coordenada.y][coordenada.x].walls & pared) != 0) {
      maze[coordenada.y][coordenada.x].walls = maze[coordenada.y][coordenada.x].walls - pared;
    }
  }
}

function terminado(coordenada, llegada){
	//MODIFICAR SEGUN LA DIMENSION DEL MAZE
	//var llegada = [ [2,2],[2,3],[3,2],[3,3] ];
	var meta = new Array();
	for (var i = 0; i<llegada.length; i++){
		meta[i] = new coord();
		for (var j = 0; j<2; j++){
			if(j==0) {
        meta[i].x = llegada[i][j];
      }
			else {
        meta[i].y = llegada[i][j];
      }
		}
    
	}
	var fin = false;
	for (var i = 0; i<llegada.length; i++) {
		var sig = new coord();
	    sig = meta[i];
	    if (chequear_esquina(coordenada)) {
	      if ((coordenada.x == sig.x) && (coordenada.y == sig.y)) {
	        fin = true;
	      }
	    }
	}
	return fin;
}

function retorno(coordenada,global){
  for(var j = 0; j<Y; j++){
    for(var i = 0; i<X; i++){
      maze[j][i].distancia = calcDist(i, j, 0, 0);
    }
  }

  //var puntos = [ [X/2-1,Y/2-1],[X/2,Y/2-1],[X/2-1,Y/2],[X/2,Y/2] ];
  maze[X/2-1][Y/2-1].distancia = X*Y;
  maze[X/2][Y/2-1].distancia = X*Y;
  maze[X/2-1][Y/2].distancia = X*Y;
  maze[X/2][Y/2].distancia = X*Y;
  console.log("matriz paredes");
  printMazewalls();
  console.log("matriz distancia");
  printMazedistancia();

  /*
  //Entrada por Sur/Este
  if ( (global.x==(X/2))&& (global.y==(Y/2)) ){
    //Si entra de sur a norte
    if(cardinalGlobal==1){
      maze[global.x][global.y].distancia = maze[global.x][(global.y)+1].distancia + 1;
      maze[global.x][global.y-1].distancia = maze[global.x][global.y].distancia + 1;
      maze[global.x-1][global.y].distancia = maze[global.x][global.y].distancia + 1;
      maze[global.x-1][global.y-1].distancia = maze[global.x][global.y].distancia + 2;
    }
    //Si entra de este a oeste
    else if(cardinalGlobal==8){
      maze[global.x][global.y].distancia = maze[global.x][(global.y)+1].distancia + 1;
      maze[global.x][global.y-1].distancia = maze[global.x][global.y].distancia + 1;
      maze[global.x-1][global.y].distancia = maze[global.x][global.y].distancia + 1;
      maze[global.x-1][global.y-1].distancia = maze[global.x][global.y].distancia + 2;
    }
  }

  //Entrada por Oeste/Este
  else if( (global.x==(X/2)-1)&& (global.y==(Y/2)) ){

    // si entra de sur a norte
    if(cardinalGlobal==1){
      maze[global.x][global.y].distancia = maze[global.x][(global.y)+1].distancia + 1;
      maze[(global.x)+1][global.y].distancia = maze[global.x][global.y].distancia + 1;
      maze[global.x][(global.y)-1].distancia = maze[global.x][global.y].distancia + 2;
    }
    else if(cardinalGlobal==1)
    maze[global.x][global.y].distancia = maze[(global.x)+1][global.y].distancia + 1;
    maze[global.x+1][global.y].distancia = maze[global.x][global.y].distancia +1;
    maze[global.x+1][global.y-1].distancia = maze[global.x][global.y].distancia +2;
  }
  //entrada por Sur/norte
  else if( (global.x==(X/2))&& (global.y==(Y/2)-1) ){
    maze[global.x][global.y+1].distancia = maze[global.x][global.y].distancia +1;
    maze[global.x-1][global.y].distancia = maze[global.x][global.y].distancia +1;
    maze[global.x-1][global.y+1].distancia = maze[global.x][global.y].distancia +2;
  }

  //entrada por Oeste / Norte
  else if( (global.x==(X/2)-1)&& (global.y==(Y/2)-1) ){
    maze[global.x][global.y+1].distancia = maze[global.x][global.y].distancia +1;
    maze[global.x+1][global.y].distancia = maze[global.x][global.y].distancia +1;
    maze[global.x+1][global.y+1].distancia = maze[global.x][global.y].distancia +2;
  }
  console.log("matriz paredes");
  printMazewalls();
  console.log("matriz distancia");
  printMazedistancia();

*/
}
/*
function Medir (x) { 
  // Wait for user's response. 
  var valor = readlineSync.question('Valor: ');
  console.log('valor introducido ' + valor + '!');
  return valor;
}

  medir(1) sensor frente
  medir(3) sensor derecho
  medir(4) sensor izquierdo



*/


/*
INPUT: Coord
OUTPUT: un entero dice la distancia menor de todos los vecinos disponibles
*/
function chequear_vecinos(coordenada) {
  var minVal = X*Y;
  for (var i = 0; i<cardinales.length; i++) {
    var dir = cardinales[i];
    //si la direccion es accesible 
    if ((maze[coordenada.y][coordenada.x].walls & dir) != 0) {
      //Obetener la coordenada de la direccion
      var coordenada_vecina = new coord();
      coordenada_vecina = coordVecina(coordenada, dir);
      //Chequeamos que la coordenada esta dentro del tamano del maze
      if (chequear_esquina(coordenada_vecina)) {
        //si el vecino es uno menos que el actual, almacenar el min
        //Si el minimo es muy grande, probar otro camino
        if (maze[coordenada_vecina.y][coordenada_vecina.x].distancia < minVal) { 
          minVal = maze[coordenada_vecina.y][coordenada_vecina.x].distancia; 
        }
      }
    }
  }
  return minVal;
}


/*
INPUT: Coordenada actual del mouse
OUTPUT: Maze actualizado con las paredes
*/

function floodFillUpdate(actual,destino,movimiento) {
	// Pila con las coordenadas
	var coordenadas = new Stack();
	if(movimiento){
		maze[actual.y][actual.x].walls = Haypared();
	}
	//maze[actual.y][actual.x].visitado = 1;
	coordenadas.push(actual); 
	for (var i = 0; i<cardinales.length; i++) {
		var dir = cardinales[i];
    	//Si no hay pared en esta coordenada
    	if ((maze[actual.y][actual.x].walls & dir) == 0) {
	      	//Coordenada temporal
	      	var workingCoord = new coord();
	      	workingCoord.x = actual.x;
	      	workingCoord.y = actual.y;
	      	switch (dir) {
	      		case 1:
	        		workingCoord.y = workingCoord.y - 1;
	        		actualizar_coord(workingCoord, 2);
	        		break;
	      		case 2:
	        		workingCoord.y = workingCoord.y + 1;
	        		actualizar_coord(workingCoord, 1);
	        		break;
	      		case 4:
	        		workingCoord.x = workingCoord.x + 1;
	        		actualizar_coord(workingCoord, 8);
	        		break;
	      		case 8:
	        		workingCoord.x = workingCoord.x - 1;
	        		actualizar_coord(workingCoord, 4);
	        		break;
	      	}
	      	//Si la celda tiene una coordenada valida y la coordenada no es la meta push en la pila
	      	if (chequear_esquina(workingCoord) && (!terminado(workingCoord,destino))) {
	        	coordenadas.push(workingCoord);
	        	//console.log("Coordenada del workingCoord: " + workingCoord.x + " " + workingCoord.y);
	      	}
	    }
  	}
  	//Mientras la pila no este vacia (tenga coordenadas por actualizar)
  	while (!coordenadas.isEmpty()) {
    	//Remuevo el ultimo elemento de la pila
    	var celda = coordenadas.pop();
    	var vecino_chequear = chequear_vecinos(celda);
    	//Regla del flood fill
    	if (vecino_chequear + 1 != maze[celda.y][celda.x].distancia) {
     		maze[celda.y][celda.x].distancia = vecino_chequear + 1;
      		for (var i = 0; i<cardinales.length; i++) {
        		var dir = cardinales[i];
        		if ((maze[celda.y][celda.x].walls & dir) != 0) {
          			var sig_coord = coordVecina(celda, dir);
          			if (chequear_esquina(sig_coord)) {
            			if (!terminado(sig_coord,destino)) {
              				coordenadas.push(sig_coord);
            			}
          			}
        		}
      		}
    	}
  	}
}


// ##### Flood Fill ####
// FUNCION PRINCIPAL FLOOD FILL

function flood_fill(destino,actual,movimiento) {
	var coord_actual = new coord();
	coord_actual = actual;
	var cardinal = cardinalGlobal;
	var sig_cardinal;
	/* Norte / Sur / Este / Oeste
	* 1 = N
	* 4 = E
	* 2 = S
	* 8 = W
	*/
	//Mientras no este en la meta !(0) actualizar el maze y moverse a las casillas sig
	while (maze[coord_actual.y][coord_actual.x].distancia != 0) {
		floodFillUpdate(coord_actual, destino, movimiento);
   		sig_cardinal = orientar(coord_actual, cardinal);
   		console.log("decision posible: " + sig_cardinal);
   		var sig_coordenada = coordVecina(coord_actual, sig_cardinal);
    	//console.log("pos x: " + sig_coordenada.x);
    	//console.log("pos y: " + sig_coordenada.y);
    	if (movimiento) {
     		 /*
      		crear_instrucciones(actual, sig_cardinal);
      		ejercutar_instrucciones(cola);
      		*/
      		var i = 1;
    	}
    	//Actualizar el valor para las siguientes entradas del loop
    	//coord_actual = sig_coordenada;
    	cardinal = sig_cardinal;
    	coord_actual = sig_coordenada;
    	if (movimiento) {
      		cardinalGlobal = cardinal;
      		globalCoord = coord_actual;
    	}
    	printMazewalls();
    	//printMazedistancia();
      coord_actual_global.x = coord_actual.x;
      coord_actual_global.y = coord_actual.y;

      
      //setTimeout(imgDraw(coord_actual_global.y,coord_actual_global.x),2500);
      colaCoordenadasX.push(coord_actual_global.x);
      colaCoordenadasY.push(coord_actual_global.y);
      colaCardinalGlobal.push(cardinalGlobal);
    	console.log("Valor cardinal: " + cardinalGlobal);
    	console.log("Valor coord actual x: " + coord_actual.x);
    	console.log("Valor coord actual y: " + coord_actual.y);
  	}
  	//colocar el globalend como la posicion actual.
  	globalEnd = coord_actual;
}

//Reiniciar distancias
function reiniciar_maze(){
  for(var j = 0; j<Y; j++){
    for(var i = 0; i<X; i++){
      maze[j][i].distancia = calcCentro(i, j, X);
    }
  }
}

function reflood(meta){
  //Colocar distancia en inicial pero ahora el maze tiene las paredes almacenadas
  reiniciar_maze();
  
  //Run flood fill but without actual motion
  var actual = new coord();
  actual.x = 0;
  actual.y = 0;
  flood_fill(meta, actual, false);
  
  //El mouse permanece en el inicio del maze pero con la distancia mas optima
  
  //creamos cola de velocidad
  //crear_cola_velocidad();
  
  //Ejecutar instrucciones
  //ejecutar_instrcciones(); 
  
}

function iniciar() {
  console.log("se prendiooooo");
  printMazedistancia();
  printMazewalls();
  //Flood fill	
  flood_fill(destino, globalCoord, true);
  console.log("Llegue al centro, Inicio Retorno");
 	//Nuevo punto a retorno ( Inicio)
 	var inicio = [[0,0]];
 	retorno(inicio, globalCoord);
  flood_fill(inicio, globalCoord, true);
}

