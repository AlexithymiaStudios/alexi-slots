'use strict';

/*********** VARIABLES ***********/
var initialBalance = 25;
var jackpotWorth = 5;
var pairWorth = 2;
var Data = {wild: 'wildcard.gif'};
var slots = {standard:['alien.png','cat.png','dancer.png','dog.png','poop.png','unicorn.png'],
  underWater:['whale.png','dolphin.png','blowfish.png','fish.png','tropical_fish.png', 'octopus.png'],
  fruit: ['strawberry.png', 'grapes.png','cherries.png','pineapple.png','kiwi.png','tangerine.png'],
  animals: ['fox.png','turtle.png','turkey.png','elephant.png','hatched_chick.png','butterfly.png'],
  sports: ['soccer.png','basketball.png','football.png','8ball.png','ping_pong.png','ski.png'],
  faces: ['heart_eyes.png','relaxed.png','rofl.png','pensive.png','triumph.png','scream.png'],
  team: ['quin.png', 'jose.jpg', 'tyler.png', 'alana.png']
};


/*********** USER CONSTRUCTOR ***********/
function User(userName) {
  this.userName = userName;
  this.rounds = 0;
  this.jackpots = 0;
  this.pairs = 0;
  this.difficulty = 'hard';
  this.prefferedSlots = 'standard';
}
/*********** USER METHODS ***********/

User.prototype.slots = function() {
  if (this.difficulty === 'easy') {
    return insertWild(slots[this.prefferedSlots], 2);
  } else if (this.difficulty === 'medium') {
    return insertWild(slots[this.prefferedSlots], 1);
  } else {
    return slots[this.prefferedSlots];
  }
};

User.prototype.resetStats = function(){
  this.jackpots = 0;
  this.pairs = 0;
  this.rounds = 0;
};

User.prototype.moneyBalance = function() {
  return (this.pairs * pairWorth + this.jackpots * jackpotWorth ) - this.rounds + initialBalance;
};

User.prototype.losses = function() {
  return this.rounds - (this.jackpots + this.pairs);
};

/*********** DATA METHODS ***********/

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

/*********** HELPER FUNCTIONS ***********/
//source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function insertWild(array, wilds) {
  var temp = array.slice();
  shuffle(temp);
  temp.splice(0,wilds);
  var toAdd = Array(wilds).fill(Data.wild);
  return temp.concat(toAdd);
}

function convertObjectToUser(object) {
  var user = new User(object.userName);
  user.rounds = object.rounds;
  user.jackpots = object.jackpots;
  user.pairs = object.pairs;
  user.difficulty = object.difficulty;
  user.prefferedSlots = object.prefferedSlots;
  return user;
}
