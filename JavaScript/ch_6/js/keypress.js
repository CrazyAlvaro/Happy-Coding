var el;

function charCount(e) {
  var textEntered, charDisplay, counter, lastKey;
  textEntered = document.getElementById('message').value;     // User's text
  charDisplay = document.getElementById('charactersLeft');    // Counter element 
  counter = (180 - (textEntered.length));
  charDisplay.textContent = counter;

  lastKey = document.getElementById('lastKey');
  lastKey.textContent = 'Last Key in ASCII code: ' + e.keyCode;
}

el = document.getElementById('message');
el.addEventListener('keypress', charCount, false);            // keypress event
