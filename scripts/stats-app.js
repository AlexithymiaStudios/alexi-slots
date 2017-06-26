'use strict';

var allData = Data.getAllUsers();
var chartParent = document.getElementById('chart');
// console.log(allData);

var userNames = [];
var rounds = [];
var wins = [];

for (var i in allData){
  userNames.push(allData[i].userName);
  rounds.push(allData[i].rounds);
  wins.push(allData[i].wins);
}
console.log(userNames);
console.log(rounds);
console.log(wins);

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

  var h3 = document.createElement('h3');
  console.log('hi');
  var canvas = document.createElement('canvas');
  h3.textContent = userNames[j];
  chartParent.append(h3);
  chartParent.append(canvas);
  var ctx = canvas.getContext('2d');

  // For a pie chart
  new Chart(ctx,{
    type: 'pie',
    data: data
  });
}
