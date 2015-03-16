/* package variables */
var elPackageHint   = document.getElementById('packageHint');

/* function to show message according to selection */
function packageHint() {
  var pack = this.options[this.selectedIndex].value;    // Get selected option
  if (pack == 'monthly') {
    elPackageHint.innerHTML = 'Save $10 if you pay for 1 year!';
  } else {
    elPackageHint.innerHTML = 'Wise choice!';
  }
}

/* check variables */
var elTerms         = document.getElementById('terms');
var elTermsHint     = document.getElementById('termsHint');

/* function to check if term has been accepted */
function checkTerms(event) {
  if (!elTerms.checked) {
    elTermsHint.innerHTML = 'You must agree to the terms.';
    event.preventDefault();                                   // Don't submit form
  }
}

//Create event listeners: submit calls checkTerms(), change calls packageHint()
var elForm          = document.getElementById('formSignup');  // Store elements
var elSelectPackage = document.getElementById('package');

elForm.addEventListener('submit', checkTerms, false);
elSelectPackage.addEventListener('change', packageHint, false);
