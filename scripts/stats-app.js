'use strict';

/*********** VARIABLES ***********/
var allData = Data.getAllUsers();
var chartParent = document.getElementById('chart');
var userNames = [];
var losses = [];
var jackpots = [];
var pairs = [];

/*********** SETUP***********/
function setup(){
  // if no users are defined, switch to options page
  if (Data.loadCurrentUser() === null) {
    window.location.href = 'options.html';
  }
  setUpGraphData();
  drawGraph();
}

setup();
/*********** FUNCTIONS ***********/

function setUpGraphData(){
  for (var i in allData){
    userNames.push(allData[i].userName);
    losses.push(allData[i].losses());
    jackpots.push(allData[i].jackpots);
    pairs.push(allData[i].pairs);
  }
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
      data: data
    });
  }
}
