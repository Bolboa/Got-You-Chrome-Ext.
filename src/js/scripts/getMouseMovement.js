
	var i = 0;
	//check for mouse movement
	document.onmousemove = function() {
		//if mouse movement moves this distance
		if (i == 3) {
			//the following send messages to the components of the app,
			//telling it that the mouse has moved
			chrome.runtime.sendMessage({movement: true}, function(response) {
			});
			chrome.runtime.sendMessage({caught: true}, function(response) {
			});
		}
		i++;
	}


