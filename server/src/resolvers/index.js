const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
var cronPaiement = require('../cron/cronPaiement.js')

module.exports = {
  Query,
  Mutation
}
