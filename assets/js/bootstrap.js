import app from "./app.js";

const req = new XMLHttpRequest();
req.addEventListener("load", () => {
    const leaders = JSON.parse(req.responseText);
    app({
        rootDomElement: document.getElementById("root"),
        leaders,
        windowDevTools: window.devToolsExtension ? window.devToolsExtension() : f => f,
    });
});
req.open("GET", "/leaders");
req.send();
