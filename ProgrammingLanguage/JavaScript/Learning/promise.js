
new Promise( (resolve, reject) => {
  reject(" I reject it ");
})
  .then(
    value => {
      console.log("Succeed: " + value);
    }/*,
    error => {
      console.log("Failed: " + error);
    }*/)
  .catch(
    error => {
      console.log("Catch error: " + error);
    })


