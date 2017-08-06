import React from 'react'
import styled from 'styled-components'

import { darkTranslucent, pageBackground } from '../styles/colours'

const Main = styled.div`
    background-color: ${darkTranslucent};
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 10;
`

const Textbox = styled.div`
    background-color: ${pageBackground};
    padding: 5% 10%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 1.2rem;
`

export default ({ onClick }) =>
    <Main>
        <Textbox>
            <div>Thanks for voting!</div>
            <button onClick={onClick}>Close</button>
        </Textbox>
    </Main>
