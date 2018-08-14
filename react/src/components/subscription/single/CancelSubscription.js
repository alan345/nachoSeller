// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import { SUBSCRIPTION_QUERY, CANCEL_SUBSCRIPTION } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import ImageTemplate from '../../nav/ImageTemplate'
import { withContext } from '../../withContext'
import type { User } from '../../user/User.type'
import UserPricingElement from '../../user/single/UserPricingElement'
import Grid from '@material-ui/core/Grid'
import DateComponent from './DateComponent'
import type { UserPricing } from '../../user/UserPricing.type'

type State = {
  endAt: Date,
  userPricingDataActual: UserPricing,
  userPricingDataForecast: UserPricing
}

type Props = {
  subscriptionQuery: any,
  cancelSubscription: any,
  client: any,
  history: any,
  me: User
}

class CancelSubscription extends React.Component<Props, State> {

  state = {
    endAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59), //last day of the month
    userPricingDataActual: {
      monthlyCost: 0,
      sumSubscriptions: 0,
      myDiscount: 0
    },
    userPricingDataForecast: {
      monthlyCost: 0,
      sumSubscriptions: 0,
      myDiscount: 0
    }
  }

  render() {
    if (this.props.subscriptionQuery.error) {
      return <NotAuth />
    }
    if (this.props.subscriptionQuery.loading) {
      return <Loading />
    }
    if (!this.props.subscriptionQuery) {
      return <NotFound />
    }

    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="imageSubcription">
            <ImageTemplate
              format={'big'}
              nameFile={
                this.props.subscriptionQuery.subscription.product.nameFile
              }
            />
          </div>
          <h2>{this.props.subscriptionQuery.subscription.product.name}</h2>

          <Grid container>
            <Grid item xs={12} sm={2} />
            <Grid item xs={12} sm={8} className="">
              Your current account summary is:
              {this.props.me && (
                <div className="marginAuto">
                  <UserPricingElement
                    userId={this.props.me.id}
                    v={1}
                    getUserPricingData={data =>
                      this.setState({ userPricingDataActual: data })
                    }
                  />
                </div>
              )}
              <br />
              If you cancel{' '}
              {this.props.subscriptionQuery.subscription.product.name}, your
              account summary will be:
              {this.props.me && (
                <UserPricingElement
                  v={2}
                  userId={this.props.me.id}
                  getUserPricingData={data =>
                    this.setState({ userPricingDataForecast: data })
                  }
                  forecastSubscriptionToRemove={
                    this.props.subscriptionQuery.subscription.id
                  }
                />
              )}
              <p>
                You will save{' '}
                {(
                  this.state.userPricingDataActual.monthlyCost -
                  this.state.userPricingDataForecast.monthlyCost
                ).toFixed(2)}
                /month; {this.props.subscriptionQuery.subscription.product.name}{' '}
                list price is $
                {this.props.subscriptionQuery.subscription.product.listPrice.toFixed(
                  2
                )}
                /month
              </p>
              <p>
                {"If you cancel now, you'll still be able to enjoy"}{' '}
                {this.props.subscriptionQuery.subscription.product.name} until {' '}
                <DateComponent date={this.state.endAt} />.
              </p>
              <br />
              <div className="tac">
                <Link to={'/user/myAccount'}>
                  <Button color="primary" variant="contained">
                    No I want to keep{' '}
                    {this.props.subscriptionQuery.subscription.product.name}
                  </Button>
                </Link>
                <br />
                <div className="marginBetweenButtonsTop" />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    this.cancelSubscription(
                      this.props.subscriptionQuery.subscription.id
                    )
                  }
                >
                  {"Yes. I'm sure. Please cancel."}
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={2} />
          </Grid>
        </Paper>
      </div>
    )
  }
  cancelSubscription = async id => {
    await this.props.cancelSubscription({
      variables: {
        where: {
          id: id
        }
      }
    })
    this.props.history.push('/user/myAccount')
    await this.props.client.resetStore()
  }
}

export default compose(
  graphql(SUBSCRIPTION_QUERY, {
    name: 'subscriptionQuery',
    options: props => ({
      variables: {
        where: {
          id: props.match.params.subscriptionId
        }
      }
    })
  }),
  graphql(CANCEL_SUBSCRIPTION, {
    name: 'cancelSubscription'
  }),
  withContext,
  withApollo,
  withRouter
)(CancelSubscription)
