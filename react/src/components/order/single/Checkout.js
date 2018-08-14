// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { PRODUCT_QUERY } from '../../product/GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import ProductPrice from '../../product/single/ProductPrice'
import Paper from '@material-ui/core/Paper'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import CheckoutCompute from './CheckoutCompute'
import { withContext } from '../../withContext'
import type { User } from '../../user/User.type'
import EmailValidated from '../../nav/emailValidation/EmailValidated'

type State = {}

type Props = {
  productQuery: any,
  me: User
}

class UserInformation extends React.Component<Props, State> {
  render() {
    if (this.props.productQuery.error) { return (<NotAuth />) }
    if (this.props.productQuery.loading) { return (<Loading />) }
    if(!this.props.productQuery) { return (<NotFound/>) }

    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          <EmailValidated />
          <br />
          <h4>{this.props.productQuery.product.name}</h4>
          <ProductPrice product={this.props.productQuery.product} />
          <br />
          {this.props.productQuery.product.cancellationTerms}
          {this.props.me && (
            <CheckoutCompute userId={this.props.me.id} productId={this.props.productQuery.product.id}/>
          )}
        </Paper>
      </div>
    )
  }
}

export default compose(
  graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    options: props => ({
      variables: {
          where: {
            id: props.match.params.productId,
          }
        },
    }),
  }),
  withRouter,
  withContext,
  withApollo
)(UserInformation)
