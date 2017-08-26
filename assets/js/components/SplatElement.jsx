import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'

import {
    primary,
    splatelementBackground,
    darkTranslucent,
} from '../styles/colours'

const Main = styled.div`
    background-color: ${splatelementBackground};
    color: ${primary};
    cursor: pointer;
    padding-bottom: 150%;
    position: relative;
    width: 100%;
`

const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    position: absolute;
    height: 100%;
`

const Image = styled.div`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    flex-basis: 100%;
    flex-shrink: 1;
    overflow-y: hidden;
    height: 100%;
    width: 100%;
`

const Text = styled.div`
    flex-grow: 0;
    font-size: 110%;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    width: 100%;
`

const DimLayer = styled.div`
    background-color: ${darkTranslucent};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 5;
    opacity: 0;

    &:hover {
        opacity: 1;
    }
`

export default ({ name, image, vote }) =>
    <Main onClick={vote}>
        <Content>
            <LazyLoad height='100%' once overflow debounce={100}>
                <Image style={{ backgroundImage: `url(${image})` }}>
                    &nbsp;
                </Image>
            </LazyLoad>
            <Text>
                {name}
            </Text>
            <DimLayer />
        </Content>
    </Main>
