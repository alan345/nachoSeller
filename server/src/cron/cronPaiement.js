const { request, GraphQLClient } = require('graphql-request')
var stripe = require('../stripe.js')
var CronJob = require('cron').CronJob;
var config = require('../config/config')
const { Query } = require('../resolvers/Query')

// launchCronPaiement()
function launchCronPaiement () {
  new CronJob('*/5 * * * * *', async function() {
    console.log('Cron launched')
    const token = await getTokenLogin()
    const users = await getUsers(token)
    console.log(users)
    // const orders = await getOrdersNotPaid(token)
    // lauchPaiement(orders)
  }, null, true, 'America/Los_Angeles');
}

async function getTokenLogin() {
  console.log('login')
  let query = `
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }`
  const variables = {
    email: config.cron.email,
    password: config.cron.password,
  }
  let data = await request(config.URL_SERVER_GRAPHQL, query, variables)
  return data.login.token
}

async function getOrdersNotPaid(token) {
  console.log('getOrdersNotPaid');
  const client = new GraphQLClient(config.URL_SERVER_GRAPHQL, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  variables = {
    // orderBy: "name_ASC",
    // where: {name_contains: ""}
  }
  const query = `
  query OrdersQueryConnection($after: String, $orderBy: OrderOrderByInput, $where: OrderWhereInput, $skip: Int) {
    ordersConnection(after: $after, orderBy: $orderBy, where: $where, first: 5, skip: $skip) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          price
          type
          user {
            id
            email
            stripe_cus_id
          }
        }
      }
      aggregate {
        count
      }
    }
  }`
  const data = await client.request(query, variables)
  return data.ordersConnection.edges
}

async function getUsers(token) {
  console.log('getUsers');
  const client = new GraphQLClient(config.URL_SERVER_GRAPHQL, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  variables = {
    // orderBy: "name_ASC",
    // where: {name_contains: ""}
  }

  const query = `
    query UsersQueryConnection($after: String, $orderBy: UserOrderByInput, $where: UserWhereInput, $skip: Int) {
      usersConnection(after: $after, orderBy: $orderBy, where: $where, first: 50, skip: $skip) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            role
            email
            name
            subscriptions {
              id
            }
          }
        }
        aggregate {
          count
        }
      }
    }
  `
  const data = await client.request(query, variables)
  return data.usersConnection.edges
}

async function lauchPaiement(orders) {
  console.log('lauchPaiement')
  orders.forEach(order => {
    console.log('createChargeInStripe for: ' + order.node.user.email)

    stripe.createChargeInStripe (order.node.price, order.node.user.stripe_cus_id, 'regular')
  })

}
