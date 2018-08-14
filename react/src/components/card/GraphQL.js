import gql from 'graphql-tag'

export const CREATE_CARD_MUTATION = gql`
  mutation CreateCardMutation($tokenCardId: String!) {
    createCard(tokenCardId: $tokenCardId) {
      id
    }
  }
`
export const USER_STRIPE_QUERY = gql`
  query GetUserStripe($userId: String!) {
    getUserStripe(userId: $userId) {
      id
      default_source
      currency
      email
      sources {
        object
        data {
          id
          object
          exp_month
          exp_year
          last4
          brand
          country
          funding
        }
      }
    }
  }
`

export const DELETE_CARD_MUTATION = gql`
  mutation ($stripe_card_id: String!) {
    deleteCard(stripe_card_id: $stripe_card_id) {
      id
    }
  }
`
export const UPDATE_DEFAULT_SOURCE_MUTATION = gql`
  mutation ($stripe_card_id: String!) {
    setDefaultSource(stripe_card_id: $stripe_card_id) {
      id
    }
  }
`
