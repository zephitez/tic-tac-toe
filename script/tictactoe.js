//global declaration
var imgBox = document.querySelectorAll('img');
var myPage = document.querySelector("body");
var divInput = document.querySelectorAll('div.input');
var player1 = 'Player 1';
var player2 = 'Player 2';
var turn = 'x';

myPage.addEventListener("load", startGame());

//Load at start of Game
function startGame() {
  setMessage(player1 + ' gets to start.');
}

//Set Message to status
function setMessage(msg) {
  var displayBox = document.querySelector('div.status');
  displayBox.innerHTML = msg;
}

//function for image loading
function theme(x, o, empty) {
  this.imagex = x;
  this.imageo = o;
  this.empty = empty;
}

//new theme
var cutefont = new theme('http://i.imgur.com/17BRhrG.png', 'http://i.imgur.com/l12f0jf.png', 'http://i.imgur.com/nS9e6jZ.png');

//restart button to refresh game
function refreshButton() {
  var refresh = myPage.querySelector('div.restart');
  refresh.addEventListener('click', function() {
    turn = 'x';
    for (var i in imgBox) {
      imgBox[i].src = cutefont.empty;
      setMessage(player1 + ' gets to start.');
    }
  });
}
refreshButton();

// when user click a square
function newMove() {
  for (var i = 0; i < divInput.length; i++) {
    divInput[i].addEventListener('click', UserMove);
  }
}
newMove();

//User Move
function UserMove() {
  var user = this.querySelector('img');
  if (turn != 'end') {
    if (user.src == cutefont.empty) {
      if (turn == 'x') {
        user.src = cutefont.imagex;
        setMessage('It\'s ' + player2 + '\'s turn!');
      } else {
        user.src = cutefont.imageo;
        setMessage('It\'s ' + player1 + '\'s turn!');
      }
      switchTurn();
    } else {
      setMessage('You shall not pass!');
    }
  } else {
    setMessage('Game Over. Click restart');
  }
}

//switch Turn Indicator
function switchTurn() {
  switch (turn) {
    case 'x':
      if (winner(cutefont.imagex)) {
        setMessage('Congratulations! ' + player1 + ' Wins!');
        turn = 'end';
      } else if (tie()){
          setMessage('It\'s a Draw!');
          turn = 'end';
      }
      else {
        turn = 'o';
      }
      break;
    case 'o':
      if (winner(cutefont.imageo)) {
        setMessage('Congratulations! ' + player2 + ' Wins!');
        turn = 'end';
      } else if (tie()){
          setMessage('It\'s a Draw!');
          turn = 'end';
      } else {
        turn = 'x';
      }
      break;
    default:
      turn = 'x';
  }
}

//check if there's winner
function winner(sameInd) {
  var result = false;
  if (threeSameBox(1, 2, 3, sameInd) ||
    threeSameBox(4, 5, 6, sameInd) ||
    threeSameBox(7, 8, 9, sameInd) ||
    threeSameBox(1, 4, 7, sameInd) ||
    threeSameBox(2, 5, 8, sameInd) ||
    threeSameBox(3, 6, 9, sameInd) ||
    threeSameBox(3, 5, 7, sameInd) ||
    threeSameBox(1, 5, 9, sameInd)) {
    result = true;
  }
  return result;
}

//check three Same Selection in a row, column, diagonal
function threeSameBox(a, b, c, sameInd) {
  var result = false;
  if (getBox(a) == sameInd && getBox(b) == sameInd && getBox(c) == sameInd) {
    result = true;
  }
  return result;
}

function tie() {
  var allBox = [];
  for (var i = 1; i <= imgBox.length; i++) {
    if (getBox(i) != cutefont.empty) {
      allBox.push('1');
    }
  }
  if (allBox.length == 9) {
  return true;
}
}



function getBox(number) {
  var boxNum = document.getElementById('box' + number);
  return boxNum.src;
}
