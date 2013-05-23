"use strict";

window.TipCalculator = {};

$(function() {
    document.addEventListener("deviceready", function() { navigator.splashscreen.hide(); });

    TipCalculator.app = new DevExpress.framework.html.HtmlApplication({
        namespace: TipCalculator,        
        defaultLayout: "empty"
    });

    TipCalculator.app.router.register(":view", { view: "home" });
    TipCalculator.app.navigate();   
});