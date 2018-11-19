    (function () {

    var state = {};

    // var findComparisonIfExists = function (){
    //     var titles = document.querySelectorAll("div.branch-compare-selection select");
    //     var fileTextAreas = document.querySelectorAll("div.diff .one-half.column");

    //     if (fileTextAreas && fileTextAreas.length>=2) {
    //         var message = {
    //             "command": "compare",
    //             "left": {
    //                 "contents": fileTextAreas[0].innerText,
    //                 "title": getSelectText(titles[0]) || "left"
    //             },
    //             "right": {
    //                 "contents": fileTextAreas[1].innerText,                    
    //                 "title": getSelectText(titles[1]) || "right"
    //             }
    //         };    
    //         return message;
    //     }    
    //     return null;
    // };
    // var getSelectText = function(e){
    //     return (e.options && e.selectedIndex !== -1 && e.options[e.selectedIndex].text) 
    //         || null;
    // }
    var mapComparisonIfExists = function(result){
        var message = {
            "command": "compare",
            "left": {
                "contents": (result.sourceFile && result.sourceFile.content)||null,
                "title": "source"
            },
            "right": {
                "contents": (result.targetFile && result.targetFile.content)||null,                    
                "title": "target"
            }
        }
        return (message.left.contents && message.right.contents) ? message : null;
    }

    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
                case "getPage":
                    sendResponse('/workbench/popup.html');
                    break;
                // case "getComparison":
                //     //sendResponse(findComparisonIfExists());
                  
                //     break;
                case "launchComparison":
                    getAjax(state.url, function(result){
                        var x = mapComparisonIfExists(result);
                        chrome.runtime.sendMessage(x);
                        sendResponse("waiting ajax to launch comparison");
                    });
          
                    break;
                case "new_compare":
                    state.url = message.url;
                    console.log(message.url);
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
        }
    );

    var getAjax = function (url, response)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var result = JSON.parse(xhr.responseText);
            response(result);
          }
        }
        xhr.send();
    }

    // var showDiffButton = document.querySelectorAll(".widget-actions-flex button")[0];
    // showDiffButton && showDiffButton.addEventListener('click', function(){
    //     var message = findComparisonIfExists();
    //     message && chrome.runtime.sendMessage(message);
    // });

})();

