function encodeDict(dict) {
    const keys = Object.keys(dict);
    return keys.map(key => `${key}=${dict[key]}`).join("&");
}

export function get(url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.onload = () => {
            resolve(req.responseText);
        };
        req.onerror = () => {
            reject(req.responseText);
        };
        req.open("GET", url);
        req.send();
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        const encodedUrl = `${url}?${encodeDict(data)}`;
        const req = new XMLHttpRequest();
        req.onload = () => {
            resolve(req.responseText);
        };
        req.onerror = () => {
            reject(req.responseText);
        };
        req.open("POST", encodedUrl);
        req.send();
    });
}
