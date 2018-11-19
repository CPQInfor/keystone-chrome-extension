(function () {

    function getVersion() {
        var firstChildNode = document.querySelector("html").childNodes[0];
        if (firstChildNode.nodeType === Node.COMMENT_NODE)
        {
            var comment=firstChildNode.nodeValue;
            var buildDate = /BuildDate: (.*?)\n/.exec(comment)[1];
            //alert(buildDate);
            return buildDate;
        }
        return null;
    }
    function findReferences() {
        debugger;
        return require || x;
    }

    chrome.runtime.onMessage.addListener(
        function(message, sender, response) {
            switch(message.type) {
                case "getPage":
                    response("/designer/popup.html");
                    break;
                case "getVersion":
                    response(getVersion());
                    break;
                case "findReferences":
                    response(findReferences());
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
        }
    );
})();