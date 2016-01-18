var alfaBetaDecision = function(depth, player, alpha, beta) {
	var possibleMoves = getPossibleMoves();
	var bestRow = -1;
	var bestCol = -1;
	var currentScore;


	if(possibleMoves.length == 0 || depth == 0) {
		bestScore = evaluate();
		return {
			score: bestScore,
			col: bestCol,
			row:bestRow
		};
	}

	for (var i = 0; i < possibleMoves.length; i++) {
		var possibleMove = possibleMoves[i];
		board[possibleMove.col][possibleMove.row] = player;
		if(player == REALPLAYER) {
			currentScore = alfaBetaDecision(depth-1, COMPUTER, alpha, beta).score;
			if(currentScore > alpha) {
				alpha = currentScore;
				bestRow = possibleMove.row;
				bestCol = possibleMove.col;
			}
		} else if (player == COMPUTER) {
			currentScore = alfaBetaDecision(depth-1, REALPLAYER, alpha, beta).score;
			if(currentScore < beta) {
				beta = currentScore;
				bestRow = possibleMove.row;
				bestCol = possibleMove.col;

			}
		}

		board[possibleMove.col][possibleMove.row] = null;

		if (alpha >= beta) {
			break;
		}
	};

	var score;
	if(player == REALPLAYER) {
		score = alpha;
	} else {
		score = beta;
	}
	// console.log(score);
	return {
		score: score,
		row: bestRow,
		col: bestCol
	};
}

var evaluate = function() {
	var score = 0;
	score += evaluateLine(0, 0, 0, 1, 0, 2);  // row 0
	score += evaluateLine(1, 0, 1, 1, 1, 2);  // row 1
	score += evaluateLine(2, 0, 2, 1, 2, 2);  // row 2
	score += evaluateLine(0, 0, 1, 0, 2, 0);  // col 0
	score += evaluateLine(0, 1, 1, 1, 2, 1);  // col 1
	score += evaluateLine(0, 2, 1, 2, 2, 2);  // col 2
	score += evaluateLine(0, 0, 1, 1, 2, 2);  // diagonal
	score += evaluateLine(0, 2, 1, 1, 2, 0);  // second diagonal
	return score;
}

var evaluateLine = function( row1, col1, row2, col2, row3, col3) {
	var score = 0;

// first box
	if(board[row1][col1] == REALPLAYER) {
		score = 1;
	} else if(board[row1][col1] == COMPUTER) {
		score = -1;
	}

// second box
	if(board[row2][col2] == REALPLAYER) {
		if(score == 1) { //if first box is for player
			score = 10;
		} else if (score == -1) { //first box is for computer
			return 0;
		} else { // empty
			score = 1;
		}
	} else if(board[row2][col2] == COMPUTER) {
		if(score == -1) { //if first box is for player
			score = -10;
		} else if (score == 1) { //first box is for computer
			return 0;
		} else { // empty
			score = -1;
		}
	}

	if(board[row3][col3] == REALPLAYER) {
		if(score>0) { //box1 or and box 2 are for player
			score*=10;
		} else if (score < 0) { //box1 or and box 2 are for computer
			return 0;
		} else {
			score = 1; //box1 and box 2 are empty
		}
	} else if(board[row3][col3] == COMPUTER) {
		if(score < 0) { //box1 or and box 2 are for computer
			score*=10;
		} else if (score > 1) { //box1 or and box 2 are for player
			return 0;
		} else {
			score = -1; //box1 and box 2 are empty
		}
	}
	return score;
}

var getPossibleMoves = function() {
	var possibleMoves = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board.length; j++) {
			if(!board[i][j]) {
				possibleMoves.push({col:i, row:j});
			}
		}
	}
	return possibleMoves;
}