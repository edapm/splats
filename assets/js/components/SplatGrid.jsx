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

const SplatGrid = ({ leaders, vote }) => {
    const sortedLeaders = Object.values(leaders)
    sortedLeaders.sort((a, b) => a.name.localeCompare(b.name))
    return (
        <Main>
            {sortedLeaders.map(leader =>
                <Element key={leader.id}>
                    <SplatElement
                        name={leader.name}
                        image={`https://firebasestorage.googleapis.com/v0/b/splats-test.appspot.com/o/${leader.image}?alt=media`}
                        vote={() => vote(leader.id)}
                    />
                </Element>
            )}
        </Main>
    )
}

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
