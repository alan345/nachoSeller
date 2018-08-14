// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { MAGIC_LINK_MUTATION } from './GraphQL'
import { withContext } from '../../withContext'

type State = {
  email: string
}

type Props = {
  openSnackBar: (message: string) => void,
  magicLinkMutation: any,
  history: any
}

class MagicLink extends React.Component<Props, State> {
  state = {
    email: '',
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn smallPaper'>
        <h4 className=''>
          Magic Link
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
      // let messageSnackBar
      try {
        await this.props.magicLinkMutation({
          variables: {
            email
          },
        })
        this.props.openSnackBar('Mail sent with Sign In link available 1h!')
        this.props.history.push('/login')
      } catch (e) {
        e.graphQLErrors.some(graphQLError => this.props.openSnackBar(graphQLError.message))
        throw e
      }
      // .then((result) => {
      //   messageSnackBar = `A mail has been sent with a link available until
      //   ${new Date(result.data.forgetPassword.resetPasswordExpires).toLocaleString()}`
      // })
      // .catch((e) => { messageSnackBar = e.graphQLErrors[0].message })
      // this.child._openSnackBar(messageSnackBar)
  }
}

export default compose(
  graphql(MAGIC_LINK_MUTATION, { name: 'magicLinkMutation' }),
  withContext
)(MagicLink)
