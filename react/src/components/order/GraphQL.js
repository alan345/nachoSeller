import gql from 'graphql-tag'

export const ORDERS_QUERY = gql `
  query OrdersQueryConnection($after: String, $where: OrderWhereInput, $skip: Int) {
    ordersConnection(after: $after, orderBy: createdAt_DESC , where: $where, first: 50, skip: $skip) {
      edges {
        node {
          id
          smallId
          createdAt
          startAt
          endAt
          price
          type
          isOrderPaid
          chargeStripeId
          user {
            firstName
            lastName
          }
          products {
            id
            urlName
            name
            listPrice
            nameFile
          }
        }
      }
    }
  }
`

export const DELETE_ORDER = gql`
  mutation deleteOrder($where: OrderWhereUniqueInput!) {
    deleteOrder(where: $where) {
      id
    }
  }
`

export const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateOrderMutation($productId: String!) {
    createOrder(productId: $productId) {
      id
    }
  }
`

export const PRODUCT_QUERY = gql`
  query ProductQuery($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      listPrice
      trialPeriod
      name
      nameFile
      description
      myListPrice
      myDiscount
      myGlobalDiscount
    }
  }
`
export const USER_QUERY = gql`
  query Me {
    me {
      id
      firstName
      lastName
    }
  }
`

export const USER_QUERY_WITH_STRIPE = gql`
  query Me {
    me {
      id
      firstName
      lastName
      stripe_cus_id

    }
  }
`

export const SELLER_LIGHT_QUERY = gql`
  query ProductQuery($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      name
    }
  }
`

export const ORDER_QUERY = gql`
  query orderQuery($where: OrderWhereUniqueInput!) {
    order(where: $where) {
      id
      subscriptions {
        id
      }
      products {
        id
        name
      }
    }
  }
`
