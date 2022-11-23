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
                setTimeout(traerMenu, 100);
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
                setTimeout(traerMenu, 100);
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
        let razaNombre = document.querySelectorAll(".nombreRaza");
        let screenSize = window.innerHeight;

        if (contRazas.getBoundingClientRect().top < screenSize) {
            contRazas.classList.add('visbleRazas');
            razaAngel.classList.add('traer-razasIzq');
            razaDemonio.classList.add('traer-razasDer');
            razaNombre[0].classList.add('traerNombreRaza');
            razaNombre[1].classList.add('traerNombreRaza');
            razaNombre[0].style.transform = "translateY(-500px)";
            razaNombre[1].style.transform = "translateY(500px)";
        } else {
            contRazas.classList.remove('visbleRazas');
            razaAngel.classList.remove('traer-razasIzq');
            razaDemonio.classList.remove('traer-razasDer');
            razaNombre[0].classList.remove('traerNombreRaza');
            razaNombre[1].classList.remove('traerNombreRaza');
        }
        if (contRazas.getBoundingClientRect().top + 1000 < screenSize) {
            contRazas.classList.add('desaparecerTexto');
        }
        else {
            contRazas.classList.remove('desaparecerTexto');
        }

        let imgCaracteristicas = document.querySelectorAll(".imgCaracteristica");
        let translateX = -300;
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
        translateX = 900;
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
                if (index >= 1 && index < 2)
                    imgHistoria.src = "img/diabloBallMefisto.jpg";
                else if (index >= 3 && index < 4)
                    imgHistoria.src = "img/heroesPeliando.jpg";
                else if (index >= 5 && index < 6)
                    imgHistoria.src = "img/piedraDiablo.jpg";
                else if (index >= 7)
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

    document.getElementById("flechaCaruselIzq").addEventListener('click', moverCarruselDer);
    document.getElementById("flechaCaruselDer").addEventListener('click', moverCarruselIzq);
    let personajes = document.querySelectorAll(".targeta");
    let posPersonaje = personajes.length / 2 - 1;
    function moverCarruselDer() {
        if (posPersonaje > 0) {
            removerClaseCarrusel("carruselIzq");
            removerClaseCarrusel("carruselDer");
            if (posPersonaje > 2 && posPersonaje < 6) {
                personajes[posPersonaje - 2].classList.remove("personaje1");
                personajes[posPersonaje - 1].classList.remove("personaje2")
                personajes[posPersonaje].classList.remove("personaje3");
                personajes[posPersonaje].classList.remove("personaje");
                personajes[posPersonaje + 1].classList.remove("personaje4");
                personajes[posPersonaje + 2].classList.remove("personaje5");



                personajes[posPersonaje - 2].classList.add("carruselDer1");
                personajes[posPersonaje - 1].classList.add("carruselDer2");
                personajes[posPersonaje - 1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselDer3");
                personajes[posPersonaje + 1].classList.add("carruselDer4");

            }
            else if (posPersonaje > 1 && posPersonaje < 7) {
                personajes[posPersonaje - 2].classList.add("carruselDer1");
                personajes[posPersonaje - 1].classList.add("carruselDer2");
                personajes[posPersonaje - 1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselDer3");
                personajes[posPersonaje].classList.remove("personaje");
                personajes[posPersonaje + 1].classList.add("carruselDer4");

            }
            else if (posPersonaje == 1) {
                personajes[posPersonaje - 1].classList.add("carruselDer2");
                personajes[posPersonaje - 1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselDer3");
                personajes[posPersonaje].classList.remove("personaje");
                personajes[posPersonaje + 1].classList.add("carruselDer4");
            }
            else if (posPersonaje == 7) {
                personajes[posPersonaje - 2].classList.add("carruselDer1");
                personajes[posPersonaje - 1].classList.add("carruselDer2");
                personajes[posPersonaje - 1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselDer3");
                personajes[posPersonaje].classList.remove("personaje");
            }
            posPersonaje--;
        }
    }
    function moverCarruselIzq() {
        if (posPersonaje < personajes.length - 1) {
            removerClaseCarrusel("carruselIzq");
            removerClaseCarrusel("carruselDer");
            if (posPersonaje < 6 && posPersonaje > 2) {
                personajes[posPersonaje - 2].classList.remove("personaje1");
                personajes[posPersonaje - 1].classList.remove("personaje2");
                personajes[posPersonaje].classList.remove("personaje");
                personajes[posPersonaje].classList.remove("personaje3");
                personajes[posPersonaje + 1].classList.remove("personaje4");
                personajes[posPersonaje + 2].classList.remove("personaje5");

                personajes[posPersonaje + 2].classList.add("carruselIzq1");
                personajes[posPersonaje + 1].classList.add("carruselIzq2");
                personajes[posPersonaje +1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselIzq3");
                personajes[posPersonaje - 1].classList.add("carruselIzq4");

            }
            else if (posPersonaje < 7 && posPersonaje > 2) {
                personajes[posPersonaje + 1].classList.add("carruselIzq2");
                personajes[posPersonaje +1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselIzq3");
                personajes[posPersonaje].classList.remove("personaje");
                personajes[posPersonaje - 1].classList.add("carruselIzq4");

            }
            else if (posPersonaje == 1 || posPersonaje == 2) {
                personajes[posPersonaje + 2].classList.add("carruselIzq1");
                personajes[posPersonaje + 1].classList.add("carruselIzq2");
                personajes[posPersonaje + 1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselIzq3");
                personajes[posPersonaje].classList.remove("personaje");
                personajes[posPersonaje - 1].classList.add("carruselIzq4");
            }
            else if (posPersonaje == 0) {
                personajes[posPersonaje + 2].classList.add("carruselIzq1");
                personajes[posPersonaje + 1].classList.add("carruselIzq2");
                personajes[posPersonaje + 1].classList.add("personaje");
                personajes[posPersonaje].classList.add("carruselIzq3");
                personajes[posPersonaje].classList.remove("personaje");
            }
            posPersonaje++;
        }
    }
    function removerClaseCarrusel(texto) {
        for (let index = 0; index < personajes.length; index++) {
            for (let z = 1; z < 5; z++) {
                const element = personajes[index];
                element.classList.remove(texto + z);
            }
        }
    }
}