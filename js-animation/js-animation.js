window.onload = function() {
	document.getElementById('path1').onclick = function() {
		move(this.children[0], delta_linear);
	}

	document.getElementById('path2').onclick = function() {
		move(this.children[0], delta_quad);
	}

	document.getElementById('path3').onclick = function() {
		move(this.children[0], delta_circ);
	}

	document.getElementById('path4').onclick = function() {
		move(this.children[0], delta_back);
	}

	document.getElementById('path5').onclick = function() {
		move(this.children[0], delta_bounce);
	}

	document.getElementById('path6').onclick = function() {
		move(this.children[0], delta_elastic);
	}

	document.getElementById('path7').onclick = function() {
		move(this.children[0], bounceEaseOut);
	}

	document.getElementById('path8').onclick = function() {
		move(this.children[0], bounceEaseInOut);
	}
};

function delta_linear(progress) {
	return progress;
}

function delta_quad(progress) {
  return Math.pow(progress, 2);
}

function delta_circ(progress) {
    return 1 - Math.sin(Math.acos(progress));
}

/*function delta_back(progress, x) {	
    return Math.pow(progress, 2) * ((x + 1) * progress - x);
}*/

function delta_back(progress) {	
    return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5);
}

function delta_bounce(progress) {
  for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (progress >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
    }
  }
}

/*function delta_elastic(progress, x) {
  return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*x/3*progress)
}*/

function delta_elastic(progress) {
  return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*1.5/3*progress);
}

/*easeOut start*/
function makeEaseOut(delta) {  
  return function(progress) {
    return 1 - delta(1 - progress);
  }
}
var bounceEaseOut = makeEaseOut(delta_bounce);
/*easeOut end*/

/*easeInOut start*/
function makeEaseInOut(delta) {  
  return function(progress) {
    if (progress < .5) //动画开始的前半段
      return delta(2*progress) / 2;
    else  //动画的后半段
      return (2 - delta(2*(1-progress))) / 2;
  }
}

bounceEaseInOut = makeEaseInOut(delta_bounce);
/*easeInOut end*/

function move(element, delta, duration) {
  var to = 500;
  
  animate({
    delay: 10,
    duration: duration || 1000, // 1 sec by default
    delta: delta,
    step: function(delta) {
      element.style.left = to*delta + "px";
    }
  });
  
}

function animate(opts) {

	var start = new Date;

    var id = setInterval(function() {
		var timePassed = new Date - start;
		var progress = timePassed / opts.duration;

		if (progress > 1) {
			progress = 1;
		}
		
		var delta = opts.delta(progress);
		opts.step(delta);
		
		if (progress == 1) {
			clearInterval(id);
		}
	}, opts.delay || 10);

}

/*function highlight(elem) {
  var from = [255,0,0], to = [255,255,255]
  animate({
    delay: 10,
    duration: 1000,
    delta: linear,
    step: function(delta) {
      elem.style.backgroundColor = 'rgb(' +
        Math.max(Math.min(parseInt((delta * (to[0]-from[0])) + from[0], 10), 255), 0) + ',' +
        Math.max(Math.min(parseInt((delta * (to[1]-from[1])) + from[1], 10), 255), 0) + ',' +
        Math.max(Math.min(parseInt((delta * (to[2]-from[2])) + from[2], 10), 255), 0) + ')';
    }
  });  
}*/
