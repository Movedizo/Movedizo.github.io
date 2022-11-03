class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
        this.fichas = new Array();
    }

    addFicha(ficha) {
        this.fichas.push(ficha);
    }
    
    getNombre() {
        return this.nombre;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    getPuntos() {
        return this.puntos;
    }

    setPuntos(puntos) {
        this.puntos = puntos;
    }

    borrarFichas() {
        this.fichas = new Array();
    }
}