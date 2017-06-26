'use strict';

var form = document.createElement('form');
var label = document.createElement('label');
var selectUser = document.getElementById('selectUser');
var playButton = document.getElementById('startPlaying');
var currentOptionShowing = 'newUser';

if (Data.loadCurrentUser() === null) {
  form.setAttribute('id', 'newUser');
  currentOptionShowing = 'newUser';
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'userName');
  input.setAttribute('value', 'Enter your name');
  label.textContent = 'New User';
  form.appendChild(label);
  form.appendChild(input);
  selectUser.appendChild(form);
} else if (Data.getAllUsers().length > 0) {
  form.setAttribute('id', 'pastUsers');
  currentOptionShowing = 'pastUsers';
  label.textContent = 'Select the User';
  var select = document.createElement('select');
  var allusers = Data.getAllUsers();
  for(var i = 0; i < allusers.length; i++){
    var each = allusers[i];
    var option = document.createElement('option');
    option.setAttribute('value', each.userName);
    option.textContent = each.userName;
    select.appendChild(option);
  }
  form.appendChild(label);
  form.appendChild(select);
  selectUser.appendChild(form);
}

playButton.addEventListener('click', function(event){
  var formShowing = document.getElementById(currentOptionShowing);
  console.log(formShowing);
});
