
	var i = 0;
	//if mouse moves
	document.onmousemove = function() {
		//distance mouse needs to be moved
		if (i == 3) {
			//send messages to the app telling it that the mouse has moved
			chrome.runtime.sendMessage({movement: true}, function(response) {
			});
			chrome.runtime.sendMessage({caught: true}, function(response) {
			});
		}
		i++;
		
	}


