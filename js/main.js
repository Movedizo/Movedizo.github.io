
document.getElementById("btnInicio").addEventListener("click", iniciar);
//btnInicio = addEventListener("click", iniciar);
let cartelFinPartida = document.getElementById("cartelFinPartida");
let cartelFinMensaje = document.getElementById("cartelFinMensaje");
let cartelFinGanador = document.getElementById("cartelFinGanador");

function iniciar() {
    "use strict"
    cartelFinPartida.classList.add("decaparecer");
    cartelFinPartida.classList.remove("cartelFinPartida");
    document.getElementById("btnInicio").classList.add("desaparecer");
    let nomj1 = document.getElementById("nomJ1").value;
    let nomj2 = document.getElementById("nomJ2").value;

    let fichaj1 = document.getElementById("selecFichaJ1").value;
    let fichaj2 = document.getElementById("selecFichaJ2").value;

    let tipoJuego = document.getElementById("tipoJuego").value;
    let btnReinicio = document.getElementById("btnReinicio");
    let btnReinicio2 = document.getElementById("btnReinicio2");

    btnReinicio.classList.remove("desaparecer");
    btnReinicio.addEventListener("click", reinicio);
    btnReinicio2.addEventListener("click", reinicio);

    let temporizador = document.getElementById("temporizador");
    let canvas = document.getElementById("miCanvas");
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let CANT_FIG = 42;
    let tablero = new Tablero(canvas.width, canvas.height, tipoJuego, ctx);
    let jugador1 = new Jugador(nomj1);
    let jugador2 = new Jugador(nomj2);
    let turno = jugador1;
    let limiteTiempo = 0;
    switch (tipoJuego) {
        case "1":
            CANT_FIG = 42;
            limiteTiempo = 5;
            break;
        case "2":
            CANT_FIG = 56;
            limiteTiempo = 7;
            break;
        case "3":
            CANT_FIG = 72;
            limiteTiempo = 9;
            break;
        default:
            break;
    }
    let figuras = [];
    let lastClickedFigure = null;
    let isMouseDown = false;
    let seg = 0;
    let min = limiteTiempo;

    function reinicio() {
        btnReinicio.classList.remove("desaparecer");
        cartelFinPartida.classList.add("decaparecer");
        cartelFinPartida.classList.remove("cartelFinPartida");
        tablero = new Tablero(canvas.width, canvas.height, tipoJuego, ctx);
        turno = jugador1;
        jugador1.borrarFichas();
        jugador2.borrarFichas();
        figuras = [];
        lastClickedFigure = null;
        isMouseDown = false;
        seg = 0;
        min = limiteTiempo;
        setTimeout(() => {
            addFiguras();
        }, 1);
        contar();
    }

    function addFigura() {
        tablero.addCelda();
        addFicha();
        drawFigure();
    }

    function addFiguras() {
        addFigura();
        if (figuras.length < CANT_FIG) {
            setTimeout(addFiguras, 1);
        }
    }

    setTimeout(() => {
        addFiguras();
    }, 1);
    contar();
    function contar() {
        if (seg < 10)
            temporizador.value = "0" + min + ":0" + seg;
        else
            temporizador.value = "0" + min + ":" + seg;
        if (seg == 0) {
            seg = 59;
            min--;
        }
        else
            seg--;
        setTimeout(() => {
            if (!(seg == 0 && min == 0))
                contar();
        }, 1000);
        if (seg == 0 && min == 0) {
            cartelFinPartida.classList.remove("decaparecer");
            cartelFinPartida.classList.add("cartelFinPartida");
            cartelFinMensaje.innerHTML = "Se agoto el tiempo";
            cartelFinGanador.innerHTML = "Es un empate";
            btnReinicio.classList.add("desaparecer");
        }
    }

    function addFicha() {
        let posX = 0;
        let posY = 0;
        let img = "img/fichaSpartan.png";
        let ficha = new Ficha(posX, posY, ctx, jugador1);
        if (figuras.length < (CANT_FIG / 2)) {
            posX = Math.round(Math.random() * (80 - 40) + 40);
            posY = canvasHeight - Math.round(Math.random() * (80 - 40) + 40);
            img = fichaj1;
            ficha = new Ficha(posX, posY, ctx, jugador1, img);
            jugador1.addFicha(ficha);
            console.log(posX + "  " + posY);
        }

        else {
            posX = canvasWidth - Math.round(Math.random() * (80 - 40) + 40);
            posY = canvasHeight - Math.round(Math.random() * (80 - 40) + 40);
            img = fichaj2;
            ficha = new Ficha(posX, posY, ctx, jugador2, img);
            jugador2.addFicha(ficha);
        }
        figuras.push(ficha);
    }

    function drawFigure() {
        clearCanvas();
        tablero.draw();
        for (let index = 0; index < figuras.length; index++) {
            figuras[figuras.length - 1 - index].draw();
        }
    }

    function clearCanvas() {
        ctx.fillStyle = '#F8F8FF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function findClickedFigure(x, y) {
        for (let index = 0; index < figuras.length; index++) {
            const element = figuras[index];
            if (element.isPointInside(x - 20, y - 193) && element.getClickeable() && turno == element.getJugador()) {
                return element;
            }
        }
    }

    function cambiarTurno() {
        if (turno == jugador1) {
            turno = jugador2;
        }
        else
            turno = jugador1;
    }

    function onMouseDown(e) {
        console.log(e.layerX + " x    y " + e.layerY);
        isMouseDown = true;
        let clickFig = findClickedFigure(e.layerX, e.layerY); //coordenadas de x e y adentro del canvans
        if (clickFig != null) {
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;
        }
        drawFigure();
    }

    function onMouseUp(e) {
        let cuatroEnLinea = 0;
        switch (tipoJuego) {
            case "1":
                if (lastClickedFigure != null && e.layerX >= 210 && e.layerX <= 250 && e.layerY >= 300 && e.layerY <= 375) {
                    cuatroEnLinea = tablero.tirarFicha(0, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 270 && e.layerX <= 310 && e.layerY >= 300 && e.layerY <= 375) {
                    cuatroEnLinea = tablero.tirarFicha(1, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 330 && e.layerX <= 370 && e.layerY >= 300 && e.layerY <= 375) {
                    cuatroEnLinea = tablero.tirarFicha(2, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 390 && e.layerX <= 430 && e.layerY >= 300 && e.layerY <= 375) {
                    cuatroEnLinea = tablero.tirarFicha(3, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 450 && e.layerX <= 490 && e.layerY >= 300 && e.layerY <= 375) {
                    cuatroEnLinea = tablero.tirarFicha(4, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 510 && e.layerX <= 550 && e.layerY >= 300 && e.layerY <= 375) {
                    cuatroEnLinea = tablero.tirarFicha(5, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 570 && e.layerX <= 610 && e.layerY >= 300 && e.layerY <= 375) {
                    cuatroEnLinea = tablero.tirarFicha(6, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null)
                    lastClickedFigure.volverPosicion();
                break;

            case "2":
                if (lastClickedFigure != null && e.layerX >= 210 && e.layerX <= 250 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(0, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 270 && e.layerX <= 310 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(1, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 330 && e.layerX <= 370 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(2, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 390 && e.layerX <= 430 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(3, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 450 && e.layerX <= 490 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(4, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 510 && e.layerX <= 550 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(5, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 570 && e.layerX <= 610 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(6, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 630 && e.layerX <= 670 && e.layerY >= 235 && e.layerY <= 310) {
                    cuatroEnLinea = tablero.tirarFicha(7, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null)
                    lastClickedFigure.volverPosicion();
                break;

            case "3":
                if (lastClickedFigure != null && e.layerX >= 210 && e.layerX <= 250 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(0, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 270 && e.layerX <= 310 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(1, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 330 && e.layerX <= 370 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(2, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 390 && e.layerX <= 430 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(3, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 450 && e.layerX <= 490 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(4, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 510 && e.layerX <= 550 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(5, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 570 && e.layerX <= 610 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(6, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 630 && e.layerX <= 670 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(7, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 690 && e.layerX <= 730 && e.layerY >= 175 && e.layerY <= 250) {
                    cuatroEnLinea = tablero.tirarFicha(8, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null)
                    lastClickedFigure.volverPosicion();
                break;
            default:
                break;
        }

        lastClickedFigure = null;
        isMouseDown = false;
        drawFigure();
        if (cuatroEnLinea == 1) {
            if (!(seg == 0 && min == 0))
                cartelFinPartida.classList.remove("decaparecer");
            cartelFinPartida.classList.add("cartelFinPartida");
            cartelFinMensaje.innerHTML = "Felicitaciones";
            if (turno == jugador1)
                cartelFinGanador.innerHTML = "Gano el jugador: " + jugador2.getNombre();
            else
                cartelFinGanador.innerHTML = "Gano el jugador: " + jugador1.getNombre();
            btnReinicio.classList.add("desaparecer");

        }
        
        //reinicio();
        if (lastClickedFigure != null)
            lastClickedFigure.setResaltado(false);
        /*if(tablero.checkGanador()){
            reinicio();
        }*/
    }

    function onMouseMove(e) {
        if (isMouseDown && lastClickedFigure != null && e.layerX >= 0 && e.layerX <= 1000 && e.layerY >= 0 && e.layerY <= 800) {
            lastClickedFigure.setPosition(e.layerX - 20, e.layerY - 193);
            drawFigure();
        }
    }

    canvas.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
}