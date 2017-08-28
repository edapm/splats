const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const PASSWORD = 'thisismypassword'

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const database = admin.database()

const leadersRef = database.ref('/leaders')
const shouldCountIpsRef = database.ref('/shouldCountIps')
const ipsRef = database.ref('/ips')
const votesRef = database.ref('/votes')

exports.vote = functions.https.onRequest((req, res) => {
    const leaderName = encodeURIComponent(req.query.leader)
    const ip = req.ip.replace(/\./g, '_')
    const ipRef = ipsRef.child(ip)

    const shouldCountIpsPromise = shouldCountIpsRef
        .once('value')
        .then(a => a.val())

    const isIpAllowedToVotePromise = ipRef
        .once('value')
        .then(snap => snap.val())
        .then(votes => {
            if (votes != null) {
                return votes < 7
            } else {
                return true
            }
        })

    const isLeaderNameValidPromise = leadersRef
        .once('value')
        .then(snap => snap.val())
        .then(leaders => {
            const ids = Object.keys(leaders)
            return ids.includes(leaderName)
        })

    return Promise.all([
        shouldCountIpsPromise,
        isIpAllowedToVotePromise,
        isLeaderNameValidPromise,
    ])
        .then(([shouldCountIps, isIpAllowedToVote, isLeaderNameValid]) => {
            if (!isLeaderNameValid) {
                throw new Error('Leader name is invalid')
            }

            if (shouldCountIps && !isIpAllowedToVote) {
                throw new Error('IP has reached voting limit')
            }
        })
        .then(() => {
            // add vote
            votesRef
                .child(leaderName)
                .transaction(current => (current ? current + 1 : 1))

            // increment ip count
            ipRef.transaction(current => (current ? current + 1 : 1))

            res.status(204)
            res.send()
        })
        .catch(err => {
            res.status(400)
            res.send(err.message)
        })
})

const passwordHandler = handler => (req, res) => {
    if (req.query.password === PASSWORD) {
        handler(req, res)
    } else {
        res.status(403)
        res.send('Correct password was not given!')
    }
}

exports.results = functions.https.onRequest(
    passwordHandler((req, res) => {
        const votesPromise = votesRef
            .once('value')
            .then(a => a.val())
            .then(a => a || {})

        const leadersPromise = leadersRef
            .once('value')
            .then(a => a.val())
            .then(a => a || {})

        return Promise.all([votesPromise, leadersPromise])
            .then(([votes, leaders]) => {
                const results = {}
                Object.keys(leaders).forEach(leaderId => {
                    if (votes[leaderId] != null) {
                        results[leaderId] = Object.assign(
                            {},
                            leaders[leaderId],
                            { votes: votes[leaderId] }
                        )
                    }
                })

                res.send(results)
            })
            .catch(() => {
                res.status(500)
                res.send('Unknown error')
            })
    })
)

exports.reset = functions.https.onRequest(
    passwordHandler((req, res) => {
        const resetVotes = votesRef.set({})
        const resetIps = ipsRef.set({})
        return Promise.all([resetVotes, resetIps]).then(() => {
            res.status(204)
            res.send()
        })
    })
)

exports.shouldcountips = functions.https.onRequest(
    passwordHandler((req, res) => {
        const newValue = req.query.shouldcount === 'true'
        return shouldCountIpsRef.set(newValue).then(() => {
            res.status(204)
            res.send()
        })
    })
)
