// ========================== //
// 				GAME LOGIC				  //
// ========================== //

function initial_state() {
	return [
		[EMPTY, EMPTY, EMPTY],
		[EMPTY, EMPTY, EMPTY],
		[EMPTY, EMPTY, EMPTY],
	];
}

function player(board) {
	let x = 0;
	let o = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === X) x++;
			else if (board[i][j] === O) o++;
		}
	}
	if (x == o) return X;
	else return O;
}

function actions(board) {
	let actions = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === EMPTY) actions.push([i, j]);
		}
	}
	return actions;
}

function result(board, action) {
	if (board[action[0]][action[1]] === EMPTY) {
		b = initial_state();
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				b[i][j] = board[i][j];
			}
		}
		b[action[0]][action[1]] = player(board);
		return b;
	} else {
		console.log("ERROR: INVALID ACTION ON BOARD");
		return board;
	}
}

function winner(board) {
	for (let i = 0; i < 3; i++) {
		if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
			if (board[i][0] !== EMPTY) return board[i][0];
		}
	}
	for (let j = 0; j < 3; j++) {
		if (board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
			if (board[0][j] !== EMPTY) return board[0][j];
		}
	}
	if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
		if (board[0][0] !== EMPTY) return board[0][0];
	} else if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
		if (board[0][2] !== EMPTY) return board[0][2];
	}
	return null;
}

function terminal(board) {
	if (winner(board) !== null) return true;
	for (let i = 0; i < 3; i++) {
		if (board[i].indexOf(null) !== -1) return false;
	}
	return true;
}

function utility(board) {
	const scores = {
		X: 1,
		O: -1,
		null: 0,
	};
	return scores[winner(board)];
}

function getBestMove(board) {
	let bestScore = player(board) === X ? -Infinity : +Infinity;
	let bestMove;

	let aa = actions(board); // aa = available actions

	for (let i = 0; i < aa.length; i++) {
		let score = minimax(result(board, aa[i]), 0);
		if (player(board) === O) {
			if (score < bestScore) {
				bestScore = score;
				bestMove = aa[i];
			}
		} else {
			if (score > bestScore) {
				bestScore = score;
				bestMove = aa[i];
			}
		}
	}
	return bestMove;
}

function minimax(board, depth) {
	if (terminal(board)) {
		return utility(board);
	}
	if (player(board) === "X") {
		let bestScore = -Infinity;
		let aa = actions(board);

		for (let i = 0; i < aa.length; i++) {
			let score = minimax(result(board, aa[i]), depth + 1);
			bestScore = Math.max(score, bestScore);
		}
		return bestScore;
	} else {
		let bestScore = +Infinity;
		let aa = actions(board);

		for (let i = 0; i < aa.length; i++) {
			let score = minimax(result(board, aa[i]), depth + 1);
			bestScore = Math.min(score, bestScore);
		}
		return bestScore;
	}
}
