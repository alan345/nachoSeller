// @flow
import { withContext } from './../../withContext'
import React from 'react'
import { graphql, compose } from 'react-apollo'
import { SUBSCRIPTIONS_QUERY } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Loading from '../../nav/error/Loading'
import Paper from '@material-ui/core/Paper'
import SingleSubscriptionListMobile from '../single/listSingle/SingleSubscriptionListMobile'
import SingleSubscriptionListDesktop from '../single/listSingle/SingleSubscriptionListDesktop'
import './Style.css'

type State = {}

type Props = {
  subscriptionsQueryConnection: any,
  deleteSubscription: any,
  isMobile: boolean,
  hideIfNoData: boolean,
  title: string
}

class SubscriptionList extends React.Component<Props, State> {
  render() {
    if (this.props.subscriptionsQueryConnection.error) {
      return <NotAuth />
    }
    if (this.props.subscriptionsQueryConnection.loading) {
      return <Loading />
    }
    const {
      edges
    } = this.props.subscriptionsQueryConnection.subscriptionsConnection

    if(!edges.length && this.props.hideIfNoData) {
      return null
    }
    return (
      <React.Fragment>
        <h3>{this.props.title}</h3>
        {edges.length ? (
          <div className="paperOut">
            {edges &&
              edges.map(subscription => (
                <Paper
                  key={subscription.node.id}
                  className="paperIn tac paperSubscriptions"
                >
                  {this.props.isMobile ? (
                    <SingleSubscriptionListMobile
                      subscription={subscription.node}
                    />
                  ) : (
                    <SingleSubscriptionListDesktop
                      subscription={subscription.node}
                    />
                  )}
                </Paper>
              ))}
          </div>
        ) : (
          <div>No data yet</div>
        )}
      </React.Fragment>
    )
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
          },
          status_in: props.status
        },
        orderBy: props.orderBy
      }
    })
  }),
  withContext
)(SubscriptionList)
