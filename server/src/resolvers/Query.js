const {forwardTo} = require('prisma-binding')
const {getUserId, getActiveSubscriptions} = require('../utils')
const {me} = require('./auth')
var stripe = require('../stripe.js')
var pricing = require('../pricing.js')


async function getProductMyData(activeSubscriptions, product) {
  let ActualTotalListPriceSubscriptions = activeSubscriptions.reduce((acc, curr) => acc + curr.product.listPrice, 0)
  let ActualTotalListPriceSubscriptionsDiscounted = await pricing.getTotalListPriceDiscounted(ActualTotalListPriceSubscriptions)
  let incrementalNewListPrice = product.listPrice
  let totalNewListPrice = incrementalNewListPrice + ActualTotalListPriceSubscriptions
  let totalNewListPriceDiscounted = await pricing.getTotalListPriceDiscounted(totalNewListPrice)
  let incrementalDiscountedPrice = totalNewListPriceDiscounted - ActualTotalListPriceSubscriptionsDiscounted
  product.subscribed = activeSubscriptions.some(activeSubscription => activeSubscription.product.id === product.id)
  product.myDiscount = !incrementalNewListPrice ? 0 : ((1 - (incrementalDiscountedPrice / incrementalNewListPrice)) * 100).toFixed(1)
  product.myListPrice = incrementalDiscountedPrice.toFixed(2)
  let monthlyCost = await pricing.getTotalListPriceDiscounted(ActualTotalListPriceSubscriptions + incrementalNewListPrice)
  let myGlobalDiscount = ((1 - (monthlyCost / (ActualTotalListPriceSubscriptions + incrementalNewListPrice))) * 100).toFixed(2)
  product.myGlobalDiscount = myGlobalDiscount
  return product
}


async function getUserPricing(parent, args, ctx, info) {
  const userId = getUserId(ctx)
  let subscriptions = await getActiveSubscriptions(ctx, userId)

  if(args.forecastSubscriptionToRemove) {
    subscriptions = subscriptions.filter(subscription => args.forecastSubscriptionToRemove !== subscription.id)
  }

  let ActualTotalListPriceSubscriptions = subscriptions.reduce((acc, curr) => acc + curr.product.listPrice, 0)

  let monthlyCost = await pricing.getTotalListPriceDiscounted(ActualTotalListPriceSubscriptions)
  let myDiscount = ((1 - (monthlyCost / ActualTotalListPriceSubscriptions)) * 100).toFixed(2)

  let userPricing = {
    myDiscount: ActualTotalListPriceSubscriptions ? myDiscount : 0,
    sumSubscriptions: ActualTotalListPriceSubscriptions.toFixed(2),
    monthlyCost: monthlyCost.toFixed(2)
  }

  return userPricing
}



async function getUserStripe (parent, args, ctx, info) {
  let me = await ctx.db.query.user({ where: { id: args.userId } })
  let UserStripe
  try {
    UserStripe = await stripe.retrieveUserInStripe(me.stripe_cus_id)
  } catch (e) {
    console.error(e)
    throw e
  }
  return UserStripe
}

async function productsConnection (parent, args, ctx, info) {
  let userId = ''
  try {
    userId = getUserId(ctx)
  } catch (e) {
    console.error(e)
  }

  let products = await ctx.db.query.productsConnection(args, info)
  let activeSubscriptions = await getActiveSubscriptions(ctx, userId)

  const pArray = products.edges.map(async (product) => {
    let productMyData = await getProductMyData(activeSubscriptions, product.node)
    product.node.subscribed = productMyData.subscribed
    product.node.myDiscount = productMyData.myDiscount
    product.node.myListPrice = productMyData.myListPrice
    product.node.myGlobalDiscount = productMyData.myGlobalDiscount
  })
  const productsUpdated = await Promise.all(pArray);
  return products
}

async function categorieProducts (parent, args, ctx, info) {
  let userId = ''
  try {
    userId = getUserId(ctx)
  } catch (e) {
    // console.error(e)
  }

  let activeSubscriptions = await getActiveSubscriptions(ctx, userId)
  let categorieProducts = await ctx.db.query.categorieProducts(args, info)
  const pArray = categorieProducts.map(async categorieProduct => {
    const pArray2 = categorieProduct.positionProducts.map(async (positionProduct) => {
      let productMyData = await getProductMyData(activeSubscriptions, positionProduct.product)
      positionProduct.product.subscribed = productMyData.subscribed
      positionProduct.product.myDiscount = productMyData.myDiscount
      positionProduct.product.myListPrice = productMyData.myListPrice
      positionProduct.product.myGlobalDiscount = productMyData.myGlobalDiscount
    })
    const productsUpdated = await Promise.all(pArray2);
    return categorieProduct
  })
  
  const categorieProductsUpdated = await Promise.all(pArray);

  categorieProductsUpdated.map(categorieProduct=> {
    categorieProduct.positionProducts = categorieProduct.positionProducts
    .sort((a,b)=> {
      return a.product.subscribed - b.product.subscribed
    })
    .filter((product, i) => i < 4)
  })

  return categorieProductsUpdated
}

async function categorieSingleProducts (parent, args, ctx, info) {
  let userId = ''
  try {
    userId = getUserId(ctx)
  } catch (e) {
    console.error(e)
  }
  let activeSubscriptions = await getActiveSubscriptions(ctx, userId)
  let categorieSingleProducts = await ctx.db.query.categorieProducts({where:{urlName: args.urlName}}, info)

  if(!categorieSingleProducts.length) {
    throw new Error('no categerory founded')
  }

  const pArray2 = categorieSingleProducts[0].positionProducts.map(async (positionProduct) => {
    let productMyData = await getProductMyData(activeSubscriptions, positionProduct.product)
    positionProduct.product.subscribed = productMyData.subscribed
    positionProduct.product.myDiscount = productMyData.myDiscount
    positionProduct.product.myListPrice = productMyData.myListPrice
    positionProduct.product.myGlobalDiscount = productMyData.myGlobalDiscount

  })
  const productsUpdated = await Promise.all(pArray2);

  
  categorieSingleProducts[0].positionProducts.sort((a,b)=> {
    return a.product.subscribed - b.product.subscribed
  })
  
  return categorieSingleProducts[0]
}

async function product (parent, args, ctx, info) {
  let userId = ''
  try {
    userId = getUserId(ctx)
  } catch (e) {
    console.error(e)
  }
  let product = await ctx.db.query.product(args, info)
  if(!product) { 
    throw new Error('no product')
    }
  let activeSubscriptions = await getActiveSubscriptions(ctx, userId)
  let productMyData = await getProductMyData(activeSubscriptions, product)
  product.subscribed = productMyData.subscribed
  product.myDiscount = productMyData.myDiscount
  product.myListPrice = productMyData.myListPrice
  product.myGlobalDiscount = productMyData.myGlobalDiscount
  return product
}

async function subscription (parent, args, ctx, info) {
  let userId = ''
  try {
    userId = getUserId(ctx)
  } catch (e) {
    throw(e)
  }
  let subscription = await ctx.db.query.subscription(args, info)
  if(!subscription) { 
    throw new Error('no subscription')
    }
  // let activeSubscriptions = await getActiveSubscriptions(ctx, userId)

  // let productMyData = await getProductMyData(activeSubscriptions, product)
  // product.subscribed = productMyData.subscribed
  // product.myDiscount = productMyData.myDiscount
  // product.myListPrice = productMyData.myListPrice
  // product.myGlobalDiscount = productMyData.myGlobalDiscount
  return subscription
}

async function order (parent, args, ctx, info) {
  let order = await ctx.db.query.order(args, info)
  return order
}

const Query = {
  me,
  user: (parent, args, ctx, info) => {
    // getUserId(ctx)
    return forwardTo('db')(parent, args, ctx, info)
  },
  getUserStripe,
  product,
  getUserPricing,
  subscription,
  subscriptionsConnection: forwardTo('db'),
  categorieProducts,
  categorieSingleProducts,
  productsConnection,
  order,
  ordersConnection: (parent, args, ctx, info) => {
    getUserId(ctx)
    return forwardTo('db')(parent, args, ctx, info)
  },
  usersConnection: (parent, args, ctx, info) => {
    getUserId(ctx)
    return forwardTo('db')(parent, args, ctx, info)
  }
}

module.exports = {
  Query
}
