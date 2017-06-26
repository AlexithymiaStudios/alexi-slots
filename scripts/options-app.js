'use strict';

if (Data.loadCurrentUser() === null) {
  var form = document.createElement('form');
  form.setAttribute('id', 'newUser');
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'userName');
  input.setAttribute('value', 'Enter your name');
  var label = document.createElement('label');
  label.textContent = 'New User';
  form.appendChild(label);
  form.appendChild(input);
  var selectUser = document.getElementById('selectUser');
  selectUser.appendChild(form);

}
