// @flow
import React from 'react'
import Cards from './Cards'
import AddCardContainer from './AddCardContainer'
import { graphql, compose, withApollo } from 'react-apollo'
import {USER_STRIPE_QUERY} from './GraphQL'
import NotAuth from '../nav/error/NotAuth'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'

type State = {}

type Props = {
  userStripeQuery: any,
  showDefaultCard: boolean,
  userId: string,
  canAddCard: boolean
}

class CardPage extends React.Component<Props, State> {
  render() {
    if (this.props.userStripeQuery.error) { return ( <NotAuth/> ) }
    if (this.props.userStripeQuery.loading) { return (<Loading />) }
    if(!this.props.userStripeQuery) { return ( <NotFound/> ) }

    return (
      <React.Fragment>
        {this.props.userStripeQuery.getUserStripe.sources.data.length>0 && (
          <Cards
            showDefaultCard={this.props.showDefaultCard}
            userId={this.props.userId}
            userStripe={this.props.userStripeQuery.getUserStripe} />
        )}
        {(this.props.canAddCard || !this.props.userStripeQuery.getUserStripe.sources.data.length) && (
          <AddCardContainer
            userId={this.props.userId}
            userStripe={this.props.userStripeQuery.getUserStripe} />
        )}
      </React.Fragment>

    )
  }
}

export default compose(
  graphql(USER_STRIPE_QUERY, {
    name: 'userStripeQuery',
    fetchPolicy: 'network-only',
    options: props => ({
      variables: {
          userId: props.userId
        },
    }),
  }),
  withApollo
)(CardPage)
