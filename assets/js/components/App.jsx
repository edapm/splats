import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import Root from './Root.jsx'
import Admin from './Admin.jsx'
import background from '../../images/background.jpg'

const Div = styled.div`
    background-image: url(${background});
    background-position: center center;
    background-size: cover;
    height: 100%;
    position: fixed;
    width: 100%;
    overflow-y: auto;
    font-family: sans-serif;
    font-weight: 300;
    text-align: center;
`

export default () =>
    <Router>
        <Div>
            <Switch>
                <Route exact path='/' component={Root} />
                <Route path='/admin' component={Admin} />
                <Route render={() => <h1>404</h1>} />
            </Switch>
        </Div>
    </Router>
