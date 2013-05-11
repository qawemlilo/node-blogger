;(function (window) {
    "use strict";
    
    function addClassNames() {
        var pre = document.getElementsByTagName('pre'), i;
    
        for (i = 0; i < pre.length; i++) {
            pre[i].className = "prettyprint linenums";
        }
    }
    
    
    function isMyLink(href, link) {
        var hrefParser = document.createElement('a'),
            linkParser = document.createElement('a');
        
        hrefParser.href = href;
        linkParser.href = link;
        
        return hrefParser.hostname === linkParser.hostname;
    }
    
    
    function inspectLinks() {
        var links = document.getElementsByTagName('a'), i, href, mysite = window.location.href;
    
        for (i = 0; i < links.length; i++) {
            href = links[i].href;
            
            if (!isMyLink(mysite, href)) {
                links[i].target = '_blank';
            }
        }
    }

    var oldonload = window.onload;
    
    if (typeof oldonload === 'function') {
        window.onload = function() {
            oldonload();
            addClassNames();
            prettyPrint();
            inspectLinks();
        };     
    }
    else {
        window.onload = function() {
            addClassNames();
            prettyPrint();
            inspectLinks();
        };    
    }
}(window));
