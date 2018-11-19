(function(){

    chrome.runtime.onMessage.addListener(function(message, sender, response){
        console.log("message", message, sender, response);
        if (!message.command){
            console.log('message does not have the command property set: ' + JOSN.stringify(message));
            return;
        }
        
        switch  (message.command){
            case "compare":
                sendNativeMessage(message, response);
                break;
        }

    });

    chrome.webRequest.onCompleted.addListener(function(request) {
        sendRequestToWorkbenchContentScript(request);        
    }, { urls: [ "*://*/api/objects/*" ] });        

    function sendRequestToWorkbenchContentScript(request){
        chrome.tabs.sendMessage(request.tabId, {type: "new_compare", url: request.url}, function(response) {});  
    }
    // chrome.devtools.network.onRequestFinished.addListener(
    //     function(request) {
    //       if (request.response.bodySize > 40*1024) {
    //         chrome.devtools.inspectedWindow.eval(
    //             'console.log("Large image: " + unescape("' +
    //             escape(request.request.url) + '"))');
    //       }
    // });

    function sendNativeMessage(message, response) {
        var hostName = "com.infor.cpq.designer";
    
        console.log("Connecting to host: " + hostName);
        var runtime = chrome.runtime;
        port = runtime.connectNative(hostName);
        port.postMessage(message);
        port.onMessage.addListener(function(result){
            console.log(result);
        });
        // runtime.sendNativeMessage(hostName, message, function(result){
        //     console.log ("return from native host: " + JSON.stringify(result) );
        // });
        console.log("Sent message: " + JSON.stringify(message));
    }

})();