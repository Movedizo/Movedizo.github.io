class Celda {
    constructor(posx, posy, contexto) {
        this.ficha = null;
        this.posx = posx;
        this.posy = posy;
        this.imagenCelda = new Image();
        this.imagenCelda.src = "img/fichaTablero.png";
        this.imagenCelda.height = 60;
        this.imagenCelda.width = 60;
        this.ctx = contexto;
        this.width = 60;
        this.height = 60;
    }

    esJugador(turno) {
        if (this.ficha != null)
            return this.ficha.getJugador() == turno;
        else
            return false;
    }
    getFicha() {
        return this.ficha;
    }
    setFicha(ficha) {
        this.ficha = ficha;
    }
    meterFicha(fichaJugador) {
        this.ficha = fichaJugador;
        fichaJugador.setPosition(this.posx + 25, this.posy + 25);
    }
    draw() {
        this.ctx.drawImage(this.imagenCelda, this.posx, this.posy, this.imagenCelda.width, this.imagenCelda.height);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    isPointInside(x, y) {
        return !(x < this.posx || x > this.posx + this.width || y < this.posy || y > this.posy + this.height)
    };

    setPosition(x, y) {
        this.posx = x;
        this.posy = y;
    }

    getPosition() {
        return {
            x: this.getPosX,
            y: this.getPosY
        };
    }

    getPosX() {
        return this.posx;
    }

    getPosY() {
        return this.posy;
    }

    libre() {
        return this.ficha == null;
    }

}