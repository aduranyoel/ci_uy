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
  var resultCi = document.getElementById('resultCi');
  var resultValid = document.getElementById('resultValid');
  document.getElementById('actionRandom').addEventListener('click', function() {
    resultCi.innerText = random_ci()
  })
  document.getElementById('digitCi').addEventListener('keyup', function() {
    var valid = validate_ci(this.value)
    resultValid.innerText = valid ? 'VALID' : 'INVALID'
    resultValid.style.color = valid ? '#1A936F' : '#ED213A'
  })