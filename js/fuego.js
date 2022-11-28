"use strict"

let fondo = document.getElementById('fondo');
let nubesAtras = document.getElementById('nubesAtras');
let fondoMontanaAtras = document.getElementById('fondoMontanaAtras');
let fondoMontanaAdelante = document.getElementById('fondoMontanaAdelante');
let fondoNube = document.getElementById('fondoNube');
let text = document.getElementById('text');
let fondoCastillo = document.getElementById('fondoCastillo');
let fondoPiso = document.getElementById('fondoPiso');

window.addEventListener('scroll', function () {
  let value = window.scrollY;
  let multiplicacion = 1 + (value * 0.0002);
  let multiplicacionPX = 1 + (value * 0.2);
 // nubesAtras.style.top = value * 0.01 + 'px';
 // fondoMontanaAtras.style.bottom = value * 0.1 + 'px';
//  fondoMontanaAdelante.style.right = value * 0.5 + 'px';
  //fondoNube.style.top = value * 0.5 + 'px';
  text.style.marginRight = value * 5 + 'px';
  //fondoCastillo.style.bottom = value * 0.1 + 'px';
  if (1 * multiplicacion >= 1 && 1 * multiplicacion <= 1.2) {
    fondoCastillo.style.transform = "scale(" + (1 * multiplicacion) + ")";
    //fondoMontanaAtras.style.transform = "translatey(" + (1 * -multiplicacionPX) + "px)" + "translatex(" + (1 * -multiplicacionPX) + "px)" + "scale(" + (1 * multiplicacion) + ")";
    fondoMontanaAdelante.style.transform = "translatey(" + (1 * -multiplicacionPX) + "px)" + "translatex(" + (1 * -multiplicacionPX) + "px)" + "scale(" + (1 * multiplicacion) + ")";
    //nubesAtras.style.transform = "translatey(" + (1 * multiplicacionPX)+ "px)" ;
    fondoNube.style.transform = "translatey(" + (1 * multiplicacionPX)+ "px)" ;
  }
 // fondoPiso.style.bottom = value * -30 + 'px';

})
