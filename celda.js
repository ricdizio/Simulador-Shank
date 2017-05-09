function Celda(i,j){
    this.i=i;
    this.j=j;
    this.walls = [0,0,0,0]; // 1 hay pared, 0 no. ARRIBA, DERECHA, ABAJO, IZQUIERDA

    // Si la celda especifica es 1, la dibujamos.
    this.show= function(){
        var x = this.j*w;
        var y = this.i*w;
        if (this.walls[0]) {
          line(x, y, x + w, y);
        }
        if (this.walls[1]) {
          line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
          line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
          line(x, y + w, x, y);
        }
    }
}


function adjustCells(){
	// Ajustamos la dimension de las celdas, eligiendo la mas pequeña segun el tamaño del laberinto.
    var wx = Math.floor(ancho / m);
    var wy = Math.floor(alto / n);
    if(wx<wy) return wx;
    else return wy;
}