document.addEventListener("DOMContentLoaded", iniciarindex);

function iniciarindex() {
    "use strict"
    document.querySelector('#btnUsuario').addEventListener("click", function () {
        document.querySelector('#menuPerfil').classList.toggle("desaparecer");
    });
    let linksDesplegables = document.querySelectorAll(".linkDesplegable");
    document.querySelector('#btnHamburguesa').addEventListener("click", traerMenu);
    let desplegado = false;
    document.querySelector('#btnHamburguesa').addEventListener("click", function () {
        let cruces = document.querySelectorAll(".cruz");
        if (!desplegado) {
            for (let index = 0; index < cruces.length; index++) {
                const element = cruces[index];
                element.classList.remove("cruz" + (index + 1) + "Des");
                element.classList.add("cruz" + (index + 1) + "Animacion");
            }
            desplegado = true;
        }
        else {
            for (let index = 0; index < cruces.length; index++) {
                const element = cruces[index];
                element.classList.remove("cruz" + (index + 1) + "Animacion");
                element.classList.add("cruz" + (index + 1) + "Des");
            }
            desplegado = false;
        }
    });


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
}


