import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

import Root from "./components/Root.jsx";

export default function(rootDomElement) {
    const store = createStore(reducer);
    ReactDOM.render(
        <Provider store={store}>
            <Root/>
        </Provider>,
        rootDomElement
    );
}
