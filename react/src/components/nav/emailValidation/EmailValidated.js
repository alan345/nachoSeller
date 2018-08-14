// @flow
import React from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../error/Loading'
import ResendEmailValidation from './ResendEmailValidation'

type State = {}

type Props = {
  me: any
}

class EmailValidated extends React.Component<Props, State> {
  render() {
    if (this.props.me.error) { return (null) }
    const { me } = this.props.me
    if(!me) { return (null) }
    if (this.props.me.loading) { return (<Loading />) }

    const authToken = localStorage.getItem(AUTH_TOKEN)
      return (
        <div>
        {(authToken && !this.props.me.me.emailvalidated) && (
          <div className='paperOut'>
            <Paper className='paperIn'>
              <Icon>error_outline</Icon>{' '}
                Your email has not been confirmed. <ResendEmailValidation />
            </Paper>
          </div>
        )}
      </div>
    )
  }
}

const USER_QUERY = gql`
  query Me {
    me {
      id
      emailvalidated
    }
  }
`

export default compose(
  graphql(USER_QUERY, {name: 'me'}),
)(EmailValidated)
