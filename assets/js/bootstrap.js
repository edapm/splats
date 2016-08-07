import app from "./app.js";

const req = new XMLHttpRequest();
req.addEventListener("load", function () {
    const leaders = JSON.parse(this.responseText);
    app({
        rootDomElement: document.getElementById("root"),
        leaders,
        windowDevTools: window.devToolsExtension ? window.devToolsExtension() : f => f,
    });
});
req.open("GET", "/leaders");
req.send();
