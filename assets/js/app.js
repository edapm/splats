import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { setLeaders } from './actions'

import Root from './components/Root.jsx'

export default ({ leaders, rootDomElement, windowDevTools }) => {
    // const store = createStore(reducer, applyMiddleware(thunk));
    const store = createStore(
        reducer,
        compose(
            applyMiddleware(thunk),
            windowDevTools
        )
    )
    store.dispatch(setLeaders(leaders))
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        rootDomElement
    )
}
