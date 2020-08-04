const X = "X";
const O = "O";
const EMPTY = null;

let rows = [];

// ========================== //
// 				GAME RUNNER				  //
// ========================== //

let ttt = initial_state();

function reset() {
	rows = [];
	const container = document.getElementById("container");
	container.innerHTML = "";
	let boards = [];
	boards.push(initial_state());
	const row = new Row(boards, 0);
	rows.push(row);
	container.appendChild(row.getDisplayRow());
}

function updateRow(createNew) {
	if (createNew) {
		const container = document.getElementById("container");
		const newRow = document.createElement("div");
		newRow.classList.add("boardRow");
		container.appendChild(newRow);
		draw(newRow);
	} else {
		const current_row = document.getElementById("container").lastElementChild;
		console.log("Hmm 🤓");
	}
}

function updateBoard(board) {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			let cell = document.createElement("div");
			cell.innerHTML = ttt[i][j] === null ? "&nbsp;" : ttt[i][j];
			cell.dataset.idx = i;
			cell.dataset.idy = j;
			cell.id = "cell-" + i.toString() + j.toString();
			if (ttt[i][j] === null) {
				cell.addEventListener("click", play, true);
			}
			board.appendChild(cell);
		}
	}
	return board;
}

function draw(parentRow) {
	const board = document.createElement("board");
	board.classList.add("board");
	board.innerHTML = "";
	const updatedBoard = updateBoard(board);
	parentRow.appendChild(updatedBoard);
}

function announce_gameover() {
	check_winner = winner(ttt);
	if (check_winner !== null) {
		alert(check_winner + " has won!");
	} else {
		alert("No winner");
	}
}

function play() {
	const container = document.getElementById("container");
	let move = [];
	move.push(+this.dataset.idx);
	move.push(+this.dataset.idy);
	const row_depth = this.parentElement.parentElement.dataset.depth;

	const current_row = rows[row_depth];
	const current_board = current_row.getBoardFromBoardNum(
		this.parentElement.dataset.board
	);

	current_player = player(current_board);
	current_board[move[0]][move[1]] = current_player;
	this.classList.add("player");
	this.removeEventListener("click", play, true);

	current_row.updateBoard(this.parentElement.dataset.board, current_board);
	// console.log(current_row);
	// if (current_row.depth < rows[rows.length - 1]) {
	// 	for (let i = rows.length - 1; i > current_row.depth; i--) {
	// 		const el = document.getElementById(i);
	// 		console.log(el);
	// 		container.removeChild(el);
	// 	}
	// }
	container.removeChild(this.parentElement.parentElement);
	container.appendChild(current_row.getDisplayRow());
	rows.pop();
	rows.push(current_row);

	if (terminal(current_board)) {
		return;
	} else {
		current_player = player(current_board);
		move = getBestMove(current_board);
		let minimaxMoveIndex;

		let boards = [];
		const av_actions = actions(current_board);
		for (let i = 0; i < av_actions.length; i++) {
			boards.push(result(current_board, av_actions[i]));
			if (av_actions[i][0] === move[0] && av_actions[i][1] === move[1]) {
				minimaxMoveIndex = i;
			}
		}

		const newRow = new Row(boards, current_row.depth + 1, minimaxMoveIndex);
		rows.push(newRow);
		container.appendChild(newRow.getDisplayRow());
		// current_board[move[0]][move[1]] = current_player;
		// this.classList.add("ai");
		// this.removeEventListener("click", play, true);

		// current_row.updateBoard(this.parentElement.dataset.board, current_board);
	}
	if (terminal(current_board)) {
		return;
	}
}

reset();
