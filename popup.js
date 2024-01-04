document.addEventListener('DOMContentLoaded', function() {
  var selectAllButton = document.getElementById('select-all');
  var selectNoneButton = document.getElementById('select-none');

  selectAllButton.addEventListener('click', function() {
    executeScriptOnActiveTab(setCheckboxesState.bind(null, true));
  });

  selectNoneButton.addEventListener('click', function() {
    executeScriptOnActiveTab(setCheckboxesState.bind(null, false));
  });

  function setCheckboxesState(checked) {
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = checked;
    });
  }

  function executeScriptOnActiveTab(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, { code: '(' + callback + ')()' });
    });
  }
});
