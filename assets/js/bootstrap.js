import app from "./app.js";

const req = new XMLHttpRequest();
req.addEventListener("load", () => {
    const leaders = JSON.parse(this.responseText);
    app({
        rootDomElement: document.getElementById("root"),
        leaders,
    });
});
req.open("GET", "/leaders");
req.send();
