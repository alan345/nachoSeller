// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { FORGET_PASSWORD_MUTATION } from './GraphQL'
import { withContext } from '../../withContext'

type State = {
  email: string
}

type Props = {
  forgetPasswordMutation: any,
  openSnackBar: (message: string) => void
}

class ForgetPassword extends React.Component<Props, State> {
  state = {
    email: '',
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn smallPaper'>
        <h4 className='mv3'>
          Forget Password
        </h4>
        <div className='flex flex-column'>

          <TextField
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            label='Your email address'
          />

        </div>
        <div className='flex mt3'>
          <Button variant='raised' onClick={() => this._confirm()}>
            Ok
          </Button>
        </div>
      </Paper>
      </div>
    )
  }

  _confirm = async () => {
    const { email } = this.state
      let messageSnackBar = ''
      await this.props.forgetPasswordMutation({
        variables: {
          email
        },
      })
      .then((result) => {
        messageSnackBar = `A mail has been sent with a link available until
        ${new Date(result.data.forgetPassword.resetPasswordExpires).toLocaleString()}`
      })
      .catch((e) => { messageSnackBar = e.graphQLErrors[0].message })
      this.props.openSnackBar(messageSnackBar)
  }
}

export default compose(
  graphql(FORGET_PASSWORD_MUTATION, { name: 'forgetPasswordMutation' }),
  withContext
)(ForgetPassword)
