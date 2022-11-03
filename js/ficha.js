class Ficha {
    constructor(posx, posy, contexto, jugador, img) {//fill no es necesario
        this.posx = posx;
        this.posy = posy;
        this.posxInicial = posx;
        this.posyInicial = posy;
        this.radio = 20;
        this.resaltado = false;
        this.imagenFicha = new Image();
        this.imagenFicha.src = img;
        this.imagenFicha.height = 40;
        this.imagenFicha.width = 40;
        this.clickeable = true;
        this.ctx = contexto;
        this.jugador = jugador;
    }
    volverPosicion() {
        this.setPosition(this.posxInicial, this.posyInicial);
    }
    getJugador(){
        return this.jugador;
    }
    draw() {

        this.ctx.beginPath();
        this.ctx.arc(this.posx, this.posy, this.radio, 0, 2 * Math.PI);

        if (this.resaltado === true) {
            this.ctx.stroke();
        }
        this.ctx.closePath();
        this.ctx.drawImage(this.imagenFicha, this.posx - 20, this.posy - 20, this.imagenFicha.width, this.imagenFicha.height);
    }
    getImgFicha() {
        return this.imagenFicha.src;
    }
    getClickeable() {
        return this.clickeable;
    }
    setClickeable(boolean) {
        this.clickeable = boolean;
    }
    dibujarFicha(x, y) {

        this.ctx.drawImage(this.imagenFicha, x, y, this.imagenFicha.width, this.imagenFicha.height);
    }

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let _x = this.posx - x;
        let _y = this.posy - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }


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


    setResaltado(boolean) {
        this.resaltado = boolean;
    }
}