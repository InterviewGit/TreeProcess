var forms = document.forms;
p = document.querySelectorAll('p'),
input = document.querySelectorAll('input:not([type="submit"])'),
submit = document.querySelectorAll('input[type="submit"]');
password = input[2],
password2 = document.getElementById('passwordIn'),
email = input[1],
email2 = document.getElementById('emailIn');

[].forEach.call(input, function(inputE) {
  inputE.addEventListener('focus', function() {
    inputE.parentNode.previousElementSibling.style.color = '#FDED62';
    inputE.style.transform = 'translate(5px, 5px)';
  });
  inputE.addEventListener('blur', function() {
    inputE.parentNode.previousElementSibling.style.color = '#fff';
    inputE.style.transform = 'translate(0px, 0px)';
  });
});

function checkPassword(e) {
  var el = e.target;
  if (el.value.length < 8 && el.value.length !== 0) {
    el.parentNode.previousElementSibling.style.color = '#FB6868';
  } else {
    el.parentNode.previousElementSibling.style.color = '#FDED62';
  }
}

function checkEmail(e) {
  'use strict';
  var el = e.target;
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reg.test(el.value) && el.value !== '') {
    el.parentNode.previousElementSibling.style.color = '#FB6868';
  } else {
    el.parentNode.previousElementSibling.style.color = '#FDED62';
  }
}

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.addEventListener('input', checkPassword);
password.addEventListener('focus', checkPassword);
email.addEventListener('input', checkEmail);
email.addEventListener('focus', checkEmail);


password2.addEventListener('input', checkPassword);
password2.addEventListener('focus', checkPassword);
email2.addEventListener('input', checkEmail);
email2.addEventListener('focus', checkEmail);


var button = document.getElementById('button'),
  wrapper = document.getElementById('wrapper'),
  c = true,
  one = document.getElementById('one'),
  two = document.getElementById('two');

button.addEventListener('click', function() {
  'use strict';
  if (c) {
    one.style.pointerEvents = 'none';
    two.style.pointerEvents = 'auto';
    one.style.opacity = '0.1';
    two.style.opacity = '1';
    one.style.transform = 'translateX(100%)';
    two.style.transform = 'translateX(0%)';
    button.textContent = 'Sign Up';

    c = false;
  } else {
    one.style.pointerEvents = 'auto';
    two.style.pointerEvents = 'none';
    one.style.opacity = '1';
    two.style.opacity = '0.1';
    one.style.transform = 'translateX(0%)';
    two.style.transform = 'translateX(-100%)';
    button.textContent = 'Sign In';

    c = true;
  }

});
var password = document.getElementById("password");
var confirm_password = document.getElementById("confPassword");

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;