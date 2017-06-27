'use strict';
/************ VARIABLE ************/
var emojiArray = ['alien.png','cat.png','dancer.png','dog.png','poop.png','unicorn.png'];
var currentEmojis = [];
var playButton = document.getElementById('playButton');
var userNameSpan = document.getElementById('userName'); // Is this id name okay?

// get data and name
if (Data.loadCurrentUser() === null) {
  //TODO - get persistance
  // load settings page
  window.location.href = 'options.html';
  // Render username on page
  renderUserName();
} else {
  var currentUser = Data.loadCurrentUser();
  renderUserName();
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
  Data.saveUser(currentUser);

  // get new data from localStorage
  Data.loadCurrentUser();
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
  var divs = document.getElementsByClassName('slotWindow');
  for (var i = 0; i < currentEmojis.length; i++) {
    divs[i].removeChild(divs[i].lastChild);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/' + currentEmojis[i]);
    img.setAttribute('alt', currentEmojis[i]);
    img.setAttribute('class','animation');
    divs[i].append(img);
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
