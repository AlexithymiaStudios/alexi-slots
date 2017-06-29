'use strict';

var allData = Data.getAllUsers();
var chartParent = document.getElementById('chart');

var userNames = [];
var losses = [];
var jackpots = [];
var moneyBalance = [];
var pairs = [];
var initialBalance = 25;
var jackpotWorth = 3;
var pairWorth = 2;

// get data and name
if (Data.loadCurrentUser() === null) {
  window.location.href = 'options.html';
}

for (var i in allData) {
  userNames.push(allData[i].userName);
  losses.push(allData[i].losses());
  jackpots.push(allData[i].jackpots);
  pairs.push(allData[i].pairs);
  moneyBalance.push(pairs[i] * pairWorth + jackpots[i] * jackpotWorth - losses[i] + initialBalance);
}

//create a 2d array for userName and moneyBalance
var rank = [];
for (i = 0; i < userNames.length; i ++) {
  rank[i] = [userNames[i], moneyBalance[i]];
}
console.log(rank);
//sort 

//render a list
var list = document.getElementById('list');
var userUl = document.createElement('ul');
// var sortedMoneyBalance = moneyBalance.sort();
for (i = 0; i < userNames.length; i++) {
  var userLi = document.createElement('li');
  userLi.textContent = userNames[i] + ':' + moneyBalance[i];
  userUl.append(userLi);
}
list.append(userUl);

// prepare data for piechart
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
  // render user name
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

  // generate pie chart
  new Chart(ctx,{
    type: 'pie',
    data: data
  });
}
// console.log('-------');
// console.log(userNames);
