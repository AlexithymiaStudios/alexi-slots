'use strict';

/************** VARIABLES **************/
var resetButton = document.getElementById('resetBalanceButton');
var select = document.createElement('select');

function insertNewUser() {
  var form = document.createElement('form');
  var label = document.createElement('label');
  var selectUser = document.getElementById('selectUser');
  var button = document.createElement('button');
  form.setAttribute('id', 'newUser');
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'userNameSelected');
  input.setAttribute('placeholder', 'Enter your name');
  label.textContent = 'New User';
  form.appendChild(label);
  form.appendChild(input);
  button.setAttribute('id', 'addNewUser');
  button.textContent = 'Start Playing';
  form.appendChild(button);
  selectUser.appendChild(form);
}

function insertPastUsers() {
  var form = document.createElement('form');
  var label = document.createElement('label');
  var selectUser = document.getElementById('selectUser');
  var button = document.createElement('button');
  form.setAttribute('id', 'pastUsers');
  label.textContent = 'Select the User';
  select.setAttribute('name', 'userNameSelected');
  select.setAttribute('id', 'selectdPastUser')
  var allusers = Data.getAllUsers();
  for(var i = 0; i < allusers.length; i++){
    var each = allusers[i];
    var option = document.createElement('option');
    option.setAttribute('value', each.userName);
    // option.setAttribute('class', 'option');// set class for option
    option.textContent = each.userName;
    select.appendChild(option);
  }
  form.appendChild(label);
  form.appendChild(select);
  button.setAttribute('id', 'showPastUsers');
  button.textContent = 'Play';
  form.appendChild(button);
  selectUser.appendChild(form);
};

function renderBalance(){
//get allusers Data
  var allUsersData = Data.getAllUsers();
//get the value from the drop down list
  var selectedUser = select[select.options.selectedIndex].value;
  // console.log(selectedUser
//pull out the user balance from the specific user out of the allusers Data
  var selectedUserBalance = allUsersData[select.options.selectedIndex];
  console.log(selectedUserBalance);
// balanceElement.textContent = 'You balance is ' + currentUser.moneyBalance();
}

insertPastUsers();
insertNewUser();

var balanceElement = document.getElementById('selectdPastUser');
var addNewUserButton = document.getElementById('addNewUser');
var showPastUsersButton = document.getElementById('showPastUsers');
var pastUsersForm = document.getElementById('pastUsers');
var newUserForm = document.getElementById('newUser');

// console.log(newUserForm);

addNewUserButton.addEventListener('click', function(event) {
  event.preventDefault();
  if (checkIfValid(newUserForm.userNameSelected)){
    var newUser = new User(newUserForm.userNameSelected.value);
    Data.saveUser(newUser);
    console.log(newUserForm.userNameSelected.value);
    window.location.href = 'index.html';
  };
});

showPastUsersButton.addEventListener('click', function(event) {
  event.preventDefault();
  var userSelected = Data.loadUserName(pastUsersForm.userNameSelected.value);
  if (userSelected !== null ) {
    Data.saveUser(userSelected);
    // renderBalance();
    window.location.href = 'index.html';
  } else {
    console.warn('Was not able to load selected user');
  }
});

// var option = option.setAttribute('class', 'option');
// var option = document.getElementsByClassName('option')
// option.addEventListener ('click', function() {
//   renderBalance();
// });

// var option = option.setAttribute('class', 'option');
// var option = document.getElementsByClassName('option')
// s.addEventListener ('click', function() {
//   renderBalance();
// });


balanceElement.onchange = function () {
  var elem = (typeof this.selectedIndex === 'undefined' ? window.event.srcElement : this);
  var value = elem.value || elem.options[elem.selectedIndex].value;
  alert(value);
};

function checkIfValid(formInput) {
  var validUsername = formInput.value.match(/^[a-zA-Z]+$/);
  if (validUsername === null){
    alert('Your first name is not valid. Only characters A-Z and a-z are acceptable.');
    formInput.focus();
    return false;
  };
  return true;
};


// get event listener
resetButton.addEventListener('click', function(){
  var currentUser = Data.loadCurrentUser();
  currentUser.resetStats();
  Data.saveUser(currentUser);
  alert('Your balance has been reset.');
  window.location.href = 'index.html';
});
