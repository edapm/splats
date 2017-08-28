import React from 'react'
import styled from 'styled-components'

import IPCounting from './IPCounting.jsx'

const CenteredDiv = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
`

const Th = styled.th`padding: 0 1em;`

const Results = ({ results }) => {
    if (results.length === 0) {
        return <p>No votes cast!</p>
    } else {
        return (
            <table>
                <thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Role</Th>
                        <Th>Votes</Th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result =>
                        <tr key={result.name}>
                            <td>
                                {result.name}
                            </td>
                            <td>
                                {result.role}
                            </td>
                            <td>
                                {result.votes}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

export default class Admin extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            password: '',
            results: null,
            showPasswordError: false,
            shouldCountIps: null,
        }

        this.setPassword = this.setPassword.bind(this)
        this.getResults = this.getResults.bind(this)
        this.setSucceeded = this.setSucceeded.bind(this)
    }

    setPassword (e) {
        this.setState({ password: e.target.value })
    }

    async getResults () {
        const response = await fetch(
            `/api/results?password=${this.state.password}`
        )
        if (response.ok) {
            const json = await response.json()
            const results = Object.values(json)

            const sortedResults = results.sort((a, b) => b.votes - a.votes)
            this.setState({ results: sortedResults })
            this.setSucceeded(true)
        } else {
            this.setSucceeded(false)
        }
    }

    setSucceeded (success) {
        this.setState({ showPasswordError: !success })
    }

    render () {
        return (
            <div>
                <h1>Admin</h1>
                <section>
                    <label>
                        Enter password here:&nbsp;
                        <input
                            type='text'
                            value={this.state.password}
                            onChange={this.setPassword}
                        />
                    </label>
                    <br />
                    <span hidden={!this.state.showPasswordError}>
                        Incorrect password!
                    </span>
                </section>
                <section>
                    <h2>Results</h2>
                    <CenteredDiv>
                        {this.state.results != null &&
                            <Results results={this.state.results} />}
                    </CenteredDiv>
                    <button onClick={this.getResults}>Update results</button>
                </section>
                <section>
                    <h2>IP Counting</h2>
                    <IPCounting
                        password={this.state.password}
                        afterRequest={this.setSucceeded}
                    />
                </section>
                <section>
                    <h2>Reset</h2>
                    <button
                        onClick={async () => {
                            const response = await fetch(
                                `/api/reset?password=${this.state.password}`,
                                {
                                    method: 'POST',
                                }
                            )
                            if (response.ok) {
                                this.setSucceeded(true)
                            } else {
                                this.setSucceeded(false)
                            }
                        }}
                    >
                        Reset results
                    </button>
                </section>
            </div>
        )
    }
}
