chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('./src/index.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.permission == true) {
    	chrome.tabs.create({'url': chrome.extension.getURL('src/permission.html')}, function(tab) { 
  			sendResponse({farewell: "goodbye"});
		});
    }
    return true;
  });