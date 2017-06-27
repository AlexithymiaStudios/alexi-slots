'use strict';

var emojiArray = ['alien.png','cat.png','dancer.png','dog.png','poop.png','unicorn.png'];
var currentEmojis = [];
var playButton = document.getElementById('playButton');
var image1 = document.getElementById('img1');
var image2 = document.getElementById('img2');
var image3 = document.getElementById('img3');
var userNameSpan = document.getElementById('userName'); // Is this id name okay?
var response = document.getElementById('response');
var imageArray = [image1, image2, image3];

// TODO: this is a fake function that we're using for testing. Delete before pushing.
// var currentUser = {username: 'Quinn', rounds: 0, wins:0};

// get data and name
if (Data.loadCurrentUser() === null) {
  //TODO - get persistance
  // load settings page
  // window.location.href = 'options.html';
  var currentUser = {userName: 'Quinn', rounds: 0, wins:0};
  // Render username on page
  renderUserName();
} else {
  currentUser = Data.loadCurrentUser(); //TODO - get persistance
  renderUserName();
}

// when play button is clicked
playButton.addEventListener('click', function (event) {
  // picks a random img from emojiArray
  currentEmojis = getRandomEmojis();
  // update rounds in currentUser
  currentUser.rounds++;
  // update rendered image to DOM
  renderEmojis();
  // if three img are same
  updateWins();
  console.log(currentEmojis);
  console.log(checkIdentical(currentEmojis));
  renderResponse();
  // update localStorage with new currentUser
  Data.saveUser(currentUser); //TODO - get persistance
  // get new data from localStorage
  Data.loadCurrentUser(); //TODO - get persistance
});

// Function to render username
function renderUserName() {
  // update text content of the span
  userNameSpan.textContent = currentUser.userName;
}
var threeEmojis = [];
// Function to get three random emoji images.
function getRandomEmojis() {
  for (var i = 0; i < 3; i++) {
    var random = Math.floor(Math.random() * emojiArray.length);
    threeEmojis.push(emojiArray[random]);
  }
  return threeEmojis;
}

//Function to render images
function renderEmojis() {
  for (var i = 0; i < currentEmojis.length; i++) {
    console.log('hello');
    imageArray[i].setAttribute('src', 'img/' + currentEmojis[i]);
    imageArray[i].setAttribute('alt', currentEmojis[i]);
  }
}

//Functio to check idential images
function checkIdentical(array) {
  for(var i = 0; i < array.length - 1; i++) {
    if(array[i] !== array[i + 1]) {
      return false;
    }
  }
  return true;
}

//Function to update wins
function updateWins() {
  // if (currentEmojis[0] === currentEmojis[1] && currentEmojis[0] === currentEmojis[2])
  // threeEmojis = getRandomEmojis();
  if(checkIdentical(currentEmojis))
  {
    // update wins in currentUser
    // currentUser.wins++;
  }
}

//Function to render response
function renderResponse() {
  // var threeEmojis = getRandomEmojis();
  if (checkIdentical(currentEmojis)) {
    response.textContent = 'You win!';
  }
}
