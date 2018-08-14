// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import { SUBSCRIPTION_QUERY } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import ImageTemplate from '../../nav/ImageTemplate'
import Grid from '@material-ui/core/Grid'
import GoBackArrow from '../../nav/layout/GoBackArrow'
import DateComponent from './DateComponent'
import MappingStatus from './MappingStatus'


type State = {}

type Props = {
  subscriptionQuery: any,
  cancelSubscription: any
}

class Subscription extends React.Component<Props, State> {
  padZerros = (element, size) => {
    var s = String(element);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
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
        <Paper className="paperIn tac">
          <div className="imageSubcriptionMobile">
            <ImageTemplate
              format={'big'}
              nameFile={
                this.props.subscriptionQuery.subscription.product.nameFile
              }
            />
          </div>
          <h3>{this.props.subscriptionQuery.subscription.product.name}</h3>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={16}>
                <Grid item xs={6} className="tar">
                  Order Id:
                </Grid>
                <Grid item xs={6} className="tal">
                  {
                    this.padZerros(this.props.subscriptionQuery.subscription.smallId, 12)
                    .toString()
                    .replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}
                </Grid>
                <Grid item xs={6} className="tar">
                  Start Date:
                </Grid>
                <Grid item xs={6} className="tal">
                  <DateComponent
                    date={this.props.subscriptionQuery.subscription.startAt}
                  />
                </Grid>
                <Grid item xs={6} className="tar">
                  Status:
                </Grid>
                <Grid item xs={6} className="tal">
                  <MappingStatus status={this.props.subscriptionQuery.subscription.status} />
                </Grid>
                <Grid item xs={6} className="tar">
                  List Price:
                </Grid>
                <Grid item xs={6} className="tal">
                  $
                  {this.props.subscriptionQuery.subscription.product.listPrice.toFixed(
                    2
                  )}
                  /mo.
                </Grid>

                {this.props.subscriptionQuery.subscription.status ===
                  'CANCELLED' && (
                  <React.Fragment>
                    <Grid item xs={6} className="tar">
                      <div>Cancel Date</div>
                    </Grid>
                    <Grid item xs={6} className="tal">
                      <DateComponent
                        date={
                          this.props.subscriptionQuery.subscription
                            .dateCancellation
                        }
                      />
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
              <br />
              <br />
              <br />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <GoBackArrow />
            </Grid>
            <Grid item xs={6}>
              <Link
                to={
                  '/subscription/sellerSignup/' +
                  this.props.subscriptionQuery.subscription.id
                }
              >
                <Button color="primary" variant="contained">
                  Access
                </Button>
              </Link>
              <div className="marginBetweenButtonsTop" />

              <Link
                to={
                  '/subscription/cancelSubscription/' +
                  this.props.subscriptionQuery.subscription.id
                }
              >
                <Button color="secondary" variant="contained">
                  Cancel
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
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
  withApollo,
  withRouter
)(Subscription)
