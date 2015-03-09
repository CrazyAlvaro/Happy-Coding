// Adding items to start and end of list
var list = document.getElementsByTagName('ul')[0];  // Get the <ul> element

// Add new item to end of list
var newItemLast = document.createElement('li');     // Create element
var newTextLast = document.createTextNode('cream'); // Create text node
newItemLast.appendChild(newTextLast);               // Add text node to element
list.appendChild(newItemLast);                      // Add element end of list

// Add new item start of list
var newItemFirst = document.createElement('li');    // Create element
var newTextFirst = document.createTextNode('kale'); // Create text node
newItemFirst.appendChild(newTextFirst);             
list.insertBefore(newItemFirst, list.firstChild);   // Add element to start of list

var listItems = document.querySelectorAll('li');    // All <li> elements

// Add a class of cool to all list items
var i;
for(i=0; i<listItems.length; i++) {
  listItems[i].className = 'cool';
}

// Add number of items in the list of the heading
var heading = document.querySelector('h2');         // h2 element
var headingText = heading.firstChild.nodeValue;     // h2 text
var totalItems = listItems.length;                  // No. of <li> elements
var newHeading = headingText + '<span>' + totalItems + '</span>';  // Content
heading.innerHTML = newHeading;                     // Update h2
