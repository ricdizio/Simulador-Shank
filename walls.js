function SetWall(Pared){
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
}

function UserSetWalls(){
    if(mouseIsPressed && mouseX>=0 && mouseX<ancho && mouseY>=0 && mouseY<alto){ // Con estas condiciones garantizamos que no exista un error al clickear fuera del canvas.
        var i = Math.floor(mouseY / w);
        var j = Math.floor(mouseX / w);
        console.log(mouseX + ' ' + mouseY);
        // Dividimos imaginariamente cada casilla en 4 sectores. Si clickeamos dentro de uno de esos sectores, se marca la linea correspondiente a este sector. Cada sector mide w/4 de longitud.
        // Revisamos donde se clickeo utilizando las variables del mouse. Al mismo tiempo, si por ejemplo hay pared en la parte superior de la casilla, en la casilla de arriba debera haber pared en su lado inferior.
        // Para este ultimo caso tomamos en cuenta los casos en el borde del canvas, con cada if() dentro de las asignaciones.
        // Revisar m y n por si estan al reves.

        if(mouseY <= (i*w + w/4)){
            coord[i][j].walls[0]=1;
            if(i>0) coord[i-1][j].walls[2]=1;
        }

        else if(mouseX >= ((j+1)*w - w/4)){
            coord[i][j].walls[1]=1;
            if(j!=(n-1)) coord[i][j+1].walls[3]=1;
        }

        else if(mouseY >= ((i+1)*w - w/4)){
            coord[i][j].walls[2]=1;
            if(i!=(m-1)) coord[i+1][j].walls[0]=1;
        }

        else if(mouseX <= (j*w + w/4)){
            coord[i][j].walls[3]=1;
            if(j>0) coord[i][j-1].walls[1]=1;
        }
        stroke(0);
        PrintWalls(coord);
    }
}

function PrintWalls(objeto){
    for(var j=0; j<n; j++){
        for(var i=0; i<m; i++){
            objeto[i][j].show();
        }
    }
}