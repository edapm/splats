import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
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

const Heading = styled.h1`
    font-size: 6rem;
    margin: 0;
    padding: 20px;
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
            <Heading>Splat a leader!</Heading>
            <Copy>Click a leader to vote for them!</Copy>
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
