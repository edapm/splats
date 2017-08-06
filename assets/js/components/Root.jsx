import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SplatGrid from './SplatGrid.jsx'
import VoteConfirm from './VoteConfirm.jsx'
import { dialogCancelPressed } from '../actions'

const Main = styled.div`
    font-family: sans-serif;
    font-weight: 300;
    text-align: center;
`

const Overlay = styled.div`
    height: 100%;
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 10;
`

const Heading = styled.h1`
    font-family: badaboom;
    font-size: 6rem;
    font-weight: normal;
    margin: 0;
    padding: 20px;
`

const Content = styled.div`
    position: relative;
    z-index: 5;
`

const Grid = styled.div`padding: 0 5%;`

const Root = ({ isDialogVisible, dismissDialog }) =>
    <Main>
        <Overlay hidden={!isDialogVisible}>
            <VoteConfirm onClick={dismissDialog} />
        </Overlay>
        <Content>
            <Heading>Splat a leader!</Heading>
            <p>Click a leader to vote for them!</p>
            <Grid>
                <SplatGrid />
            </Grid>
        </Content>
    </Main>

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
