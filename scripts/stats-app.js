'use strict';

var allData = Data.getAllUsers();
var chartParent = document.getElementById('chart');

var userNames = [];
var losses = [];
var jackpots = [];
var pairs = [];

for (var i in allData){
  userNames.push(allData[i].userName);
  losses.push(allData[i].losses());
  jackpots.push(allData[i].jackpots);
  pairs.push(allData[i].pairs);
}

for (var j = 0; j < userNames.length; j++){

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
  var userDiv = document.createElement('div');
  userDiv.setAttribute('class', 'column col-4 userChart');
  var h3 = document.createElement('h3');
  userDiv.append(h3);
  var canvas = document.createElement('canvas');
  h3.textContent = userNames[j];

  userDiv.append(h3);
  userDiv.append(canvas);
  chartParent.append(userDiv);
  var ctx = canvas.getContext('2d');

  // For a pie chart
  new Chart(ctx,{
    type: 'pie',
    data: data
  });
}
