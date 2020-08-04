class Row {
	constructor(boards, depth = 0, minimaxMoveIndex = null) {
		this.boards = boards;
		this.depth = depth;
		this.minimaxMoveIndex = minimaxMoveIndex;
	}
	getBoardFromBoardNum(boardNum) {
		return this.boards[boardNum];
	}
	getDisplayRow() {
		this.element = document.createElement("div");
		this.element.classList.add("boardRow");
		this.element.dataset.depth = this.depth;
		this.element.setAttribute("id", this.depth);

		for (let i = 0; i < this.boards.length; i++) {
			let new_board = document.createElement("div");
			new_board.dataset.row = this.depth;
			new_board.dataset.board = i;
			new_board.classList.add("board");

			for (let bi = 0; bi < 3; bi++) {
				for (let bj = 0; bj < 3; bj++) {
					let cell = document.createElement("div");
					cell.innerHTML =
						this.boards[i][bi][bj] === null ? "&nbsp;" : this.boards[i][bi][bj];
					cell.dataset.idx = bi;
					cell.dataset.idy = bj;
					cell.id = "cell-" + bi.toString() + bj.toString();
					if (this.boards[i][bi][bj] === null) {
						cell.addEventListener("click", play, true);
					}
					new_board.appendChild(cell);
				}
			}
			if (i === this.minimaxMoveIndex) {
				new_board.classList.add("bestmove");
			}
			this.element.appendChild(new_board);
		}

		return this.element;
	}

	updateBoard(boardNum, udpatedBoard) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.boards[boardNum][i][j] = udpatedBoard[i][j];
			}
		}
	}
}
