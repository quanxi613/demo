function showNumWithAnimate(i, j, value) {
	var numCellItem = $('#num-cell-'+i+'-'+j);
	numCellItem.text(value);
	numCellItem.css('background-color', getNumberBackgroundColor(value));
	numCellItem.css('color', getNumberColor(value));
	numCellItem.animate({
		width: '100px', 
		height: '100px',
		top: getCellTop(i,j),
		left: getCellLeft(i,j)
	}, 50);
}

function showMoveAnimate(fromX, fromY, toX, toY) {
	var numCellItem = $('#num-cell-'+fromX+'-'+fromY);
	numCellItem.animate({		
		top: getCellTop(toX,toY),
		left: getCellLeft(toX,toY)
	}, 200);
}