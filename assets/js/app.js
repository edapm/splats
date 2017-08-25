import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { setLeaders } from './actions'
import './styles/global' // apply global styles
import { DB_URL } from './firebaseConfig'

import App from './components/App.jsx'

export default async ({ rootDomElement, windowDevTools }) => {
    const store = createStore(
        reducer,
        compose(applyMiddleware(thunk), windowDevTools)
    )
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootDomElement
    )
    const leaders = await fetch(`${DB_URL}/leaders.json`).then(a => a.json())
    store.dispatch(setLeaders(leaders))
}
