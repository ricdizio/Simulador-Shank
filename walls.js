/*function SetWall(Pared){
    switch(Pared){
        case 0: 
            return [0,0,0,0];
            break;
        case 1: 
            return [0,0,0,1];
            break;
        case 2: 
            return [0,0,1,0];
            break;
        case 3: 
            return [0,0,1,1];
            break;
        case 4: 
            return [0,1,0,0];
            break;
        case 5: 
            return [0,1,0,1];
            break;
        case 6: 
            return [0,1,1,0];
            break;
        case 7: 
            return [0,1,1,1];
            break;
        case 8: 
            return [1,0,0,0];
            break;
        case 9: 
            return [1,0,0,1];
            break;
        case 10: 
            return [1,0,1,0];
            break;
        case 11: 
            return [1,0,1,1];
            break;
        case 12: 
            return [1,1,0,0];
            break;
        case 13: 
            return [1,1,0,1];
            break;
        case 14: 
            return [1,1,1,0];
            break;
        case 15: 
            return [1,1,1,1];
            break;
    }
}*/

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

// Comparamos todo esto porque el simulador y el shank usan posicionamiento de cardinales distintos.
function checkWall(Pared){
    //N,E,S,W
    if(compareArrays(Pared,[0,0,0,0])) return 15;
    if(compareArrays(Pared,[0,0,0,1])) return 7;
    if(compareArrays(Pared,[0,0,1,0])) return 13;
    if(compareArrays(Pared,[0,0,1,1])) return 5;
    if(compareArrays(Pared,[0,1,0,0])) return 11;
    if(compareArrays(Pared,[0,1,0,1])) return 3;
    if(compareArrays(Pared,[0,1,1,0])) return 9;
    if(compareArrays(Pared,[0,1,1,1])) return 1;
    if(compareArrays(Pared,[1,0,0,0])) return 14;
    if(compareArrays(Pared,[1,0,0,1])) return 6;
    if(compareArrays(Pared,[1,0,1,0])) return 12;
    if(compareArrays(Pared,[1,0,1,1])) return 4;
    if(compareArrays(Pared,[1,1,0,0])) return 10;
    if(compareArrays(Pared,[1,1,0,1])) return 2;
    if(compareArrays(Pared,[1,1,1,0])) return 8;
    if(compareArrays(Pared,[1,1,1,1])) return 0;
}

// Compara dos arreglos, si son verdaderos returna true.
function compareArrays(a,b){
    for(var i=0; i<a.length; i++){
        if(a[i]!=b[i]) return false;
    }
    return true;
}

// Asigna a las paredes del borde del laberinto como 1 (pareces colocadas).
function borderWalls(coordCelda){
	for(var i=0;i<m; i++){
		coordCelda[i][0].walls[3] = 1;
		coordCelda[0][i].walls[0] = 1;
		coordCelda[i][n-1].walls[1] = 1;
		coordCelda[m-1][i].walls[2] = 1;
	}
}

// En esta funcion el usuario introduce las paredes que quiere.
function userSetWalls(){
    if(mouseIsPressed && mouseX>=0 && mouseX<ancho && mouseY>=0 && mouseY<alto){ // Con estas condiciones garantizamos que no exista un error al clickear fuera del canvas.
        var i = Math.floor(mouseY / w);
        var j = Math.floor(mouseX / w);

        // Dividimos imaginariamente cada casilla en 4 sectores. Si clickeamos dentro de uno de esos sectores, se marca la linea correspondiente a este sector. Cada sector mide w/4 de longitud.
        // Revisamos donde se clickeo utilizando las variables del mouse. Al mismo tiempo, si por ejemplo hay pared en la parte superior de la casilla, en la casilla de arriba debera haber pared en su lado inferior.
        // Para este ultimo caso tomamos en cuenta los casos en el borde del canvas, con cada if() dentro de las asignaciones.
        // Revisar m y n por si estan al reves.

        if(mouseY <= (i*w + w/4)){
            coordCelda[i][j].walls[0]=!coordCelda[i][j].walls[0];
            if(i>0) coordCelda[i-1][j].walls[2]=!coordCelda[i-1][j].walls[2];
        }

        else if(mouseX >= ((j+1)*w - w/4)){
            coordCelda[i][j].walls[1]=!coordCelda[i][j].walls[1];
            if(j!=(n-1)) coordCelda[i][j+1].walls[3]=!coordCelda[i][j+1].walls[3];
        }

        else if(mouseY >= ((i+1)*w - w/4)){
            coordCelda[i][j].walls[2]=!coordCelda[i][j].walls[2];
            if(i!=(m-1)) coordCelda[i+1][j].walls[0]=!coordCelda[i+1][j].walls[0];
        }

        else if(mouseX <= (j*w + w/4)){
            coordCelda[i][j].walls[3]=!coordCelda[i][j].walls[3];
            if(j>0) coordCelda[i][j-1].walls[1]=!coordCelda[i][j-1].walls[1];
        }
        guidelines();
        stroke(0);
        printWalls(coordCelda);
    }
}

// Imprime las paredes asignadas por el usuario.
function printWalls(objeto){
    stroke(0);
    for(var j=0; j<n; j++){
        for(var i=0; i<m; i++){
            objeto[i][j].show();
        }
    }
}