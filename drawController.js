var drawBoard = function() {

	//horizontal lines
	context.moveTo(0,length/3);
	context.lineTo(length, length/3);
	context.stroke();

	context.moveTo(0,2*length/3);
	context.lineTo(length, 2*length/3);
	context.stroke();

	// vertical lines
	context.moveTo(length/3, 0);
	context.lineTo(length/3, length);
	context.stroke();

	context.moveTo(2*length/3, 0);
	context.lineTo(2*length/3, length);
	context.stroke();
}

var drawSymbol = function(col, row, symbol) {
	var half = length/6;
	if(symbol == REALPLAYER) {
		context.beginPath();
		context.arc(col*length/3 + half, row*length/3 + half, half, 0, 2*Math.PI);
		context.stroke();
	} else if(symbol == COMPUTER) {
		context.beginPath();
		context.moveTo(col*length/3, row*length/3);
		context.lineTo(col*length/3 + length/3, row*length/3 + length/3);
		context.stroke();

		context.moveTo(col*length/3 + length/3, row*length/3);
		context.lineTo(col*length/3, row*length/3 + length/3);
		context.stroke();
	}
}

var drawFullBoard = function() {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board.length; j++) {
			if(board[i][j] == COMPUTER || board[i][j] == REALPLAYER) {
				drawSymbol(i,j,board[i][j]);
			}
		}
	}
}