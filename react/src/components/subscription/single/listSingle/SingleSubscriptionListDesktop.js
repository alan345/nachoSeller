// @flow
import React from 'react'
import { compose, withApollo } from 'react-apollo'
import { withContext } from './../../../withContext'
import DateComponent from '../../single/DateComponent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import ImageTemplate from '../../../nav/ImageTemplate'
import type { User } from '../../../user/User.type'
import type { Subscription } from '../../Subscription.type'
import MappingStatus from '../MappingStatus'
import DeleteSubscription from '../action/DeleteSubscription'
import DoNotCancelSubscription from '../action/DoNotCancelSubscription'
import ReallyCancelSubscription from '../action/ReallyCancelSubscription'
import SetPendingPaymentSubscription from '../action/SetPendingPaymentSubscription'
import '../Style.css'

type State = {}

type Props = {
  subscription: Subscription,
  me: User
}

class SingleSubscriptionListDesktop extends React.Component<Props, State> {
  padZerros = (element, size) => {
    var s = String(element)
    while (s.length < (size || 2)) {
      s = '0' + s
    }
    return s
  }

  isInCurrentSubscription = (subscription: Subscription) => {
    return (
      subscription.status === 'ACTIVE_TRIAL' ||
      subscription.status === 'ACTIVE_OFF_CYCLE' ||
      subscription.status === 'ACTIVE_REGULAR' ||
      subscription.status === 'PENDING_SIGNUP' ||
      subscription.status === 'PENDING_PAYMENT'
    )
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={4} sm={4} md={1} lg={1} xl={1} className="marginAuto">
          <div className="imageSubcription">
            <ImageTemplate
              format={'big'}
              nameFile={this.props.subscription.product.nameFile}
            />
          </div>
        </Grid>
        <Grid item xs={4} sm={4} md={2} lg={1} xl={1} className="marginAuto">
          {this.props.subscription.product.name}
        </Grid>
        <Grid item xs={4} sm={4} md={2} lg={2} xl={2} className="marginAuto">
          Order Id:
          <br />
          {this.props.subscription.smallId &&
            this.padZerros(this.props.subscription.smallId, 12)
              .toString()
              .replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}
        </Grid>
        <Grid item xs={4} sm={4} md={3} lg={2} xl={2} className="marginAuto">
          Start Date: <DateComponent date={this.props.subscription.startAt} />
          <br />
          {this.props.subscription.status === 'CANCELLED' && (
            <React.Fragment>
              End Date: <DateComponent date={this.props.subscription.endAt} />
            </React.Fragment>
          )}
          {this.props.subscription.status === 'ACTIVE_UNTIL_END_BILLING' && (
            <React.Fragment>
              Cancel Date:{' '}
              <DateComponent date={this.props.subscription.dateCancellation} />
              <br />
              End Date: <DateComponent date={this.props.subscription.endAt} />
            </React.Fragment>
          )}
          {this.isInCurrentSubscription(this.props.subscription) && (
            <React.Fragment>
              Status: <MappingStatus status={this.props.subscription.status} />
            </React.Fragment>
          )}
        </Grid>

        {this.props.subscription.status === 'CANCELLED' && (
          <Grid item xs={4} sm={4} md={2} lg={1} xl={1} className="marginAuto">
            <Link to={'/product/' + this.props.subscription.product.urlName}>
              <Button color="primary" variant="contained">
                Resubscribe
              </Button>
            </Link>
          </Grid>
        )}
        {this.isInCurrentSubscription(this.props.subscription) && (
          <React.Fragment>
            <Grid
              item
              xs={4}
              sm={4}
              md={1}
              lg={1}
              xl={1}
              className="marginAuto"
            >
              List Price: <br />$
              {this.props.subscription.product.listPrice.toFixed(2)}
              /mo.
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={2}
              lg={1}
              xl={1}
              className="marginAuto"
            >
              <Link
                to={'/subscription/sellerSignup/' + this.props.subscription.id}
              >
                <Button color="primary" size="small" variant="contained">
                  Access
                </Button>
              </Link>
              <div className="marginBetweenButtonsTop" />
              <Link
                to={
                  '/subscription/cancelSubscription/' +
                  this.props.subscription.id
                }
              >
                <Button color="secondary" size="small" variant="contained">
                  Cancel
                </Button>
              </Link>
            </Grid>
          </React.Fragment>
        )}

        {this.props.subscription.status === 'ACTIVE_UNTIL_END_BILLING' && (
          <Grid item xs={4} sm={4} md={2} lg={1} xl={1} className="marginAuto">
            <DoNotCancelSubscription
              subscriptionId={this.props.subscription.id}
            />
          </Grid>
        )}
        {this.props.me &&
          this.props.me.role === 'ADMIN' && (
            <Grid
              item
              xs={12}
              className="marginAuto"
            >
              {this.isInCurrentSubscription(this.props.subscription) && (
                <ReallyCancelSubscription
                  subscriptionId={this.props.subscription.id}
                />
              )}
                <SetPendingPaymentSubscription
                  subscriptionId={this.props.subscription.id}
                />
              <DeleteSubscription subscriptionId={this.props.subscription.id} />
            </Grid>
          )}
      </Grid>
    )
  }
}

export default compose(
  withApollo,
  withContext
)(SingleSubscriptionListDesktop)
