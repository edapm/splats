const express = require('express')
const db = require('./db')

const app = express()

// Yeah I know I shouldn't hard-code passwords, but this is a tiny project.
const PASSWORD = 'thisismypassword'

app.use(express.static('static'))

app.get('/api/leaders', async (req, res) => {
    const leaders = await db.getLeaders()
    res.send(leaders)
})

app.post('/api/vote', async (req, res) => {
    const leaderName = req.query.leader
    const ip = req.ip

    const isIpAllowedToVote = await db.isIpAllowedToVote(ip)
    if (!isIpAllowedToVote) {
        res.status(403)
        res.send('You have used all your votes for today!')
        return
    }

    const isLeaderNameValid = await db.isLeaderNameValid(leaderName)
    if (!isLeaderNameValid) {
        res.status(400)
        res.send('Bad leader name')
        return
    }

    try {
        await db.addVoteForLeader(leaderName)
        await db.addVoteForIp(ip)
        res.status(204)
        res.send()
    } catch (err) {
        res.status(500)
        res.send('Server error')
    }
})

function handlePassword (req, res, handler) {
    const password = req.query.password
    if (password === PASSWORD) {
        handler(req, res)
    } else {
        res.status(403)
        res.send('Correct password was not given!')
    }
}

app.get('/api/results', (req, res) => {
    handlePassword(req, res, () => {
        db
            .getVotes()
            .then(votes => {
                res.send(votes)
            })
            .catch(() => {
                res.status(500)
                res.send('Internal server error')
            })
    })
})

app.post('/api/reset', (req, res) => {
    handlePassword(req, res, () => {
        db
            .resetVotes()
            .then(() => {
                res.status(204)
                res.send()
            })
            .catch(() => {
                res.status(500)
                res.send('Internal server error')
            })
    })
})

app.get('/api/shouldcountips', (req, res) => {
    db
        .shouldCountIps()
        .then(shouldCount => {
            res.send(shouldCount)
        })
        .catch(() => {
            res.status(500)
            res.send('Unable to retrieve IP count boolean')
        })
})

app.put('/api/shouldcountips', (req, res) => {
    handlePassword(req, res, () => {
        const newBoolean = req.query.shouldcount === 'true'
        db
            .setShouldCountIps(newBoolean)
            .then(readNewState => {
                res.send(readNewState)
            })
            .catch(() => {
                res.status(500)
                res.send('Unable to set IP count boolean')
            })
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})
