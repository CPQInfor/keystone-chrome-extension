(function(){
  document.addEventListener('DOMContentLoaded', function() {

    bindControlToStorage("comparisonTool");
    bindControlToStorage("arguments");
    
    //lookForFilesToCompare();
    bindCompareButton();

  });

  function bindControlToStorage(elementId)  {    
    var element = document.getElementById(elementId);
    var storage = chrome.storage;
    storage.local.get(elementId, function(value){
      element.value = value[elementId];

      element.addEventListener('change', function(){
        var value = {};
        value[elementId] = this.value;
    
        storage.local.set(value);
      })
    })
  }

  function bindCompareButton() {
    var button = document.getElementById("launchComparison");        
        button.style.display = "inline";
        button.addEventListener('click', onCompareClick);
  }

  function onCompareClick() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "launchComparison"}, function(message) {
          console.log("value from host", message);      
      });
    });
  }
  // function lookForFilesToCompare(){
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {type: "getComparison"}, function(message) {
  //       console.log("ready to compare", message);
  //       if (message){
  //         var button = document.getElementById("launchComparison");
  //         // Object.assign(button.style, {
  //         //   "display": "inline"
  //         // });
  //         button.style.display = "inline";
  //         button.addEventListener('click', function(){
  //           chrome.runtime.sendMessage(message, function(result){
  //             console.log("value from host", JSON.stringify(result));
  //           });
  //         });
  //       }
  //     });
  //   }); 
  //}
    
})()
