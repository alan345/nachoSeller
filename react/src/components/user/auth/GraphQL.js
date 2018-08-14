import gql from 'graphql-tag'

export const FORGET_PASSWORD_MUTATION = gql`
  mutation ForgetPasswordMutation($email: String!) {
    forgetPassword(email: $email) {
      firstName
      lastName
      id
      resetPasswordExpires
    }
  }
`
export const MAGIC_LINK_MUTATION = gql`
  mutation MagicLinkMutation($email: String!) {
    magicLink(email: $email) {
      firstName
      lastName
      id
      resetPasswordExpires
    }
  }
`
export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        firstName
        lastName
        id
      }
    }
  }
`
export const MAGIC_LINK_LOGIN_MUTATION = gql`
  mutation MagicLinkLoginMutation($magicLinkToken: String!) {
    magicLinkLogin(magicLinkToken: $magicLinkToken) {
      token
      user {
        firstName
        lastName
        id
      }
    }
  }
`
export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation($password: String!, $resetPasswordToken: String!) {
    resetPassword(password: $password, resetPasswordToken: $resetPasswordToken) {
      token
      user {
        firstName
        lastName
        id
      }
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        lastName
        firstName
        id
      }
    }
  }
`

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePasswordMutation($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`
export const VALIDATE_EMAIL_TOKEN_MUTATION = gql`
  mutation ValidateEmailMutation($validateEmailToken: String!) {
    validateEmail(validateEmailToken: $validateEmailToken) {
      token
      user {
        firstName
        emailvalidated
        id
      }
    }
  }
`
