import app from "./app.js";

const req = new XMLHttpRequest();
req.addEventListener("load", function () {
    const leaders = JSON.parse(this.responseText);
    app({
        rootDomElement: document.getElementById("root"),
        leaders,
    });
});
req.open("GET", "/leaders");
req.send();
