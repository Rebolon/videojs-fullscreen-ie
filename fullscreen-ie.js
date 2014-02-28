/**
 * FullScreen IE from Iframe Plugin
 * 
 * videoJs fullscreen feature doesn't work in IE if videojs is in an iframe
 * this plugin works only in that specific workcase and will allow
 * fullscreen using window.frameElement
 * 
 * tested on IE11, should work with IE10 (maybe 9)
 * 
 */
(function funcPluginFullscreenIeMain(w) {
    // capture position / top / left / width / height
    var defaults = {
        original: {
            // testCurrentWindow.frameElement = node frame ou null si pas dans une iframe
            position: "",
            top: "",
            left: "",
            width: "",
            height: ""
        }
    };

    vjs.plugin('fullscreen', function funcPluginFullscreenIe(options) {
        var settings = vjs.obj.merge(defaults, options),
            self = this;
        
        // test to stop plugin if it's an not IE browser or we are not in a iframe
        if (document.documentMode === undefined 
            || !w.frameElement)
            return;

        // capture current videojs position
        var el = w.frameElement;
        defaults.original.position = el.style.position;
        defaults.original.top = el.style.top;
        defaults.original.left = el.style.left;
        defaults.original.width = el.width;
        defaults.original.height = el.height;

        // bind the feature on videojs fullscreenchange event
        this.player_.on('fullscreenchange', function funcPluginFullscreenIeOnFullscreenchange() {
            if (!self.player_.isFullScreen) {
                // restore position
                el.style.position = defaults.original.position;
                el.style.top = defaults.original.top;
                el.style.left = defaults.original.left;
                el.width = (defaults.original.width ? defaults.original.width + "px" : "");
                el.height = (defaults.original.height ? defaults.original.height + "px" : "");
                el.style.width = (defaults.original.width ? defaults.original.width + "px" : "");
                el.style.height = (defaults.original.height ? defaults.original.height + "px" : "");
            } else {
                // set fullscreen
                el.style.position = "absolute";
                el.style.top = "0";
                el.style.left = "0";
                el.width = w.top.innerWidth + "px";
                el.height = w.top.innerHeight + "px";
                el.style.width = "";
                el.style.height = "";
            }
        });
    });
})(window);