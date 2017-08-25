import 'babel-polyfill'
import app from './app.js'

app({
    rootDomElement: document.getElementById('root'),
    windowDevTools: window.devToolsExtension
        ? window.devToolsExtension()
        : f => f,
})
