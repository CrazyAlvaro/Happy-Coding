var elList, addLink, newEl, newText, counter, listItems;

elList  = document.getElementById('list');      // Get list
counter = document.getElementById('counter');
addLink = document.querySelector('a');          // Get add item button, css

function addItem(e) {
  e.preventDefault();                                     // Prevent link action
  newEl = document.createElement('li');
  newText = document.createTextNode('New list item');
  newEl.appendChild(newText);                             // Add text to <li>
  elList.appendChild(newEl);                              // Add <li> to list
}

function updateCount() {
  listItems = list.getElementsByTagName('li').length;           // Get total of <li>s
  counter.innerHTML = listItems;
}


addLink.addEventListener('click', addItem, false);        // Click on button
elList.addEventListener('DOMNodeInserted', updateCount, false); // DOM updated
