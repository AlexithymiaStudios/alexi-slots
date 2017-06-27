'use strict';

var emojiArray = ['alien.png','cat.png','dancer.png','dog.png','poop.png','unicorn.png'];
var currentEmojis = [];
var playButton = document.getElementById('playButton');
var image1 = document.getElementById('img1');
var image2 = document.getElementById('img2');
var image3 = document.getElementById('img3');
var userNameSpan = document.getElementById('userName'); // Is this id name okay?
var imageArray = [image1, image2, image3];

// TODO: this is a fake function that we're using for testing. Delete before pushing.
// var currentUser = {username: 'Quinn', rounds: 0, wins:0};

// get data and name
if (Data.loadCurrentUser() === null) {
  //TODO - get persistance
  // load settings page
  window.location.href = 'options.html';
  // Render username on page
  renderUserName();
} else {
  var currentUser = Data.loadCurrentUser(); //TODO - get persistance
  renderUserName();
}

// when play button is clicked
playButton.addEventListener('click', function(event){
  // picks a random img from emojiArray
  currentEmojis = getRandomEmojis();


  // img1.classList.remove('animation');

  // update rounds in currentUser
  currentUser.rounds++;
  // update rendered image to DOM
  renderEmojis();
  // if three img are same
  var img1 = document.getElementById('img1');
  img1.classList.add('animation');
  setTimeout(img1.classList.remove('animation'), 3000);
  updateWins();
  // update localStorage with new currentUser
  Data.saveUser(currentUser); //TODO - get persistance
  // get new data from localStorage
  Data.loadCurrentUser(); //TODO - get persistance
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
  var response = document.getElementById('response');
  if (currentEmojis[0] === currentEmojis[1] && currentEmojis[0] === currentEmojis[2]) {
    // update wins and response in currentUser
    currentUser.wins++;
    response.textContent = 'You win!';
  } else {
    response.textContent = ' ';
  }
}

function renderUserName(){
  // update text content of the span
  userNameSpan.textContent = currentUser.userName;
}
