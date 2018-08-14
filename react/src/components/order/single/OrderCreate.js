// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { CREATE_SUBSCRIPTION_MUTATION, PRODUCT_QUERY } from '../GraphQL'
import { SUBSCRIPTIONS_QUERY } from '../../subscription/GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Button from '@material-ui/core/Button'
import ImageTemplate from '../../nav/ImageTemplate'
import NotFound from '../../nav/error/NotFound'
import CardPage from '../../card/CardPage'
import UserAddress from '../../user/single/address/UserAddress'
import Loading from '../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import UserDiscount from '../../user/single/UserDiscount'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withContext } from '../../withContext'
import { Order } from '../Order.type'

type State = {
  order: Order
}

type Props = {
  createOrder: any,
  subscriptionsQueryConnection: any,
  client: any,
  productQuery: any,
  me: any,
  openSnackBar: (message: string) => void,
  history: any,
  match: {
    params: {
      productId: string
    }
  }
}

class OrderCreate extends React.Component<Props, State> {
  updateOrderData(order: Order) {
    this.setState({order})
  }

  render() {
    if (this.props.productQuery.error) { return (<NotAuth />) }
    if (this.props.productQuery.loading) { return (<Loading />) }
    if(!this.props.productQuery) { return (<NotFound/>) }

    if (this.props.subscriptionsQueryConnection.error) {
      return <NotAuth />
    }
    if (this.props.subscriptionsQueryConnection.loading) {
      return <Loading />
    }    

    return (
      <React.Fragment>
        <div className=''>
          <h1>Review Order</h1>
        </div>
        Hello {this.props.me.firstName} {this.props.me.lastName}
        <br />
        Your current account level saving is <span className='red bold'><UserDiscount userId={this.props.me.id}/></span>
        <br />
        Your new account level saving will be <span className='red bold'>{this.props.productQuery.product.myGlobalDiscount}%</span>
        <br />
        <br />
          <Grid container >
            <Grid item xs={12} sm={3}>
              <ImageTemplate
                format={''}
                nameFile={this.props.productQuery.product.nameFile}
              />
            <h4>{this.props.productQuery.product.name}</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>List Price</TableCell>
                    <TableCell>Your Price</TableCell>
                    <TableCell>Your discount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>${this.props.productQuery.product.listPrice} /month</TableCell>
                    <TableCell>${this.props.productQuery.product.myListPrice} /month</TableCell>
                    <TableCell>{this.props.productQuery.product.myDiscount}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          {!this.props.subscriptionsQueryConnection.subscriptionsConnection.edges.length && (
          <Grid container >
            <Grid item xs={12} sm={6}>
              <UserAddress showTitle={true} canEdit={false} userId={this.props.me.id}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardPage showDefaultCard={true} canAddCard={false} userId={this.props.me.id}/>
            </Grid>
          </Grid>
          )}
        <br />
        <br />
        <div className='tac'>
          <Button
            color='primary'
            variant='contained'
            onClick={this.createOrder}
            type='submit'>
            Authorize purchase
          </Button>
        </div>
      </React.Fragment>
    )
  }

  createOrder = async e => {
    e.preventDefault()
    let order
    try {
      order = await this.props.createOrder({
        variables: {
          productId: this.props.match.params.productId
        }
      })
    } catch (e) {
      this.props.openSnackBar(e.graphQLErrors[0].message)
      throw e
    }
    this.props.history.push('/order/ThankYouPage/' + order.data.createOrder.id )
    await this.props.client.resetStore()
  }
}

export default compose(
  graphql(SUBSCRIPTIONS_QUERY, {
    name: 'subscriptionsQueryConnection', // name of the injected prop: this.props.feedQuery...
    fetchPolicy: 'network-only',
    options: props => ({
      variables: {
        where: {
          user: {
            id: props.userId
          }
        }
      }
    })
  }),  
  graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    options: props => ({
      variables: {
          where: {
            id: props.productId,
          }
        },
    }),
  }),
  graphql(CREATE_SUBSCRIPTION_MUTATION, {
    name: 'createOrder',
  }),
  withContext,
  withRouter,
  withApollo
)(OrderCreate)
