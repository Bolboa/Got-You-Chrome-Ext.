
	var i = 0;
	document.onmousemove = function() {
		if (i == 3) {
			chrome.runtime.sendMessage({movement: true}, function(response) {
			});
			chrome.runtime.sendMessage({caught: true}, function(response) {
			});
		}
		i++;
		
	}


