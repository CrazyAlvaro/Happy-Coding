// add hoc implementation for behaviours of personal-settings
// and control-panel when user click on places other than the
// icon.
function clickOutsideToClose() {
  const panelToggler = document.getElementById('md-header-panel-toggler');
  const headerToggler = document.getElementById('md-header-personal-settings-toggler');
  document.addEventListener('click', (e) => {
    if (e.target !== panelToggler &&
        e.target.tagName !== 'I' &&
        panelToggler.checked === true
    ) {
      panelToggler.checked = false;
    }
    if (e.target !== headerToggler &&
        e.target.tagName !== 'IMG' &&
        headerToggler.checked === true
    ) {
      headerToggler.checked = false;
    }
  });
}

module.exports = {
  clickOutsideToClose,
};
