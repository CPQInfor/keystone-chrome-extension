(function() {
    'use strict';
    chrome.runtime.onMessage.addListener(function(message, sender, response){
        switch (message.type){
            case "getPage":
                response("/runtime/popup.html");
                break;
            case "highlight":
                actions.highlightAll();
                break;
            case "clear":
                actions.clearHighlight();
                break;
            case "hashighlight":
                response(actions.hasHighlight());
                break;
            default:
                console.error("Unrecognised message: ", message);
        };
    });
        
    var actions = {
        hasHighlight: function() {
            return document.querySelectorAll(".infor-debug-highlight").length;
        },
        clearHighlight: function(){
            var allFormContainers = document.querySelectorAll(".infor-debug-highlight");
            allFormContainers.forEach(function (element){
                element.remove();
            });
        },

        highlightAll: function(){
            this.highlightForms();
            this.highlightNamedContainers();
            this.highlightLinks();
        },
    
        highlightForms: function() {
            findAndHighlightElements("div[data-form-name]", {
                width: "100%",
                height: "100%",
                "border": "4px solid red"
            }, function(overlay, element){
                overlay.setAttribute("title", element.dataset.formName);
                return overlay;
            });

        },

        highlightNamedContainers: function() {
            findAndHighlightElements("div.form-container[id]", {
                backgroundColor: "rgb(200, 200, 255)",
                "border": "1px solid blue"
            }, function(overlay, element){
                overlay.textContent=element.id;
                return overlay;
            });
        },

        highlightLinks: function(){
            findAndHighlightElements("a[data-bind]", {
                backgroundColor: "rgb(200, 200, 100)",
                "border": "1px solid yellow"
            }, function(overlay, element){
                var dataBind = element.dataset.bind;
                var matches = /target: '(.*?)'/.exec(dataBind);
                var target = matches && matches[1];
                var elementStyle= window.getComputedStyle(element);
                if (target && elementStyle.display !== 'none') {
                    var position = element.getBoundingClientRect();
                    Object.assign(overlay.style, {
                        left: position.left,
                        top: position.top
                    });
                    overlay.textContent = "target: " + target;
                    return overlay
                }
                return null; //do not display if no target or not visible
            });           
        }
    };
    
    function findAndHighlightElements(selector, styles, alterElement)
    {
        var allFormContainers = document.querySelectorAll(selector);

        var zIndex=100000;
        allFormContainers.forEach(function(element){
            var overlay = document.createElement("div");
            Object.assign(overlay.style, {
                         position: "absolute",
                         width: "auto",
                         height: "auto",
                         left: 0,
                         top: 0,
                         zIndex: zIndex++
                     })
            Object.assign(overlay.style, styles);
            overlay.classList.add("infor-debug-highlight");
            
            overlay = alterElement ? alterElement(overlay, element) : overlay;
            if (overlay)
            {
                element.appendChild(overlay);
                overlay.addEventListener("click", function(){
                    overlay.remove();
            
                });
            }
        });
    }

})();
