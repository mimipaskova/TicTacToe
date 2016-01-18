var REALPLAYER = 1;
var COMPUTER = 2;
var turn = COMPUTER;
var length = 300;

var canvas,context;
var board = Array(3);
board[0] = Array(3);
board[1] = Array(3);
board[2] = Array(3);

window.onload = function() {
	canvas = document.getElementById("board");
	context = canvas.getContext("2d");

	canvas.addEventListener("click", handleMouseClick);
	update();	
}

var handleMouseClick = function(event) {
	if(turn == REALPLAYER) {
		var col = parseInt((event.clientX / (length/3)));
		var row = parseInt((event.clientY / (length/3)));
		if(!board[col][row]) {
			board[col][row] = REALPLAYER;
			// console.log(JSON.stringify(board));
			turn = COMPUTER;
		}

	}
}

var update = function() {
	context.clearRect(0,0,length,length);

	if(turn == COMPUTER) {
		var computerMove = alfaBetaDecision(2, REALPLAYER, -Infinity, +Infinity);
		board[computerMove.col][computerMove.row] = COMPUTER;
		turn = REALPLAYER;
	}

	drawBoard();
	drawFullBoard();
	if(!isWinningComputer())
		setTimeout(update, 60);
}

var isWinningComputer = function() {
	if(compareBoxes(0,0,0,1,0,2) || compareBoxes(1,0,1,1,1,2) || compareBoxes(2, 0, 2, 1, 2, 2)
		||	compareBoxes(0, 0, 1, 0, 2, 0) ||	compareBoxes(0, 1, 1, 1, 2, 1) ||	compareBoxes(0, 2, 1, 2, 2, 2)
		||	compareBoxes(0, 0, 1, 1, 2, 2) || 	compareBoxes(0, 2, 1, 1, 2, 0))
	{
		alert("The computer wins!");
		return true;
	}
	return false;
}

var compareBoxes = function(x1,y1,x2,y2,x3,y3) {
	return board[x1][y1] == board[x2][y2] && board[x2][y2] == board[x3][y3] && board[x1][y1]!= null;
}