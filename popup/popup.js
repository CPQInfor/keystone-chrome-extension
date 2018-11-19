(function(){
  document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "getPage"}, function(pageType) {
        console.log("pageType:", pageType);
        if (pageType)
          window.location.href = pageType;
      })
    });

  });
})()
