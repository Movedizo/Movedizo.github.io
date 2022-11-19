document.addEventListener("DOMContentLoaded", iniciarindex);

function iniciarindex() {
    "use strict"
    /* document.querySelector('#btnUsuario').addEventListener("click", function () {
         document.querySelector('#menuHamburguesa').classList.add("desaparecer");
         document.querySelector('#menuPerfil').classList.toggle("desaparecer");
     });
     
     document.querySelector('#btnHamburguesa').addEventListener("click", function () {
         document.querySelector('#menuPerfil').classList.add("desaparecer");
         document.querySelector('#menuHamburguesa').classList.toggle("desaparecer");
     });*/

    let linksDesplegables = document.querySelectorAll(".linkDesplegable");
    document.querySelector('#btnHamburguesa').addEventListener("click", traerMenu);


    let num = 0;
    let top = 114;

    function traerMenu() {
        console.log(num);
        if (controlTraerMenu(linksDesplegables)) {
            console.log("desaparecer");
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
            console.log("traer");
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

    

    window.addEventListener('scroll', function()  {
        let contRazas = document.querySelector(".contRazas");
        let razaAngel = document.querySelector(".razaAngel");
        let razaDemonio = document.querySelector(".razaDemonio");
        let screenSize = window.innerHeight;
        
          if(contRazas.getBoundingClientRect().top < screenSize) {
            contRazas.classList.add('visbleRazas');
            razaAngel.classList.add('traer-razasIzq');
            razaDemonio.classList.add('traer-razasDer');
          } else {
            contRazas.classList.remove('visbleRazas');
            razaAngel.classList.remove('traer-razasIzq');
            razaDemonio.classList.remove('traer-razasDer');
          }
      });
}