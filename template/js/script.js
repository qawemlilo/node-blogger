;(function (window) {
    "use strict";
    
    function addClassNames() {
        var pre = document.getElementsByTagName('pre'), i;
    
        for (i = 0; i < pre.length; i++) {
            pre[i].className = "prettyprint linenums";
        }
    }
    
    
    function inspectLinks() {
        var links = document.getElementsByTagName('a'), 
            i, href, isInternalLink,
            mysite = window.location.href;
        
        isInternalLink = function (href, link) {
            var hrefParser = document.createElement('a'),
                linkParser = document.createElement('a');
        
            hrefParser.href = href;
            linkParser.href = link;
        
            return hrefParser.hostname === linkParser.hostname;
        };
    
        for (i = 0; i < links.length; i++) {
            href = links[i].href;
            
            if (!isInternalLink(mysite, href)) {
                links[i].target = '_blank';
            }
        }
    }

    addClassNames();
    prettyPrint();
    inspectLinks();
}(window));
