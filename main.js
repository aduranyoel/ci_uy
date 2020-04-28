var ok = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1A936F" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg>'
var bad = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ED213A" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>'

function validation_digit(ci){
  var a = 0;
  var i = 0;
  if(ci.length <= 6){
    for(i = ci.length; i < 7; i++){
      ci = '0' + ci;
    }
  }
  for(i = 0; i < 7; i++){
    a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
  }
  if(a%10 === 0){
    return 0;
  }else{
    return 10 - a % 10;
  }
}
function random_ci(){
  var ci = Math.floor(Math.random() * 10000000).toString();
  ci = ci.substring(0,7) + validation_digit(ci);
  return ci;
}
function clean_ci(ci){
  return ci.replace(/\D/g, '');
}
function validate_ci(ci){
  ci = clean_ci(ci);
  var dig = ci[ci.length - 1];
  ci = ci.replace(/[0-9]$/, '');
  return (dig == validation_digit(ci));
}
function validate_rut(rut) {
  if (rut.length === 12) {
      const digitoVerificadorRUT = rut.substring(rut.length - 1);
      const rutSinDigitoVerificador = rut.substring(0, 11);
      let total = 0;
      let factor = 2;
      for (let i = 10; i >= 0; i--) {
        total += (factor * Number(rutSinDigitoVerificador.substring(i, i + 1)));
        factor = (factor === 9) ? 2 : factor + 1;
      }
      let digitoVerificadorCalculado = 11 - (total % 11);
      if (digitoVerificadorCalculado === 11) {
        digitoVerificadorCalculado = 0;
      } else if (digitoVerificadorCalculado === 10) {
        digitoVerificadorCalculado = 1;
      }
      if (digitoVerificadorCalculado === Number(digitoVerificadorRUT)) {
        return true;
      }
  }
  return false;
}
function random_rut() {
  var rut = '';
  new Uint8Array(11).forEach(() => {
    rut += Math.floor(Math.random()*10).toString();
  })
  const digitoVerificadorRUT = rut.substring(rut.length - 1);
  const rutSinDigitoVerificador = rut.substring(0, 11);
  let total = 0;
  let factor = 2;
  for (let i = 10; i >= 0; i--) {
    total += (factor * Number(rutSinDigitoVerificador.substring(i, i + 1)));
    factor = (factor === 9) ? 2 : factor + 1;
  }
  let digitoVerificadorCalculado = 11 - (total % 11);
  if (digitoVerificadorCalculado === 11) {
    digitoVerificadorCalculado = 0;
  } else if (digitoVerificadorCalculado === 10) {
    digitoVerificadorCalculado = 1;
  }
  rut += digitoVerificadorCalculado
  return rut;
}
var resultCi = document.getElementById('resultCi');
var resultRut = document.getElementById('resultRut');
var resultValid = document.getElementById('resultValid');
var resultValidRut = document.getElementById('resultValidRut');
document.getElementById('actionRandom').addEventListener('click', actionRandom)

document.getElementById('digitCi').addEventListener('keyup', function() {
  var valid = validate_ci(this.value)
  resultValid.innerHTML = valid ? ok : bad
  this.style.borderColor = valid ? '#1A936F' : '#ED213A'
  if (this.value.trim() === '') {
    resultValid.innerHTML = ''
    this.style.borderColor = null
  }
})
document.getElementById('actionRandomRut').addEventListener('click', actionRandomRut)

document.getElementById('digitRut').addEventListener('keyup', function() {
  var valid = validate_rut(this.value)
  resultValidRut.innerHTML = valid ? ok : bad
  this.style.borderColor = valid ? '#1A936F' : '#ED213A'
  if (this.value.trim() === '') {
    resultValidRut.innerHTML = ''
    this.style.borderColor = null
  }
})
function actionRandom() {
  resultCi.innerText = random_ci()
}
function actionRandomRut() {
  resultRut.innerText = random_rut()
}
window.addEventListener('load', function() {
  actionRandom()
  actionRandomRut()
})