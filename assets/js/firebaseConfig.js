const TEST_ID = 'splats-test'
const LIVE_ID = 'splats-43f42'

// SPLATS_ENV is global const injected at compile time, forwarded
// by webpack.DefinePlugin
const isLive = SPLATS_ENV === 'live' // eslint-disable-line

const ID = isLive ? LIVE_ID : TEST_ID

export const DB_URL = `https://${ID}.firebaseio.com`
export const STORAGE_URL = `${ID}.appspot.com`
