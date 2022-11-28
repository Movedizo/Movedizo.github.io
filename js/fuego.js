"use strict"

let fondo = document.getElementById('fondo');
let nubesAtras = document.getElementById('nubesAtras');
let fondoMontanaAtras = document.getElementById('fondoMontanaAtras');
let fondoMontanaAdelante = document.getElementById('fondoMontanaAdelante');
let fondoNube = document.getElementById('fondoNube');       
let text= document.getElementById('text');
let boton = document.getElementById('boton');
let fondoCastillo = document.getElementById('fondoCastillo');
let fondoPiso = document.getElementById('fondoPiso');

window.addEventListener('scroll', function(){
  let value = window.scrollY;
  nubesAtras.style.top = value * 0.1 + 'px';
  fondoMontanaAtras.style.bottom = value * 0.1 + 'px';
  fondoMontanaAdelante.style.right = value * 0.5  + 'px';
  fondoNube.style.top = value * 0.3 + 'px';
  text.style.marginRight = value * 5 + 'px';
  boton.style.top = value * 100 + 'px';
  fondoCastillo.style.bottom= value * 0+ 'px';
  fondoPiso.style.bottom = value *-30 + 'px';
})
