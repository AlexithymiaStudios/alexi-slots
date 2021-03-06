'use strict';

/*********** VARIABLES ***********/
var allData = Data.getAllUsers();
var chartParent = document.getElementById('chart');
var rank = [];
var userNames = [];
var losses = [];
var jackpots = [];
var moneyBalance = [];
var pairs = [];
var rankList = [];

/*********** SETUP***********/
function setup(){
  // if no users are defined, switch to options page
  if (Data.loadCurrentUser() === null) {
    window.location.href = 'options.html';
  }
  setUpData();
  renderList();
  drawGraph();
}

setup();

/*********** FUNCTIONS ***********/

function setUpData() {
  for (var i in allData) {
    userNames.push(allData[i].userName);
    losses.push(allData[i].losses());
    jackpots.push(allData[i].jackpots);
    pairs.push(allData[i].pairs);
    moneyBalance.push(allData[i].moneyBalance());
  }

  //create a 2d array for userName and moneyBalance
  for (i = 0; i < userNames.length; i ++) {
    rank[i] = [userNames[i], moneyBalance[i]];
  }

  // sorted function inspired by StackOverflow
  rank.sort(function(a, b) {
    var avalue = a[1],
      bvalue = b[1];
    if (avalue < bvalue) {
      return -1;
    }
    if (avalue > bvalue) {
      return 1;
    }
    return 0;
  });

  // sorted function inspired by StackOverflow
  rank = rank.sort(function(a, b) {
    var avalue = a[1],
      bvalue = b[1];
    if (avalue < bvalue) {
      return -1;
    }
    if (avalue > bvalue) {
      return 1;
    }
    return 0;
  });
  rank = rank.reverse();

 //generate a rankList
  for (i = 0; i < userNames.length; i ++) {
    rankList[i] = i + 1;
  }
}

//render a list
function renderList() {
  var list = document.getElementById('list');
  var userUl = document.createElement('ol');
  for (var i = 0; i < rank.length; i++) {
    var userLi = document.createElement('li');
    userLi.textContent = rankList[i] + ': ' + rank[i][0] + ' (Balance: $' + rank[i][1] + ')';
    userUl.append(userLi);
  }
  list.append(userUl);
}

function drawGraph(){
  //for each user
  for (var j = 0; j < userNames.length; j++){
    // create the data set
    var data = {
      datasets: [{
        data: [losses[j],jackpots[j], pairs[j]],
        backgroundColor: ['red', 'blue', 'green']
      }],
      labels: [
        'Losses',
        'Jackpots',
        'Pairs'
      ]
    };

    // create elements for the user chart and append them to the window
    var userDiv = document.createElement('div');
    userDiv.setAttribute('class', 'column col-5 userChart');
    var h3 = document.createElement('h3');
    userDiv.append(h3);
    var canvas = document.createElement('canvas');
    h3.textContent = userNames[j];

    userDiv.append(h3);
    userDiv.append(canvas);
    chartParent.append(userDiv);
    var ctx = canvas.getContext('2d');

    // Draw the actual chart
    new Chart(ctx,{
      type: 'pie',
      data: data,
      options: {
        legend: {
          display: true,
          labels: {
            fontColor: 'white',
            fontSize: 20
          }
        }
      }
    });
  }
}
