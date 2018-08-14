// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { USER_ADDRESS_QUERY } from '../../user/GraphQL'
import {USER_STRIPE_QUERY} from '../../card/GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import CardPage from '../../card/CardPage'
import UserAddressEdit from '../../user/single/address/UserAddressEdit'
import OrderCreate from './OrderCreate'

type State = {}

type Props = {
  userStripeQuery: any,
  userQuery: any,
  userId: string,
  productId: string
}

class CheckoutCompute extends React.Component<Props, State> {
  render() {
    if (this.props.userStripeQuery.error) { return ( <NotAuth/> ) }
    if (this.props.userStripeQuery.loading) { return (<Loading />) }
    if(!this.props.userStripeQuery) { return ( <NotFound/> ) }

    if (this.props.userQuery.error) { return ( <NotAuth/> ) }
    if (this.props.userQuery.loading) { return (<Loading />) }
    if(!this.props.userQuery) { return ( <NotFound/> ) }

    if(
      !this.props.userQuery.user.firstName ||
      !this.props.userQuery.user.lastName ||
      !this.props.userQuery.user.billingCountry ||
      !this.props.userQuery.user.billingState ||
      !this.props.userQuery.user.billingAdress ||
      !this.props.userQuery.user.billingCity ||
      !this.props.userQuery.user.billingZip
    ) {
      return (
        <UserAddressEdit showTitle={true} canEdit={true} userId={this.props.userId} changeEditMode={()=>{}}/>
      )
    }

    if(!this.props.userStripeQuery.getUserStripe.sources.data.length) {
      return (
        <CardPage canAddCard={false} userId={this.props.userId}/>
      )
    }

    return (
      <OrderCreate productId={this.props.productId} userId={this.props.userId}/>
    )
  }
}

export default compose(
  //
  // graphql(USER_QUERY_WITH_STRIPE, {name: 'me'}),
  graphql(USER_ADDRESS_QUERY, {
    name: 'userQuery',
    options: props => ({
      variables: {
          where: {
            id: props.userId,
          }
        },
    }),
  }),
  graphql(USER_STRIPE_QUERY, {
    name: 'userStripeQuery',
    options: props => ({
      variables: {
          userId: props.userId
        },
    }),
  }),
  withRouter,
  withApollo
)(CheckoutCompute)
