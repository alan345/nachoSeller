// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { REALLY_CANCEL_SUBSCRIPTION } from '../../GraphQL'
import SecondValidationButton from '../../../nav/SecondValidationButton'

type State = {}

type Props = {
  reallyCancelSubscription: any,
  subscriptionId: string,
  client: any
}

class ReallyCancelSubscription extends React.Component<Props, State> {
  render() {
    return (
      <SecondValidationButton
        buttonText={'Really Cancel Subscription (admin)'}
        onClick={() => this.reallyCancelSubscription()}
      />
    )
  }

  reallyCancelSubscription = async () => {
    await this.props.reallyCancelSubscription({
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
  graphql(REALLY_CANCEL_SUBSCRIPTION, {
    name: 'reallyCancelSubscription',
  }),
  withApollo,
)(ReallyCancelSubscription)
