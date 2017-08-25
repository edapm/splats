import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SplatElement from './SplatElement.jsx'
import { voteForLeader } from '../actions'
import { STORAGE_URL } from '../firebaseConfig'

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
    const leadersArray = Object.values(leaders)
    leadersArray.sort((a, b) => a.name.localeCompare(b.name))
    if (leadersArray.length === 0) {
        return <Main>Loading...</Main>
    }
    return (
        <Main>
            {leadersArray.map(leader =>
                <Element key={leader.id}>
                    <SplatElement
                        name={leader.name}
                        image={`https://firebasestorage.googleapis.com/v0/b/${STORAGE_URL}/o/${leader.image}?alt=media`}
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
