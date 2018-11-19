(function(){
    document.addEventListener('DOMContentLoaded', function() {

      getHighlightState();
  
    });
  
  
    function getHighlightState(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "hashighlight"}, function(startingHighlightValue) {
  
          var highlightCheckbox = document.getElementById("highlightForms");
          highlightCheckbox.value = startingHighlightValue;
          highlightCheckbox.addEventListener('change', function(){
            var action = this.checked ? "highlight": "clear";
            chrome.tabs.sendMessage(tabs[0].id, {type: action}, function(hasHighlight) {
              //highlightCheckbox.value = hasHighlight;
            });
          });
  
  
        });
      }); 
    }
   
      
  })()
  