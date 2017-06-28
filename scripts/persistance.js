'use strict';

var initialBalance = 5;
var jackpotWorth = 3;
var pairWorth = 2;

function User(userName) {
  this.userName = userName;
  this.rounds = 0;
  this.jackpots = 0;
  this.pairs = 0;
}

function convertObjectToUser(object) {
  var user = new User(object.userName);
  user.rounds = object.rounds;
  user.jackpots = object.jackpots;
  user.pairs = object.pairs;
  return user;
}

User.prototype.resetStats = function(){
  this.jackpots = 0;
  this.pairs = 0;
  this.rounds = 0;
};

User.prototype.moneyBalance = function() {
  return (this.pairs * pairWorth + this.jackpots * jackpotWorth ) - this.losses() + initialBalance;
};

User.prototype.losses = function() {
  return this.rounds - (this.jackpots + this.pairs);
};

var Data = {};

Data.loadCurrentUser = function() {
  var currentUserLoad =  localStorage.getItem('currentUser');
  var usersLoad = localStorage.getItem('users');
  if (currentUserLoad === null || usersLoad === null){
    return null;
  } else {
    return convertObjectToUser(JSON.parse(usersLoad) [currentUserLoad]);
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
    return convertObjectToUser(JSON.parse(usersLoad)[userName]);
  };
};

Data.getAllUsers = function() {
  var allUsersLoad = JSON.parse(localStorage.getItem('users'));
  if (allUsersLoad === null) {
    return [];
  } else {
    var temp = [];
    for (var each in allUsersLoad) {
      temp.push(convertObjectToUser(allUsersLoad[each]));
    }
    return temp;
  }
};
