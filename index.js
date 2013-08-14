"use strict";

window.TipCalculator = {};

$(function() {
    document.addEventListener("deviceready", function() { navigator.splashscreen.hide(); });

    TipCalculator.app = new DevExpress.framework.html.HtmlApplication({
        namespace: TipCalculator,
        
        defaultLayout: "empty"
    });

    // enable iOS7 theme
    var device = DevExpress.devices.current(),
        iosVersion = DevExpress.devices.iosVersion();
    if(device.platform === "ios" && iosVersion && iosVersion[0] === 7) {
        $(".dx-viewport")
            .removeClass("dx-theme-ios")
            .addClass("dx-theme-ios7");
    }

    TipCalculator.app.router.register(":view", { view: "home" });
    TipCalculator.app.navigate();   
});