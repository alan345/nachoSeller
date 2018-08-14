// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import {withContext} from '../../withContext'

type State = {
  interval: number,
  intervalId: any
}

type Props = {
  sendLinkValidateEmailMutation: any,
  openSnackBar: (message: string) => void
}

class ResendEmailValidation extends React.Component<Props, State> {
  state = {
    interval : 0,
    intervalId: {}
  }
  render() {
    return (
      <span>
        {!this.state.interval && (
          <Button variant='raised' onClick={() => this.sendEmail()}>
            Resend Email
          </Button>
        )}
      </span>
    )
  }
  sendEmail = async () => {
    this.startTimer()
    await this.props.sendLinkValidateEmailMutation({
      variables: {
      },
    })
    .then((result) => {
      const messageSnackBar = `Email sent successfully to ${result.data.sendLinkValidateEmail.email}!`
      // this.child._openSnackBar(messageSnackBar)
      this.props.openSnackBar(messageSnackBar)
    })
    .catch((e) => {
      this.props.openSnackBar(e.graphQLErrors[0].message)
    })
  }

  startTimer = () => {
    this.initTimer()
    let intervalId = setInterval(this.timer, 1000)
    this.setState({ intervalId })
  };
  timer = () => {
    if (this.state.interval > 0) {
      this.setState({ interval: this.state.interval -1 })
    } else {
      clearTimeout(this.state.intervalId)
    }
  }
  initTimer() {
    this.setState({ interval: 40 })
  }
  componentWillUnmount() {
    clearTimeout(this.state.intervalId)
  }
}

const SEND_LINK_VALIDATE_EMAIL_MUTATION = gql`
  mutation sendLinkValidateEmailMutation {
    sendLinkValidateEmail {
      email
    }
  }
`

export default compose(
  graphql(SEND_LINK_VALIDATE_EMAIL_MUTATION, { name: 'sendLinkValidateEmailMutation' }),
  withContext
)(ResendEmailValidation)
