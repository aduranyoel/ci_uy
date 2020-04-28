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
  document.getElementById('actionRandom').addEventListener('click', function() {
    resultCi.innerText = random_ci()
  })

  document.getElementById('digitCi').addEventListener('keyup', function() {
    var valid = validate_ci(this.value)
    resultValid.innerText = valid ? 'VALID' : 'INVALID'
    resultValid.style.color = valid ? '#1A936F' : '#ED213A'
  })
  document.getElementById('actionRandomRut').addEventListener('click', function() {
    resultRut.innerText = random_rut()
  })
  
  document.getElementById('digitRut').addEventListener('keyup', function() {
    var valid = validate_rut(this.value)
    resultValidRut.innerText = valid ? 'VALID' : 'INVALID'
    resultValidRut.style.color = valid ? '#1A936F' : '#ED213A'
  })
