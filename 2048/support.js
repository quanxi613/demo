function getCellTop(i,j) {
	return 20+120*i;
}

function getCellLeft(i,j) {
	return 20+120*j;
}

function getNumberBackgroundColor(number){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

function getNumberColor(number){
    if( number <= 4 )
        return "#776e65";

    return "white";
}



function noSpace(board) {
	for(var i=0;i<4;i++) {
		for(var j=0;j<4;j++) {
			if(board[i][j] == 0) {
				return false;
			}
		}
	}

	return true;
}

function canMoveLeft(board) {
	for(var i=0;i<4;i++) {
		for(var j=1;j<4;j++) {
			if(board[i][j] != 0) {
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveRight(board) {
	for(var i=0;i<4;i++) {
		for(var j=0;j<3;j++) {
			if(board[i][j] != 0) {
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveUp(board) {
	for(var j=0;j<4;j++) {
		for(var i=1;i<4;i++) {
			if(board[i][j] != 0) {
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}

	return false;
}

function canMoveDown(board) {
	for(var j=0;j<4;j++) {
		for(var i=2;i>=0;i--) {
			if(board[i][j] != 0) {
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}

	return false;
}

function noBarrierCol(row, rol1, rol2, board) {
	for(var m=rol1+1;m<rol2;m++) {
		if(board[row][m] != 0) {
			return false;
		}
	}
	
	return true;
}

function noBarrierRow(rol, row1, row2, board) {
	for(var m=row1+1;m<row2;m++) {
		if(board[m][rol] != 0) {
			return false;
		}
	}
	
	return true;
}

function noMove(board) {
	if(canMoveLeft(board) 
		|| canMoveRight(board)
		|| canMoveUp(board)
		|| canMoveDown(board)) {
		return false;
	}

	return true;
}

function updateScore(score) {
	$('#score').text(score);
}
