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

function pasarcaratula() {
    "use strict"
    document.querySelector('#btnCaratula').addEventListener("click", function () {
        document.querySelector('#menuHamburguesa').classList.add("desaparecer");
        document.querySelector('#menuPerfil').classList.toggle("desaparecer");
    });
    document.querySelector('#btnHamburguesa').addEventListener("click", function () {
        document.querySelector('#menuPerfil').classList.add("desaparecer");
        document.querySelector('#menuHamburguesa').classList.toggle("desaparecer");
    });
}

/*var current = 0;
var imagenes = new Array();
 
$(document).ready(function() {
    var numImages = 7;
    if (numImages <= 3) {
        $('.flechader').css('display', 'none');
        $('.flechaizq').css('display', 'none');
    }
 
    $('.flechaizq').on('click',function() {
        if (current > 0) {
            current = current - 1;
        } else {
            current = numImages - 3;
        }
 
        $(".carrusel").animate({"left": -($('#product_'+current).position().left)}, 600);
 
        return false;
    });
 
    $('.flechaizq').on('hover', function() {
        $(this).css('opacity','0.5');
    }, function() {
        $(this).css('opacity','1');
    });
 
    $('.flechader').on('hover', function() {
        $(this).css('opacity','0.5');
    }, function() {
        $(this).css('opacity','1');
    });
 
    $('.flechader').on('click', function() {
        if (numImages > current + 3) {
            current = current+1;
        } else {
            current = 0;
        }
 
        $(".carrusel").animate({"left": -($('.carsimple_'+current).position().left)}, 600);
        $(".carrusel").animate({"left": -($('.cardoble_'+current).position().left)}, 600);
        $(".carrusel").animate({"left": -($('.carmixto_'+current).position().left)}, 600);

        return false;
    }); 
 });*/
