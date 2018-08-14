// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import Paper from '@material-ui/core/Paper'
import { MAGIC_LINK_LOGIN_MUTATION } from './GraphQL'
import { AUTH_TOKEN } from '../../../constants/constants'
import { withContext } from '../../withContext'
const queryString = require('query-string')

type State = {

}

type Props = {
  location: any,
  magikLinkLogin: any,
  refetchMe: () => void,
  history: any,
  openSnackBar: (message: string) => void

}

class MagicLinkLogin extends React.Component<Props, State> {
  state = {
    email: '',
    magicLinkToken: '',
  }

  componentDidMount() {
    let magicLinkToken = queryString.parse(this.props.location.search).magicLinkToken

    if(magicLinkToken) {
      this.login(magicLinkToken)
    }
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
        <h4 className='mv3'>
          Login Validation
        </h4>
      </Paper>
      </div>
    )
  }
  login = async (magicLinkToken) => {
    try {
      let result = await this.props.magikLinkLogin({
        variables: {
          magicLinkToken
        },
      })
      const { token, user } = result.data.magicLinkLogin
      this._saveUserData(token, user)
    } catch (e) {
      this.props.history.push('/login')
      e.graphQLErrors.some(graphQLError => this.props.openSnackBar(graphQLError.message))
      throw e
    }
  }

  _saveUserData = async (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem('userToken', JSON.stringify(user))
    await this.props.refetchMe()
    this.props.history.push(`/`)
    this.props.openSnackBar('Sign In successful!')
  }
}

export default compose(
  graphql(MAGIC_LINK_LOGIN_MUTATION, { name: 'magikLinkLogin' }),
  withApollo,
  withContext
)(MagicLinkLogin)
