import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { setLeaders } from "./actions";

import Root from "./components/Root.jsx";

export default function({ leaders, rootDomElement }) {
    const store = createStore(reducer);
    store.dispatch(setLeaders(leaders));
    ReactDOM.render(
        <Provider store={store}>
            <Root/>
        </Provider>,
        rootDomElement
    );
}
