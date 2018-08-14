// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { USER_PRICING_QUERY } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Loading from '../../nav/error/Loading'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import type { UserPricing } from '../UserPricing.type'

type State = {}

type Props = {
  getUserPricing: any,
  getUserPricingData: (userPricing: UserPricing) => void
}

class UserPricingElement extends React.Component<Props, State> {
  componentDidUpdate(prevProps) {
    if (
      this.props.getUserPricing.getUserPricing !==
      prevProps.getUserPricing.getUserPricing
    ) {
      this.props.getUserPricingData(this.props.getUserPricing.getUserPricing)
    }
  }

  render() {
    if (this.props.getUserPricing.error) {
      return <NotAuth />
    }
    if (this.props.getUserPricing.loading) {
      return <Loading />
    }

    if (!this.props.getUserPricing.getUserPricing.sumSubscriptions) {
      return null
    }
    return (
      <Grid container>
        <Grid item xs={12} sm={7}>
          <div className="paperOut">
            <Paper className="paperIn">
              <Grid container className="fontWeight12 black textSize10">
                <Grid item xs={6} sm={6}>
                  Total List price:
                </Grid>
                <Grid item xs={6} sm={6}>
                  $
                  {this.props.getUserPricing.getUserPricing.sumSubscriptions.toFixed(
                    2
                  )}{' '}
                  /month
                </Grid>
                <Grid item xs={6} sm={6}>
                  Your monthly cost:
                </Grid>
                <Grid item xs={6} sm={6}>
                  $
                  {this.props.getUserPricing.getUserPricing.monthlyCost.toFixed(
                    2
                  )}{' '}
                  /month
                </Grid>
                <Grid item xs={6} sm={6}>
                  Your saving:
                </Grid>
                <Grid item xs={6} sm={6}>
                  {this.props.getUserPricing.getUserPricing.myDiscount.toFixed(
                    1
                  )}
                  %
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  graphql(USER_PRICING_QUERY, {
    name: 'getUserPricing',
    options: props => ({
      variables: {
        userId: props.userId,
        forecastSubscriptionToRemove: props.forecastSubscriptionToRemove,
        v: props.v
      }
    })
  }),
  withApollo
)(UserPricingElement)
