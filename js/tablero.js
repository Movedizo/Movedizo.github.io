class Tablero {
    constructor(canvasX, canvasY, tipoJuego, contexto) {
        this.tamCanvasX = canvasX;
        this.tamCanvasY = canvasY;
        this.tipoJuego = tipoJuego;
        this.ctx = contexto;
        this.celdaX = this.tamCanvasX - 780;
        this.celdaY = this.tamCanvasY - 120;
        this.celdas = new Array();
        switch (this.tipoJuego) {
            case "1":
                this.cantCeldas = 42;
                this.maxFilas = 6;
                this.maxColumas = 7;
                this.lineas = 4;
                break;
            case "2":
                this.cantCeldas = 56;
                this.maxFilas = 7;
                this.maxColumas = 8;
                this.lineas = 5;
                break;
            case "3":
                this.cantCeldas = 72;
                this.maxFilas = 8;
                this.maxColumas = 9;
                this.lineas = 6;
                break;
            default:
                break;
        }

        console.log(this.cantCeldas);
        for (let i = 0; i < this.maxColumas; i++) {
            this.celdas[i] = new Array();
        }
    }

    libre(posF, posC) {
        return this.celdas[posF][posC].libre();
    }

    meterFicha(posF, posC, fichaJugador) {
        this.celdas[posF][posC].meterFicha(fichaJugador);
    }

    cantidad(mat) {
        let cant = 0;
        for (let y = 0; y < mat.length; y++) {
            for (let index = 0; index < mat[y].length; index++) {
                cant += 1;
            }
        }
        return cant;
    }

    addCelda() {
        if (this.cantidad(this.celdas) % this.maxColumas == 0 && this.celdas[0].length != 0) {
            this.celdaX = this.celdaX - this.maxFilas * 60;
            this.celdaY = this.celdaY - 60;
        }
        else {
            this.celdaX = this.celdaX + 60;
            this.celdaY = this.celdaY;
        }
        let celda = new Celda(this.celdaX, this.celdaY, this.ctx);

        if (this.cantidad(this.celdas) < this.maxColumas)
            this.celdas[0].push(celda);
        else if (this.cantidad(this.celdas) < this.maxColumas * 2)
            this.celdas[1].push(celda);
        else if (this.cantidad(this.celdas) < this.maxColumas * 3)
            this.celdas[2].push(celda);
        else if (this.cantidad(this.celdas) < this.maxColumas * 4)
            this.celdas[3].push(celda);
        else if (this.cantidad(this.celdas) < this.maxColumas * 5)
            this.celdas[4].push(celda);
        else if (this.cantidad(this.celdas) < this.maxColumas * 6)
            this.celdas[5].push(celda);
        else if (this.cantidad(this.celdas) < this.maxColumas * 7)
            this.celdas[6].push(celda);
        else
            this.celdas[7].push(celda);
    }

    cargarTablero() {
        addCelda();
        if (celdas.length < cantCeldas) {
            setTimeout(addCelda, 10);
        }
    }

    tirarFicha(x, ficha, turno) {
        return this.colocarFicha(x, ficha, turno);
    }

    contarHorisontal(posY, posX, turno) {
        let posXoriginal = posX;
        let celda = this.celdas[posY][posX];
        let cant = 0;
        while (!celda.libre() && celda != null && celda.esJugador(turno)) {
            console.log("Entro en calculo derecha cant vale = " + cant);
            cant++;
            if (cant == this.lineas) {
                return 1;
            }
            posX++;
            if (posX < this.maxColumas){
                celda = this.celdas[posY][posX];
            }
            else
                break;
        }
        posX = posXoriginal;
        celda = this.celdas[posY][posX];
        while (!celda.libre() && celda != null && celda.esJugador(turno)) {
            console.log("Entro en calculo izquierda cant vale = " + cant);
            if (cant == this.lineas) {
                return 1;
            }
            posX--;
            if (posX >= 0)
                celda = this.celdas[posY][posX];
            else
                return 0;
            cant++;
        }
    }

    contarVertical(posY, posX, turno) {
        let posYoriginal = posY;
        let celda = this.celdas[posY][posX];
        let cant = 0;
        while (!celda.libre() && celda != null && celda.esJugador(turno)) {
            console.log("Calculo arriba cant vale = " + cant);
            cant++;
            if (cant == this.lineas) {
                return 1;
            }
            posY++;
            if (posY < this.maxFilas)
                celda = this.celdas[posY][posX];
            else
                break;
        }
        posY = posYoriginal;
        celda = this.celdas[posY][posX];
        while (!celda.libre() && celda != null && celda.esJugador(turno)) {
            console.log("Calculo abajo cant vale = " + cant);
            if (cant == this.lineas) {
                return 1;
            }
            posY--;
            if (posY >= 0)
                celda = this.celdas[posY][posX];
            else
                return 0;
            cant++;
        }
    }

    contarDiagonal(posY, posX, turno) {
        let posYoriginal = posY;
        let posXoriginal = posX;
        let celda = this.celdas[posY][posX];
        let cant = 0;
        while (!celda.libre() && celda != null && celda.esJugador(turno)) {
            console.log("Diagonal arriba cant vale = " + cant);
            cant++;
            if (cant == this.lineas) {
                return 1;
            }
            posY++;
            posX++;
            if (posY < this.maxFilas && posX < this.maxColumas)
                celda = this.celdas[posY][posX];
            else
                break;
        }
        posY = posYoriginal;
        posX = posXoriginal;
        celda = this.celdas[posY][posX];
        while (!celda.libre() && celda != null && celda.esJugador(turno)) {
            console.log("Diagonal abajo cant vale = " + cant);
            if (cant == this.lineas) {
                return 1;
            }
            posY--;
            posX--;
            if (posY >= 0 && posX >= 0)
                celda = this.celdas[posY][posX];
            else
                return 0;
            cant++;
        }
    }

    colocarFicha(x, ficha, turno) {
        let y = 0;
        while (y < this.maxFilas) {
            if (this.libre(y, x)) {
                this.meterFicha(y, x, ficha);
                ficha.setClickeable(false);
                if (this.contarHorisontal(y, x, turno) == 1 || this.contarVertical(y, x, turno) == 1 || this.contarDiagonal(y, x, turno) == 1)
                    return 1;
                else
                    return 0;
            }
            else if (!this.libre(y, x)) {
                ficha.volverPosicion();
            }
            y++;
        }
    }
    
    draw() {
        for (let i = 0; i < this.maxFilas; i++) {
            for (let x = 0; x < this.celdas[i].length; x++) {
                this.celdas[i][x].draw();
            }
        }
    }
}