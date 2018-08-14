const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Context, getUserId, APP_SECRET } = require('../utils')
var emailGenerator = require('../emailGenerator.js')
const crypto = require('crypto')
var stripe = require('../stripe.js');


// resolve the `AuthPayload` type
const AuthPayload = {
  user: async ({ user: { id } }, args, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
  }
}

// query the currently logged in user
async function me (parent, args, ctx, info) {
  const id = getUserId(ctx)
  return ctx.db.query.user({ where: { id } }, info)
}

// register a new user
async function signup (parent, args, ctx, info) {
  const password = await bcrypt.hash(args.password, 10)
  const stripe_cus_id = ''
  const role = args.admin ? 'ADMIN' : 'CUSTOMER'
  const resetPasswordToken = crypto.randomBytes(64).toString('hex')
  const validateEmailToken = crypto.randomBytes(64).toString('hex')
  const magicLinkToken = crypto.randomBytes(64).toString('hex')
  const { admin, ...data } = args

  let customer
  try {
    customer = await stripe.createUserInStripe(args.email)
  } catch (e) {
    console.error(e)
    throw(e)
  }

  const user = await ctx.db.mutation.createUser({
    data: { ...data, role, stripe_cus_id, resetPasswordToken,
      firstName: args.firstName,
      lastName: args.lastName,
      nameFile: '',
      billingAdress: '',
      billingCity: '',
      billingZip: '',
      billingState: '',
      billingState: '',
      birthday: new Date(),
      validateEmailToken,
      magicLinkToken,
      password, stripe_cus_id:
      customer.id }
  })

  emailGenerator.sendWelcomeEmail(user, ctx)
  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}


async function sendLinkValidateEmail (parent, args, ctx, info) {
  const id = getUserId(ctx)
  let userMe = await ctx.db.query.user({ where: { id } })
  return emailGenerator.sendWelcomeEmail(userMe, ctx)
    .then(data => {
      return userMe
    })
    .catch(data => {
      throw new Error(`Error. cannot send email to: ${userMe.email}`)
    })
}

async function resetPassword (parent, args, ctx, info) {
  const userCheck = await ctx.db.query.user({
    where: { resetPasswordToken: args.resetPasswordToken }
  })
  if (!userCheck) {
    throw new Error(`Link is not valid`)
  } else {
    if (userCheck.resetPasswordExpires < new Date().getTime()) {
      throw new Error(`Link expired`)
    }
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.updateUser({
      where: { resetPasswordToken: args.resetPasswordToken },
      data: {
        password: password,
        resetPasswordExpires: new Date().getTime()
      }
    })
    return {
      token: jwt.sign({ userId: user.id }, APP_SECRET),
      user
    }
  }
}

async function validateEmail (parent, args, ctx, info) {
  const userCheck = await ctx.db.query.user({
    where: {
      validateEmailToken: args.validateEmailToken
    }
  })
  if (!userCheck) {
    throw new Error(`No such user found.`)
  } else {
    if (userCheck.emailvalidated) {
      throw new Error(`User Already validated`)
    }
  }

  // try {
  const user = await ctx.db.mutation.updateUser({
    // Must check resetPasswordExpires
    where: { validateEmailToken: args.validateEmailToken },
    data: {
      emailvalidated: true
    }
  })
  // return user
  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  }
}

// log in an existing user
async function login (parent, { email, password }, ctx, info) {
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  }
}
async function magicLinkLogin (parent, { magicLinkToken }, ctx, info) {
  const user = await ctx.db.query.user({
    where: {
      magicLinkToken: magicLinkToken
    }
  })
  if (!user) {
    throw new Error(`No such user found.`)
  }

  if (user.magicLinkExpires < new Date().getTime()) {
    throw new Error(`Link expired`)
  }

  try {
    const user = await ctx.db.mutation.updateUser({
      where: { magicLinkToken: magicLinkToken },
      data: {
        magicLinkExpires: new Date().getTime()
      }
    })
  } catch (e) {
    throw e
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  }
}

async function forgetPassword (parent, { email }, ctx, info) {
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }
  try {
    let uniqueId = crypto.randomBytes(64).toString('hex')
    await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        resetPasswordExpires: new Date().getTime() + 1000 * 60 * 60 * 5, // 5 hours
        resetPasswordToken: uniqueId
      }
    })
    emailGenerator.sendForgetPassword(uniqueId, user, ctx)
  } catch (e) {
    return e
  }
  return user
}


async function magicLink (parent, { email }, ctx, info) {
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }
  try {
    let uniqueId = crypto.randomBytes(64).toString('hex')
    await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        magicLinkExpires: new Date().getTime() + 1000 * 60 * 60 * 1, // 1 hours
        magicLinkToken: uniqueId
      }
    })
    emailGenerator.sendMagicLink(uniqueId, user, ctx)
  } catch (e) {
    return e
  }
  return user
}

// update the password of an existing user
async function updatePassword (parent, { oldPassword, newPassword }, ctx, info) {
  let userId = getUserId(ctx)
  const user = await ctx.db.query.user({ where: { id: userId } })
  const oldPasswordValid = await bcrypt.compare(oldPassword, user.password)
  if (!oldPasswordValid) {
    console.log('old Password not Valid')
    throw new Error('Old password is wrong, please try again.')
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 10)
  try {
    await ctx.db.mutation.updateUser({
      where: { id: userId },
      data: { password: newPasswordHash }
    })
  } catch (e) {
    return e
  }
  return user
}

module.exports = {
  me,
  signup,
  validateEmail,
  resetPassword,
  login,
  magicLink,
  magicLinkLogin,
  updatePassword,
  sendLinkValidateEmail,
  forgetPassword,
  AuthPayload
}
