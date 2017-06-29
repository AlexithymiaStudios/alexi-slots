'use strict';

/*********** VARIABLE ***********/

var emojiArray = []; // This is populated from current user slots
var currentEmojis = [];
var playButton = document.getElementById('playButton');
var userNameSpan = document.getElementById('userName'); // Is this id name okay?
var game = document.getElementById('game');
var wild = 'wildcard.gif';

/*********** MAIN FLOW ***********/
// get data and name
if (Data.loadCurrentUser() === null) {
  // load settings page
  window.location.href = 'options.html';
} else if(Data.loadCurrentUser().moneyBalance() < 1){
  isOutOfMoney();
} else {
  var currentUser = Data.loadCurrentUser();
  emojiArray = currentUser.slots();
  renderUserName();
  renderBalance();
}

/*********** EVENT HANDLING ***********/
// when play button is clicked
playButton.addEventListener('click', function(){
  // add disabled property to button so it can't be clicked during animation
  playButton.disabled = true;
  // remove response backgrounds
  response.className = ' ';
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
  // Render new balance
  setTimeout(renderBalance,1600);
  // check if user is out of money
  currentUser = Data.loadCurrentUser();
  //if balance is 0
  setTimeout(isOutOfMoney, 2050);
  // turn button back on
});

/*********** FUNCTIONS ***********/
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
  for (var i = 0; i < divs.length; i++) {
    // divs[i].removeChild(divs[i].lastChild); // remove image from div
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'column col-3 slotWindow');
    newDiv.className += ' blinking' + [i];
    game.replaceChild(newDiv, divs[i]); // replace div with newDiv
    var img = document.createElement('img'); // create new img
    img.setAttribute('src', 'img/' + currentEmojis[i]);
    img.setAttribute('alt', currentEmojis[i]);
    img.setAttribute('class','animation' + i);
    newDiv.append(img); //append img to new clone
  }
}

function updateWins(){
  var response = document.getElementById('response');
  var left = currentEmojis[0];
  var mid = currentEmojis[1];
  var right = currentEmojis[2];
  if (
    left === mid && left === right ||
    left === wild && mid === right ||
    mid === wild && left === right ||
    right === wild && left === mid ||
    left === wild && mid === wild ||
    mid === wild && right === wild ||
    left === wild && right === wild
    ) {
    // update jackpots and response in currentUser
    currentUser.jackpots++;
    setTimeout(function(){
      response.className = ' jackpotBigBG';
      winningDivAnimations('jackpotBackground');
      winningImgAnimations('jackpotZoom');
    }, 1600);
  } else if (
    left === mid ||
    left === wild ||
    mid === wild
    )
     {
    currentUser.pairs++;
    setTimeout(function(){
      response.className = ' pairBigBG';
      winningDivAnimations('pairBackground');
      winningImgAnimations('pairZoom');
    }, 1600);
  } else {
    response.className = ' ';
    winningDivAnimations(' ');
    winningImgAnimations(' ');
  }
}

function winningDivAnimations(className){
  var divs = document.getElementsByClassName('slotWindow');
  divs[0].className += ' ' + className;
  divs[1].className += ' ' + className;
  if (className === 'jackpotBackground' || className === ' ') {
    divs[2].className += ' ' + className;
  }
}

function winningImgAnimations(className){
  var divs = document.getElementsByClassName('slotWindow');
  divs[0].lastChild.className += ' ' + className;
  divs[1].lastChild.className += ' ' + className;
  if (className === 'jackpotZoom' || className === ' ') {
    divs[2].lastChild.className += ' ' + className;
  }
}

function renderUserName(){
  // update text content of the span
  userNameSpan.textContent = currentUser.userName;
}

// function to render new balance
function renderBalance(){
  // get refernece to span
  var span = document.getElementById('balance');
  // update HTML in span
  span.textContent = currentUser.moneyBalance();
}

function isOutOfMoney(){
  var currentUser = Data.loadCurrentUser();
  //if balance is 0
  if (currentUser.moneyBalance() < 1) {
    alert ('You\'ve out of money! Please reset your wallet.');
    window.location.href = 'options.html';
    return true;
  }
  playButton.disabled = false; // re enable button click now that the spin has complete
  return false;
}
