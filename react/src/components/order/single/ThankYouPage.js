// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'
import { ORDER_QUERY } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'

type State = {}

type Props = {
  orderQuery: any
}

class ThankYouPage extends React.Component<Props, State> {
  render() {
    if (this.props.orderQuery.error) { return (<NotAuth />) }
    if (this.props.orderQuery.loading) { return (<Loading />) }
    if(!this.props.orderQuery) { return (<NotFound/>) }
    return (
        <div className='paperOut'>
          <Paper className='paperIn tac'>
              <h1>Congratulations!</h1>

              {this.props.orderQuery.order.products.map(product=>(
                <span key={product.id}>Your order for {product.name} subscription has been received.
                  <br />
                  <h4>You will receive a confirmation email shortly.</h4>
                  {'Please sign up at the provider\'s site to complete your subscription:'}
                    <br />
                    
                    <br />
                    {this.props.orderQuery.order.subscriptions.map(subscription => (
                      <Link key={subscription.id} to={'/subscription/sellerSignup/' + subscription.id }>
                        <Button color="secondary" variant="contained">Signup to {product.name}</Button>
                      </Link> 
                    ))}
                    <br />
                    <br />
                    or sign up for {product.name} later and 
                    <br />
                    <br />
                    <Link to={'/user/myAccount'}>
                      <Button color='primary' variant="contained">Go to my account</Button>
                    </Link>
                    <br />
                    <br />
                    <Link to={'/'}>
                    <Button color="primary" variant="contained">Continue shopping</Button>
                    </Link>
                </span>
              ))}
          </Paper>
        </div>
    )
  }
}

export default compose(
  graphql(ORDER_QUERY, {
    name: 'orderQuery',
    options: props => ({
      variables: {
          where: {
            id: props.match.params.orderId,
          }
        },
    }),
  }),
  withApollo,
)(ThankYouPage)
