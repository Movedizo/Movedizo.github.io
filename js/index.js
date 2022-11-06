document.addEventListener("DOMContentLoaded", iniciarindex);

function iniciarindex() {
    "use strict"
    document.querySelector('#btnUsuario').addEventListener("click", function () {
        document.querySelector('#menuHamburguesa').classList.add("desaparecer");
        document.querySelector('#menuPerfil').classList.toggle("desaparecer");
    });
    
    document.querySelector('#btnHamburguesa').addEventListener("click", function () {
        document.querySelector('#menuPerfil').classList.add("desaparecer");
        document.querySelector('#menuHamburguesa').classList.toggle("desaparecer");
    });
}


