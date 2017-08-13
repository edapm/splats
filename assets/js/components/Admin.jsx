import React from 'react'
import styled from 'styled-components'

import IPCounting from './IPCounting.jsx'

const P = styled.p`margin: 0;`

export default class Admin extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            password: '',
            results: [],
            showPasswordError: false,
            shouldCountIps: null,
        }

        this.setPassword = this.setPassword.bind(this)
        this.getResults = this.getResults.bind(this)
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
            const sortedJson = json.sort((a, b) => b.votes - a.votes)
            this.setState({ results: sortedJson })
            this.setState({ showPasswordError: false })
        } else {
            this.setState({ showPasswordError: true })
        }
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
                    <div>
                        {this.state.results.map(result =>
                            <P key={result.name}>
                                {result.name} : {result.votes}
                            </P>
                        )}
                    </div>
                    <button onClick={this.getResults}>Update results</button>
                </section>
                <section>
                    <h2>IP Counting</h2>
                    <IPCounting password={this.state.password} />
                </section>
            </div>
        )
    }
}
