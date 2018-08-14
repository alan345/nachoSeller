// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import { DELETE_ORDER, ORDERS_QUERY } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Loading from '../../nav/error/Loading'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../nav/ImageTemplate'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import type { User } from '../../user/User.type'
import { withContext } from '../../withContext'
import './Style.css'
var parse = require('date-fns/parse')
var format = require('date-fns/format')

type State = {}

type Props = {
  ordersQueryConnection: any,
  deleteOrder: any,
  hideUser: boolean,
  me: User
}

class OrderList extends React.Component<Props, State> {
  render() {
    if (this.props.ordersQueryConnection.error) {
      return <NotAuth />
    }
    if (this.props.ordersQueryConnection.loading) {
      return <Loading />
    }
    const { edges } = this.props.ordersQueryConnection.ordersConnection

    return (
      <div className="paperOut">
        {edges &&
          edges.map(order => (
            <Paper key={order.node.id} className="paperIn paperOrders">
              <Grid container>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                  {order.node.isOrderPaid && (
                    <div>
                      <Icon className="black cursor">done</Icon>
                      Paid: ${order.node.price} ({order.node.type})
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                  <div>
                    <Icon className="black cursor">insert_drive_file</Icon>
                    {order.node.smallId &&
                      order.node.smallId.toString().replace(
                        /(\d{4})(\d{4})(\d{4})/,
                        '$1-$2-$3'
                      )}
                  </div>

                  {this.props.me &&
                    this.props.me.role === 'ADMIN' &&
                    order.node.chargeStripeId && (
                      <React.Fragment>
                        <br />
                        #Payement: {order.node.chargeStripeId}
                      </React.Fragment>
                    )}
                </Grid>
                {!this.props.hideUser && (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                    {order.node.user.firstName} {order.node.user.lastName}
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                  <Icon className="black">outlined_flag</Icon>{' '}
                  {format(parse(order.node.startAt), 'MMM DD YYYY')}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                  <Icon className="black">flag</Icon>{' '}
                  {format(parse(order.node.endAt), 'MMM DD YYYY')}
                </Grid>
                <br />
                <br />
                <br />
                <br />

                <Grid item xs={12}>
                  <Paper key={order.node.id} className="paperIn">
                    {order.node.products.map((product, i) => (
                      <div key={product.id}>
                        <Grid className="cursor" container>
                          <Grid item xs={1}>
                            {i + 1}.
                          </Grid>
                          <Grid item xs={4}>
                            <Link to={'/product/' + product.urlName}>
                              <ImageTemplate
                                format={'avatar'}
                                nameFile={product.nameFile}
                              />
                            </Link>
                          </Grid>
                          <Grid item xs={4}>
                            {product.name}
                          </Grid>
                          <Grid item xs={3}>
                            ${product.listPrice.toFixed(2) + '/mo.'}
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          ))}
      </div>
    )
  }

  deleteOrder = async id => {
    await this.props.deleteOrder({
      variables: {
        where: {
          id: id
        }
      }
    })
  }
}

export default compose(
  graphql(ORDERS_QUERY, {
    name: 'ordersQueryConnection', // name of the injected prop: this.props.feedQuery...
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
  graphql(DELETE_ORDER, {
    name: 'deleteOrder',
    options: props => ({
      refetchQueries: [
        {
          query: ORDERS_QUERY,
          variables: {
            where: {
              user: {
                id: props.userId
              }
            }
          }
        }
      ]
    })
  }),
  withContext
)(OrderList)
