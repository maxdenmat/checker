document.addEventListener('DOMContentLoaded', function() {
  var selectAllButton = document.getElementById('select-all');
  var selectNoneButton = document.getElementById('select-none');

  selectAllButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {code: 'var checkboxes = document.querySelectorAll("input[type=checkbox]"); checkboxes.forEach(function(checkbox) { checkbox.checked = true; });'});
    });
  });

  selectNoneButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {code: 'var checkboxes = document.querySelectorAll("input[type=checkbox]"); checkboxes.forEach(function(checkbox) { checkbox.checked = false; });'});
    });
  });
});
