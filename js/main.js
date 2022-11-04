//document.addEventListener("DOMContentLoaded", iniciar);

document.getElementById("btnInicio").addEventListener("click", iniciar);

function iniciar() {
    "use strict"
    let nomj1 = document.getElementById("nomJ1").value;
    let nomj2 = document.getElementById("nomJ2").value;

    let fichaj1 = document.getElementById("selecFichaJ1").value;
    let fichaj2 = document.getElementById("selecFichaJ2").value;

    let tipoJuego = document.getElementById("tipoJuego").value;

    console.log(fichaj1 + " " + fichaj2 + " " + nomj1 + " " + nomj2 + " " + tipoJuego);
    let canvas = document.getElementById("miCanvas");
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let CANT_FIG = 42;
    let tablero = new Tablero(canvas.width, canvas.height, tipoJuego, ctx);
    let jugador1 = new Jugador(nomj1);
    let jugador2 = new Jugador(nomj2);
    let turno = jugador1;
    switch (tipoJuego) {
        case "1":
            CANT_FIG = 42;
            break;
        case "2":
            CANT_FIG = 56;
            break;
        case "3":
            CANT_FIG = 72;
            break;
        default:
            break;
    }
    let figuras = [];
    let lastClickedFigure = null;
    let isMouseDown = false;

    function reinicio() {
        tablero = new Tablero(canvas.width, canvas.height, tipoJuego, ctx);
        turno = jugador1;
        jugador1.borrarFichas();
        jugador2.borrarFichas();
        figuras = [];
        lastClickedFigure = null;
        isMouseDown = false;
        setTimeout(() => {
            addFiguras();
        }, 1);
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
            console.log(figuras.length +"Posicion x ficha " + element.getPosX() + " Posicion x  " + (x - 20));
            console.log("Posicion y ficha " + element.getPosY() + " Posicion y  " + (y - 193));
            //console.log(x + "  " + y);
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
       // console.log(e.layerX + "   "  + e.layerY);
        isMouseDown = true;
        let clickFig = findClickedFigure(e.layerX, e.layerY); //coordenadas de x e y adentro del canvans
        if (clickFig != null) {
            clickFig.setResaltado(true);
            lastClickedFigure = clickFig;
        }
        drawFigure();
    }

    function onMouseUp(e) {
       // console.log(e.layerX + "   "  + e.layerY);
        let cuatroEnLinea = 0;
        switch (tipoJuego) {
            case "1":
                if (lastClickedFigure != null && e.layerX >= 290 - 20 && e.layerX <= 330 - 20 && e.layerY >= 390 - 193 && e.layerY <= 450 - 193) {
                    cuatroEnLinea = tablero.tirarFicha(0, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 350 -20 && e.layerX <= 390 -20 && e.layerY >= 390 - 193 && e.layerY <= 450 - 193) {
                    cuatroEnLinea = tablero.tirarFicha(1, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 410 && e.layerX <= 450 && e.layerY >= 390 && e.layerY <= 450) {
                    cuatroEnLinea = tablero.tirarFicha(2, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 470 && e.layerX <= 510 && e.layerY >= 390 && e.layerY <= 450) {
                    cuatroEnLinea = tablero.tirarFicha(3, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 530 && e.layerX <= 570 && e.layerY >= 390 && e.layerY <= 450) {
                    cuatroEnLinea = tablero.tirarFicha(4, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 590 && e.layerX <= 630 && e.layerY >= 390 && e.layerY <= 450) {
                    cuatroEnLinea = tablero.tirarFicha(5, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 650 - 20 && e.layerX <= 790 -20 && e.layerY >= 390-193 && e.layerY <= 450- 193) {
                    cuatroEnLinea = tablero.tirarFicha(6, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null)
                    lastClickedFigure.volverPosicion();
                break;

            case "2":
                if (lastClickedFigure != null && e.layerX >= 290 && e.layerX <= 330 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(0, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 350 && e.layerX <= 390 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(1, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 410 && e.layerX <= 450 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(2, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 470 && e.layerX <= 510 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(3, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 530 && e.layerX <= 570 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(4, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 590 && e.layerX <= 630 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(5, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 650 && e.layerX <= 690 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(6, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 710 && e.layerX <= 750 && e.layerY >= 330 && e.layerY <= 390) {
                    cuatroEnLinea = tablero.tirarFicha(7, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null)
                    lastClickedFigure.volverPosicion();
                break;

            case "3":
                if (lastClickedFigure != null && e.layerX >= 290 && e.layerX <= 330 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(0, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 350 && e.layerX <= 390 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(1, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 410 && e.layerX <= 450 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(2, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 470 && e.layerX <= 510 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(3, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 530 && e.layerX <= 570 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(4, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 590 && e.layerX <= 630 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(5, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 650 && e.layerX <= 690 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(6, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 710 && e.layerX <= 750 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(7, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null && e.layerX >= 770 && e.layerX <= 810 && e.layerY >= 270 && e.layerY <= 330) {
                    cuatroEnLinea = tablero.tirarFicha(8, lastClickedFigure, turno);
                    cambiarTurno();
                }
                else if (lastClickedFigure != null)
                    lastClickedFigure.volverPosicion();
                break;
            default:
                break;
        }
        
        if (cuatroEnLinea == 1)
            reinicio();
        if (lastClickedFigure != null)
            lastClickedFigure.setResaltado(false);

        lastClickedFigure = null;
        isMouseDown = false;
        drawFigure();
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