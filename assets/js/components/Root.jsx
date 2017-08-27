import React from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import SplatGrid from './SplatGrid.jsx'
import VoteConfirm from './VoteConfirm.jsx'
import { dialogCancelPressed } from '../actions'

const Overlay = styled.div`
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 10;
`

const Header = styled.header`
    background-color: #fff;
    display: inline-block;
    padding: 2em;
    margin-top: 2em;
    margin-bottom: 1em;
    border-radius: 5px;
`

const rainbow = keyframes`
    20% {
        color: red;
    }
    40% {
        color: yellow;
    }
    60% {
        color: green;
    }
    80% {
        color: blue;
    }
    100% {
        color: orange;
    }
`

const Heading = styled.h1`
    font-size: 6rem;
    margin: 0;
    padding: 20px;

    ${Header}:hover & {
        animation: ${rainbow} 1s infinite;
    }
`

const Copy = styled.p`font-size: 1.5rem;`

const Content = styled.div`
    position: relative;
    z-index: 5;
`

const Grid = styled.div`padding: 0 5%;`

const Root = ({ isDialogVisible, dismissDialog }) =>
    <div>
        <Overlay hidden={!isDialogVisible}>
            <VoteConfirm onClick={dismissDialog} />
        </Overlay>
        <Content>
            <Header>
                <Heading>Splat a leader!</Heading>
                <Copy>Click a leader to vote for them!</Copy>
            </Header>
            <Grid>
                <SplatGrid />
            </Grid>
        </Content>
    </div>

function mapStateToProps (state) {
    return {
        isDialogVisible: state.isDialogVisible,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dismissDialog: () => dispatch(dialogCancelPressed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
