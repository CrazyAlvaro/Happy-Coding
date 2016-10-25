function getTarget(e) {
  // if there is no event object, use old IE event object
  if (!e) {
    e = window.event;
  }

  // Get the target of event
  return e.target || e.srcElement;
}

function itemDone(e) {
  // Remove item from the list
  var target, elParent, elGrandparent;
  
  target = getTarget(e);i               // Get the item clicked link
  elParent = target.parentNode;         // Get its list item
  elGrandparent = elParent.parentNode;  // Get its list
  elGrandparent.removetChild(elParent); // Remove list item from list

  // Prevent the link from taking you elsewhere
  if (e.preventDefault) {               // If preventDefault() workds
    e.preventDefault();                 // Use preventDefault()
  } else {                              // Otherwise
    e.returnValue = false;              // Use old IE version
  }
}

//////////////////////////////////////////////////////////////////////
// Set up event listeners to call itemDone() on click
var event_listener = document.getElementById('shoppingList');     // Get shopping list
if (event_listener.addEventListener) {                            // If event listeners work
  event_listener.addEventListener('click', function(e){          // Add listener on click
    itemDone(e);                                                  // It calls itemDone()
  }, false);                                                      // Use bubbling phase for flow
} else {
  event_listener.attachEvent('onclick', function(e){              // Use old IE model: onlick
    itemDone(e);                                                  // Call itemDone()
  });
}
