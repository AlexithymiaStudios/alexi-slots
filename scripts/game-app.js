'use strict';

var emojiArray = ['alien.png','cat.png','dancer.png','dog.png','poop.png','unicorn.png'];
var currentEmojis = [];
var playButton = document.getElementById('playButton');
var image1 = document.getElementById('img1');
var image2 = document.getElementById('img2');
var image3 = document.getElementById('img3');
var imageArray = [image1, image2, image3];

// TODO: this is a fake function that we're using for testing. Delete before pushing.
function loadCurrentUser(){
  return {username: 'Quinn', rounds: 0, wins:0};
}

// get data and name
if (loadCurrentUser() === null) { //TODO - get persistance
  // load settings page
} else {
  var currentUser = loadCurrentUser(); //TODO - get persistance
}

// when play button is clicked
playButton.addEventListener('click', function(event){
  // picks a random img from emojiArray
  currentEmojis = getRandomEmojis();
  // update rounds in currentUser
  currentUser.rounds++;
  // update rendered image to DOM
  renderEmojis();
  // if three img are same
  updateWins();
  // update localStorage with new currentUser
  saveUser(currentUser); //TODO - get persistance
  // get new data from localStorage
  loadCurrentUser(); //TODO - get persistance
});

// Function to get three random emoji images.
function getRandomEmojis(){
  var threeEmojis = [];
  for (var i = 0; i < 3; i++) {
    var random = Math.floor(Math.random() * emojiArray.length);
    threeEmojis.push(emojiArray[random]);
  }
  return threeEmojis;
}

function renderEmojis(){
  for (var i = 0; i < currentEmojis.length; i++) {
    imageArray[i].setAttribute('src', 'img/' + currentEmojis[i]);
    imageArray[i].setAttribute('alt', currentEmojis[i]);
  }
}

function updateWins(){
  if (currentEmojis[0] === currentEmojis[1] && currentEmojis[0] === currentEmojis[2]) {
    // update wins in currentUser
    currentUser.wins++;
  }
}
