const X = "X";
const O = "O";
const EMPTY = null;

let rows = [];

// ========================== //
// 				GAME RUNNER				  //
// ========================== //

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

function announce_gameover() {}

function play() {
	const container = document.getElementById("container");
	let move = [];
	move.push(+this.dataset.idx);
	move.push(+this.dataset.idy);
	const curr_row_depth = this.parentElement.parentElement.dataset.depth;

	const current_row = rows[curr_row_depth];
	const current_board = current_row.getBoardFromBoardNum(
		this.parentElement.dataset.board
	);

	current_player = player(current_board);
	current_board[move[0]][move[1]] = current_player;
	this.classList.add("player");
	this.removeEventListener("click", play, true);

	let num_rows_to_be_removed = rows.length - curr_row_depth;
	for (let i = 0; i < num_rows_to_be_removed; i++) {
		container.removeChild(container.lastElementChild);
		rows.pop();
	}
	current_row.updateBoard(this.parentElement.dataset.board, current_board);
	container.appendChild(current_row.getDisplayRow());
	rows.push(current_row);

	if (terminal(current_board)) {
		return;
	} else {
		aiplay(current_row, current_board);
	}
}
function aifirstmove() {
	reset();
	const container = document.getElementById("container");
	let current_row = rows[0];
	let current_board = current_row.boards[0];

	const av_actions = actions(current_board);
	let move = av_actions[Math.floor(Math.random() * av_actions.length)];

	current_board[move[0]][move[1]] = player(current_board);
	current_row.updateBoard(0, current_board);
	container.removeChild(container.lastElementChild);
	container.appendChild(current_row.getDisplayRow());
	rows.pop();
	rows.push(current_row);
}
function aiplay(current_row, current_board) {
	const container = document.getElementById("container");
	let move = getBestMove(current_board);

	let boards = [];
	const av_actions = actions(current_board);
	av_actions.pop(av_actions.indexOf(move));
	boards.push(result(current_board, move));

	for (let i = 0; i < av_actions.length; i++) {
		boards.push(result(current_board, av_actions[i]));
	}

	const newRow = new Row(boards, current_row.depth + 1, 0);
	rows.push(newRow);
	container.appendChild(newRow.getDisplayRow());

	if (terminal(current_board)) {
		return;
	}
}
