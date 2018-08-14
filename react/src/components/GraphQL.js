import gql from 'graphql-tag'

export const USERS_QUERY = gql `
  query UsersQueryConnection($after: String, $orderBy: UserOrderByInput, $where: UserWhereInput, $skip: Int) {
    usersConnection(after: $after, orderBy: $orderBy, where: $where, first: 5, skip: $skip) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          role
          email
          firstName
          lastName
        }
      }
      aggregate {
        count
      }
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const USER_ADDRESS_QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      firstName
      lastName
      billingAdress
      billingCity
      billingZip
      billingState
      billingCountry
    }
  }
`

export const UPDATE_USER_ADDRESS_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      firstName
      lastName
      billingAdress
      billingCity
      billingZip
      billingState
      birthday
      billingCountry
    }
  }
`

export const USER_QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      role
      stripe_cus_id
      firstName
      lastName
      nameFile
      gender
      billingAdress
      billingCity
      billingZip
      billingState
      billingCountry
      birthday
      language
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      lastName
      firstName
      email
      role
      nameFile
      gender
      billingAdress
      billingCity
      billingZip
      billingState
      billingCountry
      birthday
      language
    }
  }
`

export const USER_PRICING_QUERY = gql`
  query GetUserPricing($userId: String!) {
    getUserPricing(userId: $userId) {
      myDiscount
      sumSubscriptions
      monthlyCost
    }
  }
`

export const ME_QUERY_ROLE = gql`
  query Me { 
    me {
      id 
      role  
      firstName 
      lastName 
      nameFile
    } 
  } 
`
