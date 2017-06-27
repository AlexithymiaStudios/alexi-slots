'use strict';

function User(userName) {
  this.userName = userName;
  this.rounds = 0;
  this.jackpots = 0;
  this.pairs = 0;
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

Data.loadUser = function(user){
  return this.loadUserName(user.userName);
};

Data.loadUserName = function(userName) {
  var usersLoad =  localStorage.getItem('users');

  if (usersLoad === null){
    return null;
  } else {
    localStorage.setItem('currentUser', userName);
    return JSON.parse(usersLoad)[userName];
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
