import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import Root from './Root.jsx'
import Results from './Results.jsx'
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
            <Route exact path='/' component={Root} />
            <Route path='/results' component={Results} />
        </Div>
    </Router>
