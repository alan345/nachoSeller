// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { DO_NOT_CANCEL_SUBSCRIPTION } from '../../GraphQL'
import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'

type State = {}

type Props = {
  doNotCancelSubscription: any,
  client: any,
  subscriptionId: string
}

class DoNotCancelSubscription extends React.Component<Props, State> {
  render() {
    return (
      <Button
        color="secondary"
        variant="contained"
        onClick={() => this.doNotCancelSubscription()}
      >
        {'Do not cancel'}
      </Button>
    )
  }
  doNotCancelSubscription = async () => {
    await this.props.doNotCancelSubscription({
      variables: {
        where: {
          id: this.props.subscriptionId
        }
      }
    })
    this.props.client.resetStore()
  }
}

export default compose(
  graphql(DO_NOT_CANCEL_SUBSCRIPTION, {
    name: 'doNotCancelSubscription'
  }),
  withContext,
  withApollo,
  withRouter
)(DoNotCancelSubscription)
