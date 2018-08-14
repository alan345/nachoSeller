// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { SET_PENDING_PAYMENT_SUBSCRIPTION } from '../../GraphQL'
import SecondValidationButton from '../../../nav/SecondValidationButton'

type State = {}

type Props = {
  setPendingPaymentSubscription: any,
  subscriptionId: string,
  client: any
}

class SetPendingPaymentSubscription extends React.Component<Props, State> {
  render() {
    return (
      <SecondValidationButton
        buttonText={'Set Pending Payment (admin)'}
        onClick={() => this.setPendingPaymentSubscription()}
      />
    )
  }

  setPendingPaymentSubscription = async () => {
    await this.props.setPendingPaymentSubscription({
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
  graphql(SET_PENDING_PAYMENT_SUBSCRIPTION, {
    name: 'setPendingPaymentSubscription',
  }),
  withApollo,
)(SetPendingPaymentSubscription)
