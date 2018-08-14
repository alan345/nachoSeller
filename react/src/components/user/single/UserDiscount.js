// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { USER_PRICING_QUERY } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Loading from '../../nav/error/Loading'

type State = {}

type Props = {
  getUserPricing: any
}

class UserDiscount extends React.Component<Props, State> {
  render() {
    if (this.props.getUserPricing.error) {
      return (
        <NotAuth/>
      )
    }

    if (this.props.getUserPricing.loading) {
      return (<Loading />)
    }

    return (
      <React.Fragment>
        {this.props.getUserPricing.getUserPricing.myDiscount}%
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(USER_PRICING_QUERY, {
    name: 'getUserPricing',
    options: props => ({
      variables: {
          userId: props.userId,
          v: 0
        },
    }),
  }),
  withApollo
)(UserDiscount)
