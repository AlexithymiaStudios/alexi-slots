'use strict';

var allData = Data.getAllUsers();
var chartParent = document.getElementById('chart');

var userNames = [];
var rounds = [];
var wins = [];

for (var i in allData){
  userNames.push(allData[i].userName);
  rounds.push(allData[i].rounds);
  wins.push(allData[i].wins);
}

for (var j = 0; j < userNames.length; j++){

  var data = {
    datasets: [{
      data: [rounds[j],wins[j]],
      backgroundColor: ['red', 'blue']
    }],
    labels: [
      'Round',
      'Wins'
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
