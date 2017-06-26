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
  if(usersToEdit === null) {
    usersToEdit = {};
  }
  usersToEdit[user.userName] = user;
  localStorage.setItem('users', JSON.stringify(usersToEdit));
};

Data.loadUser = function(user) {
  var usersLoad =  localStorage.getItem('users');

  if (usersLoad === null){
    return null;
  } else {
    localStorage.setItem('currentUser', user.userName);
    return JSON.parse(usersLoad)[user.userName];
  };
};

Data.getAllUsers = function() {
  var allUsersLoad = JSON.parse(localStorage.getItem('users'));
  if (allUsersLoad === null) {
    return [];
  } else {
    var temp = [];
    for (var each in allUsersLoad) {
      temp.push(allUsersLoad[each]);
    }
    return temp;
  }
};
