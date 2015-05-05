//document.writeln('Hello, world');

function simpleCall(){
  "use strict";
  console.log(this);  // this undefined
}

simpleCall();
