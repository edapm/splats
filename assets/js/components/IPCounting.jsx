import React from 'react'

const TRUE_COPY =
    'This means that an IP address can only vote 7 times (overnight voting)'
const FALSE_COPY =
    'This means that an IP address can vote as much as it likes (lunchtime voting)'

export default class IPCounting extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            shouldCountIps: null,
        }

        this.updateIpState = this.updateIpState.bind(this)
        this.toggleIpState = this.toggleIpState.bind(this)
    }

    async updateIpState () {
        const shouldCountIps = await fetch('/api/shouldcountips').then(r =>
            r.json()
        )
        this.setState({ shouldCountIps: shouldCountIps })
    }

    async toggleIpState () {
        await fetch(
            `/api/shouldcountips?password=${this.props
                .password}&shouldcount=${!this.state.shouldCountIps}`,
            {
                method: 'PUT',
            }
        )
        await this.updateIpState()
    }

    async componentDidMount () {
        this.updateIpState()
    }

    render () {
        if (this.state.shouldCountIps == null) {
            return <p>Please wait...</p>
        } else {
            return (
                <div>
                    <p>
                        IP Counting is currently set to
                        {` ${this.state.shouldCountIps}`}.
                    </p>
                    <p>
                        {this.state.shouldCountIps ? TRUE_COPY : FALSE_COPY}
                    </p>
                    <button onClick={this.toggleIpState}>
                        Toggle to {`${!this.state.shouldCountIps}`}
                    </button>
                </div>
            )
        }
    }
}
