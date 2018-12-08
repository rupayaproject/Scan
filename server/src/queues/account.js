'use strict'
const logger = require('../helpers/logger')
const AccountHelper = require('../helpers/account')

const consumer = {}
consumer.name = 'AccountProcess'
consumer.processNumber = 24
consumer.task = async function (job, done) {
    let listHash = JSON.parse(job.data.listHash)
    let map = listHash.map(async function (hash) {
        hash = hash.toLowerCase()
        logger.info('Process account: %s', hash)

        try {
            await AccountHelper.processAccount(hash)
        } catch (e) {
            return done(e)
        }
    })
    await Promise.all(map)

    return done()
}

module.exports = consumer
