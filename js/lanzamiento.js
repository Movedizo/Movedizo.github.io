document.addEventListener("DOMContentLoaded", iniciarindex);

function iniciarindex() {
    "use strict"
    document.querySelector('#btnUsuario').addEventListener("click", function () {
        document.querySelector('#menuHamburguesa').classList.toggle("desaparecer");
        document.querySelector('#menuPerfil').classList.toggle("desaparecer");
    });
    /*
    document.querySelector('#btnHamburguesa').addEventListener("click", function () {
        document.querySelector('#menuPerfil').classList.add("desaparecer");
        document.querySelector('#menuHamburguesa').classList.toggle("desaparecer");
    });*/

    let linksDesplegables = document.querySelectorAll(".linkDesplegable");
    document.querySelector('#btnHamburguesa').addEventListener("click", traerMenu);


    let num = 0;
    let top = 114;

    function traerMenu() {
        if (controlTraerMenu(linksDesplegables)) {
            if (num < linksDesplegables.length) {
                linksDesplegables[num].classList.remove("aparecerMenu");
                linksDesplegables[num].classList.add("desaparecerMenu");
                linksDesplegables[num].style.top = top + "px";
                setTimeout(traerMenu, 500);
                top += 25;
                num++;
            }
            else {
                num = 0;
                top = 114;
            }
        }
        else if (!controlTraerMenu(linksDesplegables)) {
            if (num < linksDesplegables.length) {
                linksDesplegables[num].classList.remove("desaparecerMenu");
                linksDesplegables[num].classList.add("aparecerMenu");
                linksDesplegables[num].style.top = top + "px";
                setTimeout(traerMenu, 500);
                top += 25;
                num++;
            }
            else {
                num = 0;
                top = 114;
            }
        }
    }
    function controlTraerMenu(lista) {
        let boolean = false;
        for (let index = 0; index < lista.length; index++) {
            if (lista[index].classList.contains('aparecerMenu'))
                boolean = true;
            else
                boolean = false;
        }
        return boolean;
    }

    window.addEventListener('scroll', function () {
        let contRazas = document.querySelector(".contRazas");
        let razaAngel = document.querySelector(".razaAngel");
        let razaDemonio = document.querySelector(".razaDemonio");
        let screenSize = window.innerHeight;

        if (contRazas.getBoundingClientRect().top < screenSize) {
            contRazas.classList.add('visbleRazas');
            razaAngel.classList.add('traer-razasIzq');
            razaDemonio.classList.add('traer-razasDer');
        } else {
            contRazas.classList.remove('visbleRazas');
            razaAngel.classList.remove('traer-razasIzq');
            razaDemonio.classList.remove('traer-razasDer');
        }

        let imgCaracteristicas = document.querySelectorAll(".imgCaracteristica");
        let translateX = 300;
        if (imgCaracteristicas[0].getBoundingClientRect().top < screenSize) {
            for (let index = 0; index < imgCaracteristicas.length / 2; index++) {
                const element = imgCaracteristicas[index];
                element.style.transform = "translateX(" + translateX + "px)";
                element.classList.add('traer-caracteristicasIzq');
                translateX += -300;
            }
        }
        else {
            translateX = 300;
            for (let index = 0; index < imgCaracteristicas.length / 2; index++) {
                const element = imgCaracteristicas[index];
                element.classList.remove('traer-caracteristicasIzq');
            }
        }
        if (imgCaracteristicas[imgCaracteristicas.length / 2].getBoundingClientRect().top < screenSize) {
            for (let index = imgCaracteristicas.length / 2; index < imgCaracteristicas.length; index++) {
                const element = imgCaracteristicas[index];
                element.style.transform = "translateX(" + translateX + "px)";
                element.classList.add('traer-caracteristicasIzq');
                translateX += -300;
            }
        }
        else {
            translateX = 300;
            for (let index = imgCaracteristicas.length / 2; index < imgCaracteristicas.length; index++) {
                const element = imgCaracteristicas[index];
                element.classList.remove('traer-caracteristicasIzq');
            }
        }

        let historiaTexto = document.querySelectorAll(".historiaTexto");
        let imgHistoria = this.document.getElementById("imgHistoria");
        for (let index = 0; index < historiaTexto.length; index++) {
            const element = historiaTexto[index];
            if (element.getBoundingClientRect().top + 400 < screenSize) {
                if (index == 0)
                    imgHistoria.src = "img/diabloBallMefisto.jpg";
                else if (index == 1)
                    imgHistoria.src = "img/heroesPeliando.jpg";
                else if (index == 2)
                    imgHistoria.src = "img/piedraDiablo.jpg";
                else if (index == 3)
                    imgHistoria.src = "img/meteorito.jpg";
                element.classList.add("visbleRazas");
            }
            else
                element.classList.remove("visbleRazas");
        }
        for (let index = 0; index < historiaTexto.length; index++) {
            const element = historiaTexto[index];
            if (element.getBoundingClientRect().top + 800 < screenSize)
                element.classList.add("desaparecerTexto");
            else
                element.classList.remove("desaparecerTexto");
        }
    });
}