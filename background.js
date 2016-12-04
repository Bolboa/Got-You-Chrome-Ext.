chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('./src/index.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});