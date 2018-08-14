import gql from 'graphql-tag'

export const SUBSCRIPTIONS_QUERY = gql `
  query SubscriptionsQueryConnection($after: String, $orderBy: SubscriptionOrderByInput, $where: SubscriptionWhereInput, $skip: Int) {
    subscriptionsConnection(after: $after, orderBy: $orderBy, where: $where, first: 50, skip: $skip) {
      edges {
        node {
          id
          smallId
          status
          startAt
          dateCancellation
          endAt
          product {
            id
            name
            urlName
            listPrice
            nameFile
          }
        }
      }
    }
  }
`

export const DELETE_SUBSCRIPTION = gql`
  mutation deleteSubscription($where: SubscriptionWhereUniqueInput!) {
    deleteSubscription(where: $where) {
      id
    }
  }
`
export const CANCEL_SUBSCRIPTION = gql`
  mutation cancelSubscription($where: SubscriptionWhereUniqueInput!) {
    cancelSubscription(where: $where) {
      id
    }
  }
`
export const REALLY_CANCEL_SUBSCRIPTION = gql`
  mutation reallyCancelSubscription($where: SubscriptionWhereUniqueInput!) {
    reallyCancelSubscription(where: $where) {
      id
    }
  }
`
export const SET_PENDING_PAYMENT_SUBSCRIPTION = gql`
  mutation setPendingPaymentSubscription($where: SubscriptionWhereUniqueInput!) {
    setPendingPaymentSubscription(where: $where) {
      id
    }
  }
`

export const DO_NOT_CANCEL_SUBSCRIPTION = gql`
  mutation do_not_cancelSubscription($where: SubscriptionWhereUniqueInput!) {
    doNotCancelSubscription(where: $where) {
      id
    }
  }
`

export const ME_QUERY_ROLE = gql`
  query Me { me { id role } }
`

export const SUBSCRIPTION_QUERY = gql`
  query SubscriptionQuery($where: SubscriptionWhereUniqueInput!) {
    subscription(where: $where) {
      id
      smallId
      startAt
      status
      dateCancellation
      endAt
      product {
        nameFile
        name
        id
        signupLink
        urlName
        listPrice
      }
    }
  }
`