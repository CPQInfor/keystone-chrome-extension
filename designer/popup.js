(function(){
  document.addEventListener('DOMContentLoaded', function() {
    getBuildDate();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var findReferences = document.getElementById("findReferences");
      findReferences.addEventListener('click', function(){
        chrome.tabs.sendMessage(tabs[0].id, {type: "findReferences"}, function(response) {
          alert("response from page: " + response);
        });
      });
    });
  });

  function getBuildDate(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "getVersion"}, function(buildDate) {
        document.getElementById("buildDateSince").textContent= timeSince(Date.parse(buildDate)) + " ago";
        document.getElementById("buildDate").textContent = buildDate;
      });
    }); 
  }
  
  function timeSince(date) {
    if (isNaN(date))
      return "unknown";
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

    
})()
