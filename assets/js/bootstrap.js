import 'babel-polyfill'
import app from './app.js'
import { get } from './utils.js'

const main = async () => {
    const response = await get('/api/leaders')
    const leaders = JSON.parse(response)
    app({
        rootDomElement: document.getElementById('root'),
        leaders,
        windowDevTools: window.devToolsExtension
            ? window.devToolsExtension()
            : f => f,
    })
}

main()
