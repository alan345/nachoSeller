// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { DELETE_SUBSCRIPTION } from '../../GraphQL'
import SecondValidationButton from '../../../nav/SecondValidationButton'

type State = {}

type Props = {
  deleteSubscription: any,
  subscriptionId: string,
  client: any
}

class DeleteSubscription extends React.Component<Props, State> {
  render() {
    return (
      <SecondValidationButton
        buttonText={'Delete (admin)'}
        onClick={() => this.deleteSubscription()}
      />
    )
  }

  deleteSubscription = async () => {
    await this.props.deleteSubscription({
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
  graphql(DELETE_SUBSCRIPTION, {
    name: 'deleteSubscription',
  }),
  withApollo,
)(DeleteSubscription)
