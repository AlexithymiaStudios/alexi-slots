
'use strict';

/*********** VARIABLE ***********/
var resetButton = document.getElementById('resetBalanceButton');

/*********** SETUP ***********/
function setup(){
  insertPastUsers();
  insertNewUser();
}
setup();

/*********** ADDITIONAL VARIABLES ***********/
var addNewUserButton = document.getElementById('addNewUser');
var showPastUsersButton = document.getElementById('showPastUsers');
var pastUsersForm = document.getElementById('pastUsers');
var newUserForm = document.getElementById('newUser');

/*********** FUNCTIONS ***********/

function insertEmojiSetsOptions() {
  for (var key in slots) {
    var option = document.createElement('option');
    option.setAttribute ('value', key);
    option.textContent = key;
    slotsSelection.appendChild(option);
  };
}

function insertNewUser() {
  var form = document.createElement('form');
  var label = document.createElement('label');
  var selectUser = document.getElementById('selectUser');
  var button = document.createElement('button');
  form.setAttribute('id', 'newUser');
  form.setAttribute('class', 'leftNewUser');
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'userNameSelected');
  input.setAttribute('placeholder', 'Enter your name');
  label.textContent = 'Create a User';
  form.appendChild(label);
  form.appendChild(input);
  button.setAttribute('id', 'addNewUser');
  button.textContent = 'Create User';
  form.appendChild(button);
  selectUser.appendChild(form);
}

function insertPastUsers() {
  var form = document.createElement('form');
  var label = document.createElement('label');
  var selectUser = document.getElementById('selectUser');
  var button = document.createElement('button');
  form.setAttribute('id', 'pastUsers');
  label.textContent = 'Select a User';
  var select = document.createElement('select');
  select.setAttribute('name', 'userNameSelected');
  select.setAttribute('id', 'selectedCurrentUser');
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
  button.setAttribute('id', 'showPastUsers');
  button.textContent = 'Play';
  form.appendChild(button);
  selectUser.appendChild(form);
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

/*********** EVENT LISTENERS ***********/
addNewUserButton.addEventListener('click', function(event) {
  event.preventDefault();
  if (checkIfValid(newUserForm.userNameSelected)){
    var newUser = new User(newUserForm.userNameSelected.value);
    Data.saveUser(newUser);
    pastUsersForm.hidden = false;
    currentUserSettings.hidden = false;
    resetBalanceButton.textContent = 'Reset Balance of $' + Data.loadCurrentUser().moneyBalance();
    insertEmojiSetsOptions();
    emojiSet.slotsSelection.value = Data.loadCurrentUser().prefferedSlots;
    window.location.href = 'index.html';
  };
});

showPastUsersButton.addEventListener('click', function(event) {
  event.preventDefault();
  var userSelected = Data.loadUserName(pastUsersForm.userNameSelected.value);
  if (userSelected !== null ) {
    Data.saveUser(userSelected);
    window.location.href = 'index.html';
  } else {
    console.warn('Was not able to load selected user');
  }
});

resetButton.addEventListener('click', function(){
  var currentUser = Data.loadCurrentUser();
  currentUser.resetStats();
  Data.saveUser(currentUser);
  alert('Your balance has been reset.');
  window.location.href = 'index.html';
});

//Startup setting
if (Data.loadCurrentUser() === null) {
  pastUsersForm.hidden = true;
  currentUserSettings.hidden = true;
  newUser.className = 'centerNewUserDefault';
} else {
  pastUsers.userNameSelected.value = Data.loadCurrentUser().userName;
  difficultyLevel.difficultySelected.value = Data.loadCurrentUser().difficulty;
  insertEmojiSetsOptions();
  emojiSet.slotsSelection.value = Data.loadCurrentUser().prefferedSlots;
  resetBalanceButton.textContent = 'Reset Balance of $' + Data.loadCurrentUser().moneyBalance();
}

slotsSelection.onchange = function () {
  var elem = (typeof this.selectedIndex === 'undefined' ? window.event.srcElement : this);
  var value = elem.value || elem.options[elem.selectedIndex].value;
  var currentUser = Data.loadCurrentUser();
  currentUser.prefferedSlots = value;
  Data.saveUser(currentUser);
  window.location.href = 'options.html#pastUsers';
};

selectedCurrentUser.onchange = function() {
  var elem = (typeof this.selectedIndex === 'undefined' ? window.event.srcElement : this);
  var value = elem.value || elem.options[elem.selectedIndex].value;
  resetBalanceButton.textContent = 'Reset Balance of $' + Data.loadUserName(value).moneyBalance();
  difficultyLevel.difficultySelected.value = Data.loadCurrentUser().difficulty;
  emojiSet.slotsSelection.value = Data.loadCurrentUser().prefferedSlots;
};

difficultySelection.onchange = function () {
  var elem = (typeof this.selectedIndex === 'undefined' ? window.event.srcElement : this);
  var value = elem.value || elem.options[elem.selectedIndex].value;
  var currentUser = Data.loadCurrentUser();
  currentUser.difficulty = value;
  console.log(value);
  Data.saveUser(currentUser);
  window.location.href = 'options.html#emojiSet';
};
