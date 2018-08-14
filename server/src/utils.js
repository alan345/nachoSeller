const jwt = require('jsonwebtoken')
const { Prisma } = require('prisma-binding')

const APP_SECRET = 'appsecret321'

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  // console.log(Authorization)
  if (Authorization && Authorization !== 'null') {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  } else {
    throw new AuthError()
  }
}

async function getActiveSubscriptions (ctx, userId) {
  return await ctx.db.query.subscriptions(
    {where: {user: {id: userId}, status_in:['ACTIVE_TRIAL', 'ACTIVE_OFF_CYCLE', 'ACTIVE_REGULAR']}},
    '{ id status product { id name listPrice} }'
  )
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError,
  APP_SECRET,
  getActiveSubscriptions
}
