'use strict';

function User(userName, rounds, wins) {
  this.userName = userName;
  this.rounds = rounds;
  this.wins = wins;
}


var Data = {};

Data.loadCurrentUser = function() {
  var currentUserLoad =  localStorage.getItem('currentUser');
  var usersLoad = localStorage.getItem('users');
  if (currentUserLoad === null || usersLoad === null){
    return null;
  } else {
    return JSON.parse(usersLoad) [currentUserLoad];
  };
};

Data.saveUser = function(user) {
  localStorage.setItem('currentUser', user.userName);
  var usersToEdit = JSON.parse(localStorage.getItem('users'));
  usersToEdit[user.userName] = user;
  localStorage.setItem('users', JSON.stringify(usersToEdit));
};





loadCurrentUser ();
//return user
saveUser (user);
loadUser(user);
getAllUsers();
