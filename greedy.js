!function(win, doc) {
	
	function $(el){
		return doc.querySelector(el);
	}

	var positions_real = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	blankBoxPos = 15,
	positions = [];


	for (var jjiok = 0; jjiok<positions_real.length; jjiok++) {
		positions.push(positions_real[jjiok]);
	}

	positions.sort(function() {
		return 0.5 - Math.random();
	});


	function move(what, where){
		if (where === 'down')
			what.style.top = what.style.top.replace('px', '') - (-100) + 'px';
		else if (where === 'up')
			what.style.top = what.style.top.replace('px', '') - 100 + 'px';
		else if (where === 'left')
			what.style.left = what.style.left.replace('px', '') - 100 + 'px';
		else if (where === 'right')
			what.style.left = what.style.left.replace('px', '') - (-100) + 'px';
	}

	function checkIfRight(){
		if (positions.join(',') === positions_real.join(',')){
			youWin();
		}
	}

	function youWin(){
		box("<h1>You won the game in "+attempts+" attempts!</h1><h2>Now, judge the next participant.</h2>");
	}

	function box(markup) {
		if (!$('div.blackTrans')) {
			var a = doc.createElement('div');
			a.setAttribute('class', 'blackTrans');
			a.innerHTML = markup;
			doc.body.appendChild(a);
		}
	}

	var ji = 0;

	function itsEaster() {
		if (ji !== 16){
			if (ji === 0) $('#gameplan').innerHTML = '';
			if (ji !== 0) $('#img'+ (ji - 1)).style.opacity = '1';
			var valAt = positions_real[ji], src = valAt + 1;
			var a = doc.createElement('img');
			a.setAttribute('src', 'images/'+src+'.gif');
			a.setAttribute('id', 'img' + valAt);
			a.setAttribute('class', 'o0');
			a.style.top = '0';
			a.style.left = '0';
			$('#gameplan').appendChild(a);
			ji++;
			setTimeout("itsEaster()", 100);
		} else {
			positions = [];
			for (var jjiok = 0; jjiok<positions_real.length; jjiok++) {
				positions.push(positions_real[jjiok]);
			}
			blankBoxPos = 15;
		}
	}

	var m = 0, attempts = 0;
		
	function moveTile(k){
		if (k === 40){
			// alert(positions.indexOf(blankBoxPos - (-4)));
			if (positions.indexOf(blankBoxPos - 4) !== -1){
				blankBoxPos -= 4;
				move($('#img' + positions.indexOf(blankBoxPos)), 'down');
				positions[positions.indexOf(blankBoxPos)] = blankBoxPos - (-4);
			}
			attempts++;
		}

		if (k === 38){
			if (positions.indexOf(blankBoxPos - (-4)) !== -1){
				blankBoxPos += 4;
				move($('#img' + positions.indexOf(blankBoxPos)), 'up');
				positions[positions.indexOf(blankBoxPos)] = blankBoxPos - 4;
			}
			attempts++;
		}

		if (k === 37){
			if ((blankBoxPos - (-1)) % 4 !== 0) {
				blankBoxPos += 1;
				move($('#img' + positions.indexOf(blankBoxPos)), 'left');
				positions[positions.indexOf(blankBoxPos)] = blankBoxPos - 1;
			}
			attempts++;
		}

		if (k === 39){
			if ((blankBoxPos) % 4 !== 0){
				blankBoxPos -= 1;
				move($('#img' + positions.indexOf(blankBoxPos)), 'right');
				positions[positions.indexOf(blankBoxPos)] = blankBoxPos + 1;
			}
			attempts++;
		}

		$('#attempts').innerHTML = attempts + ' attempts';

		checkIfRight();

		var easterArr = 'sync'.split('');
		if (String.fromCharCode(k).toLowerCase() === easterArr[m]) {
			m++;
		} else {
			m = 0;
		}
		if (m === easterArr.length) {
			itsEaster();
		}
	}


	function assignPos() {
		for (var i = 0; i<positions.length; i++) {
			var valAt = positions.indexOf(i), src = valAt+1;
			var a = doc.createElement('img');
			a.setAttribute('src', 'images/'+src+'.gif');
			a.setAttribute('id', 'img' + valAt);
			a.style.top = '0';
			a.style.left = '0';
			$('#gameplan').appendChild(a);
		}
	}

	window.addEventListener('keyup', function(event) {
		moveTile((window.event) ? window.event.keyCode : event.keyCode);
	}, false);

	assignPos();

}(window, document);