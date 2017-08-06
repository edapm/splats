import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SplatElement from './SplatElement.jsx'
import { voteForLeader } from '../actions'

const Main = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: stretch;
`

const Element = styled.div`
    flex-basis: 133px;
    flex-grow: 0;
    padding: 20px;
    min-width: 20%;
`

const SplatGrid = ({ leaders, vote }) =>
    <Main>
        {leaders.map(leader =>
            <Element key={leader.name}>
                <SplatElement
                    name={leader.name}
                    image={`/images/${leader.img}`}
                    vote={() => vote(leader.name)}
                />
            </Element>
        )}
    </Main>

function mapStateToProps (state, ownProps) {
    return {
        leaders: state.leaders,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        vote: name => dispatch(voteForLeader(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplatGrid)
