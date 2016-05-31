var board = new Array();


$(document).ready(function () {
	newgame();
});

function newgame() {
	//初始化棋盘
	init();
	//随机在两个格子里生成数字
	generateOneNum();
	generateOneNum();
}

function init() {
	for(var i=0;i<4;i++) {
		for(var j=0;j<4;j++) {
			var gridCell = $('#grid-cell-'+i+'-'+j);
			gridCell.css('top', getCellTop(i,j));
			gridCell.css('left', getCellLeft(i,j));
		}
	}

	for(var i=0;i<4;i++) {
		board[i] = new Array();
		for(var j=0;j<4;j++) {
			board[i][j] = 0;
		}
	}

	updateBoardView();
}

function updateBoardView() {
	$('.num-cell').remove();

	for(var i=0;i<4;i++) {		
		for(var j=0;j<4;j++) {
			$('#grid-container').append('<div class="num-cell" id="num-cell-'+i+'-'+j+'"></div>');
			var numCellItem = $('#num-cell-'+i+'-'+j);
			var numCellItemVal = board[i][j];
			if(numCellItemVal == 0) {
				numCellItem.css('width', '0px');
				numCellItem.css('height', '0px');
				numCellItem.css('top', getCellTop(i,j)+50);
				numCellItem.css('left', getCellLeft(i,j)+50);
			}
			else {
				numCellItem.css('width', '100px');
				numCellItem.css('height', '100px');
				numCellItem.css('top', getCellTop(i,j));
				numCellItem.css('left', getCellLeft(i,j));
				numCellItem.text(numCellItemVal);
				numCellItem.css('background-color', getNumberBackgroundColor(numCellItemVal));
				numCellItem.css('color', getNumberColor(numCellItemVal));
			}
		}
	}
}

function generateOneNum() {
	//首先判断该面板上是否还有位置生成数字
	if(noSpace(board)) {
		return false;
	}

	//随机生成一个位置, 0-4之间
	var randomX = parseInt(Math.floor(Math.random() * 4));
	var randomY = parseInt(Math.floor(Math.random() * 4));
	//判断该位置是否有值
	while(true) {
		if(board[randomX][randomY] == 0) {
			break;
		}

		randomX = parseInt(Math.floor(Math.random() * 4));
		randomY = parseInt(Math.floor(Math.random() * 4));
	}

	//随机生成位置上的值, 2或4(分别是50%的概率)
	var randomNum = Math.random() < 0.5 ? 2 : 4;

	//在该随机位置上显示随机值
	board[randomX][randomY] = randomNum;
	//显示数据的动画效果
	showNumWithAnimate(randomX, randomY, randomNum);

	return true;
}

$(document).keydown(function(e) {
	switch(e.keyCode) {
		//left
		case 37:
			//判断是否能够左移
			if(moveLeft()) {
				generateOneNum();
				isGameOver();
			}
			break;
		//up
		case 38:
			if(moveUp()) {
				generateOneNum();
				isGameOver();
			}
			break;
		//right
		case 39:
			if(moveRight()) {
				generateOneNum();
				isGameOver();
			}
			break;
		//down
		case 40:
			if(moveDown()) {
				generateOneNum();
				isGameOver();
			}
		    break;
		defalut:
			break;
	}
});

function isGameOver() {

}

function moveLeft() {
	//先判断是否还可以左移
	if(!canMoveLeft(board)) {
		return false;
	}

	for(var i=0;i<4;i++) {
		for(var j=1;j<4;j++) {
			if(board[i][j] != 0) {
				for(var k=0;k<j;k++) {
					if(board[i][k] == 0 && noBarrierCol(i,k,j,board)) {
						//move操作
						showMoveAnimate(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBarrierCol(i,k,j,board)) {
						//move操作,叠加
						showMoveAnimate(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}

function moveRight() {
	//先判断是否还可以右移
	if(!canMoveRight(board)) {
		return false;
	}

	for(var i=0;i<4;i++) {
		for(var j=2;j>=0;j--) {
			if(board[i][j] != 0) {
				for(var k=3;k>j;k--) {
					if(board[i][k] == 0 && noBarrierCol(i,j,k,board)) {
						//move操作
						showMoveAnimate(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBarrierCol(i,j,k,board)) {
						//move操作,叠加
						showMoveAnimate(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}

function moveUp() {
	//先判断是否还可以上移
	if(!canMoveUp(board)) {
		return false;
	}

	for(var j=0;j<4;j++) {
		for(var i=1;i<4;i++) {
			if(board[i][j] != 0) {
				for(var k=0;k<i;k++) {
					if(board[k][j] == 0 && noBarrierRow(j,k,i,board)) {
						//move操作
						showMoveAnimate(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBarrierRow(j,k,i,board)) {
						//move操作,叠加
						showMoveAnimate(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}

function moveDown() {
	//先判断是否还可以上移
	if(!canMoveDown(board)) {
		return false;
	}

	for(var j=0;j<4;j++) {
		for(var i=2;i>=0;i--) {
			if(board[i][j] != 0) {
				for(var k=3;k>i;k--) {
					if(board[k][j] == 0 && noBarrierRow(j,i,k,board)) {
						//move操作
						showMoveAnimate(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBarrierRow(j,i,k,board)) {
						//move操作,叠加
						showMoveAnimate(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);

	return true;
}
