const {forwardTo} = require('prisma-binding')
var emailGenerator = require('../emailGenerator.js')
var stripe = require('../stripe.js')
const { getActiveSubscriptions } = require('../utils')
const crypto = require('crypto')

const {
  signup, login,
  updatePassword,
  forgetPassword,
  resetPassword,
  validateEmail,
  magicLink,
  magicLinkLogin,
  sendLinkValidateEmail
} = require('./auth')
const { getUserId } = require('../utils')


async function deleteUser (parent, { id }, ctx, info) {
  const userId = getUserId(ctx)
  const userExists = await ctx.db.exists.User({
    id
  })
  // const requestingUserIsAdmin = await ctx.db.exists.User({
  //   id: userId,
  //   role: 'ADMIN'
  // })

  return ctx.db.mutation.deleteUser({ where: { id } })
}
async function createCategorieProduct (parent, args, ctx, info) {
  if(!args.data.name) {
    throw new Error('no title')
  }
  if(!args.data.urlName) {
    args.data.urlName = args.data.name
  }
  return ctx.db.mutation.createCategorieProduct(args, info)
}

async function updateUser (parent, args, ctx, info) {
  let userId = getUserId(ctx)
  let user
  // const user = await ctx.db.query.user({ where: { id: userId } })
  let newData = {
    email: args.data.email,
    nameFile: args.data.nameFile,
    lastName: args.data.lastName,
    firstName: args.data.firstName,
    role: args.data.role,
    gender: args.data.gender,
    billingAdress: args.data.billingAdress,
    billingCity: args.data.billingCity,
    billingZip: args.data.billingZip,
    billingState: args.data.billingState,
    billingCountry: args.data.billingCountry,
    birthday: args.data.birthday,
    language: args.data.language
  }
  try {
    user = await ctx.db.mutation.updateUser({
      where: { id: args.where.id },
      data: newData
    })
  } catch (e) {
    return e
  }
  return user
}


async function createProduct (parent, args, ctx, info) {
  if(!args.data.name) {
    throw new Error('no title')
  }
  if(!args.data.urlName) {
    args.data.urlName = args.data.name
  }
  return ctx.db.mutation.createProduct(args, info)
}

async function cancelSubscription (parent, args, ctx, info) {
  let subscriptionInit = await ctx.db.query.subscription({ where: { id: args.where.id } }, '{id, user {id firstName email lastName}}')
  if(!subscriptionInit) {
    throw new Error('No Subscription')
  }

  let subscription = await ctx.db.mutation.updateSubscription ({
    data: {
      status: 'ACTIVE_UNTIL_END_BILLING',
      dateCancellation: new Date(),
      endAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59), //last day of the month
    },
    where: {id: args.where.id}
  })
  emailGenerator.cancelSubscription(ctx, subscriptionInit.user, subscription)
  return subscription
}

async function doNotCancelSubscription (parent, args, ctx, info) {
  let subscriptionInit = await ctx.db.query.subscription({ where: { id: args.where.id } }, '{id status user {id firstName email lastName}}')
  if(!subscriptionInit) {
    throw new Error('No Subscription')
  }

  if(subscriptionInit.status !== 'ACTIVE_UNTIL_END_BILLING') {
    throw new Error('Cannot change subscription')
  }

  let subscription = await ctx.db.mutation.updateSubscription ({
    data: {
      status: 'ACTIVE_REGULAR',
    },
    where: {id: args.where.id}
  })
  // emailGenerator.cancelSubscription(ctx, subscriptionInit.user, subscription)
  return subscription
}

async function reallyCancelSubscription (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'ADMIN'
  })
  if(!requestingUserIsAdmin) {
    throw new Error('Not an admin')
  }

  let subscriptionInit = await ctx.db.query.subscription({ where: { id: args.where.id } }, '{id status user {id firstName email lastName}}')
  if(!subscriptionInit) {
    throw new Error('No Subscription')
  }

  let subscription = await ctx.db.mutation.updateSubscription ({
    data: {
      status: 'CANCELLED',
      endAt: new Date(1990, 1, 0 , 23, 59, 59).toISOString() 
    },
    where: {id: args.where.id}
  })
  // emailGenerator.cancelSubscription(ctx, subscriptionInit.user, subscription)
  return subscription
}

async function setPendingPaymentSubscription (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  const requestingUserIsAdmin = await ctx.db.exists.User({
    id: userId,
    role: 'ADMIN'
  })
  if(!requestingUserIsAdmin) {
    throw new Error('Not an admin')
  }

  let subscriptionInit = await ctx.db.query.subscription({ where: { id: args.where.id } }, '{id status user {id firstName email lastName}}')
  if(!subscriptionInit) {
    throw new Error('No Subscription')
  }

  let subscription = await ctx.db.mutation.updateSubscription ({
    data: {
      status: 'PENDING_PAYMENT',
    },
    where: {id: args.where.id}
  })
  // emailGenerator.cancelSubscription(ctx, subscriptionInit.user, subscription)
  return subscription
}

async function createCard (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  let me = await ctx.db.query.user({ where: { id: userId } })
  let card
  try {
    card = await stripe.createCardInStripe(args.tokenCardId, me.stripe_cus_id)
  } catch (e) {
    console.error(e)
  }
  return card
}

async function deleteCard (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  let me = await ctx.db.query.user({ where: { id: userId } })
  let card
  try {
    card = await stripe.deleteCardInStripe(args.stripe_card_id, me.stripe_cus_id)
  } catch (e) {
    console.error(e)
  }
  return card
}
async function setDefaultSource (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  let me = await ctx.db.query.user({ where: { id: userId } })
  let card
  try {
    card = await stripe.setDefaultSourceInStripe(args.stripe_card_id, me.stripe_cus_id)
  } catch (e) {
    console.error(e)
  }
  return card
}



function getSmallId() {
  return Math.floor((Math.random() * 999999999999) + 1)
}

async function createOrder (parent, args, ctx, info) {
  const userId = getUserId(ctx)
  let activeSubscriptions = await getActiveSubscriptions(ctx, userId)
  let subscribedAlready = activeSubscriptions.some(activeSubscription => activeSubscription.product.id === args.productId )
  if(subscribedAlready) { 
    throw new Error('Already Subscribed')
    }
  let me = await ctx.db.query.user({ where: { id: userId} })

  let UserStripe
  try {
    UserStripe = await stripe.retrieveUserInStripe(me.stripe_cus_id)
  } catch (e) {
    console.error(e)
    throw e
  }

  if(!UserStripe.sources.total_count) {
    throw new Error('No Cards.')
  }


  let order
  let charge
  let startAt = new Date()
  let endAt = new Date((new Date).getFullYear(), (new Date).getMonth() + 1, 0 , 23, 59, 59).toISOString() //last day of the month
  let product = await ctx.db.query.product({ where: { id: args.productId } })
  // let smallOrderId = getSmallId()
  // let smallSubscriptionId = getSmallId()

  console.log('createSubscription Pending')
  let subscription = await ctx.db.mutation.createSubscription({
    data: {
      smallId: getSmallId(),
      trialPeriod: product.trialPeriod,
      status: 'PENDING_PAYMENT',
      user: { connect: { id: userId } },
      product: { connect: { id: product.id } },
    }
  })


  if(product.trialPeriod) {
    // (new Date()).setDate(new Date().getDate() + product.trialPeriod);
    console.log('has trialPeriod')
    console.log('Create Order')
    order = await ctx.db.mutation.createOrder({
      data: {
        smallId: getSmallId(),
        isOrderPaid: true,
        chargeStripeId: '',
        price: 0,
        startAt: startAt,
        endAt: endAt,
        type: 'trialPeriod',
        products: { connect: { id: product.id } },
        user: { connect: { id: userId } }
      }
    })
    console.log('Update subscription to running')
    subscription = await ctx.db.mutation.updateSubscription ({
      data: {
        status: 'ACTIVE_TRIAL',
        startAt: startAt,
        endAt: endAt,
        orders: { connect: { id: order.id } }
      },
      where: {id: subscription.id}
    })
  }

  if(!product.trialPeriod) {
    console.log('has no trialPeriod')
    console.log('charge stripe')
    try {
      charge = await stripe.createChargeInStripe(product.listPrice, me.stripe_cus_id, 'offCycle')
    } catch (e) {
      console.error(e)
      throw e
    }
    console.log('create order')
    order = await ctx.db.mutation.createOrder({
      data: {
        smallId: getSmallId(),
        isOrderPaid: true,
        chargeStripeId: charge.id,
        price: product.listPrice,
        startAt: startAt,
        endAt: endAt,
        type: 'offCycle',
        products: { connect: { id: product.id } },
        user: { connect: { id: userId } }
      }
    })
    console.log('Update subscription to running')
    subscription = await ctx.db.mutation.updateSubscription ({
      data: {
        status: 'ACTIVE_OFF_CYCLE',
        startAt: startAt,
        endAt: endAt,
        orders: { connect: { id: order.id } }
      },
      where: {id: subscription.id}
    })
  }
  emailGenerator.sendNewOrderEmail(ctx, me, order)
  return order
}


const Mutation = {
  signup,
  resetPassword,
  validateEmail,
  login,
  magicLink,
  magicLinkLogin,
  cancelSubscription,
  setPendingPaymentSubscription,
  doNotCancelSubscription,
  reallyCancelSubscription,
  deleteCategorieProduct: forwardTo('db'),
  deleteSubscription: forwardTo('db'),
  updateSubscription: forwardTo('db'),
  createOrder,
  deleteOrder: forwardTo('db'),
  updatePositionProduct: forwardTo('db'),
  createCard,
  deleteCard,
  setDefaultSource,
  updatePassword,
  forgetPassword,
  deleteUser,
  sendLinkValidateEmail,
  updateUser,
  createProduct,
  deleteProduct: forwardTo('db'),
  updateProduct: forwardTo('db'),
  createCategorieProduct,
  updateCategorieProduct: forwardTo('db'),
}

module.exports = {
  Mutation
}
