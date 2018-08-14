// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { USER_ADDRESS_QUERY } from '../../GraphQL'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'

type State = {}

type Props = {
}


class UserAddressView extends React.Component<Props, State> {
  render() {
    if (this.props.userQuery.error) { return ( <NotAuth/> ) }
    if (this.props.userQuery.loading) { return (<Loading />) }
    if(!this.props.userQuery) { return ( <NotFound/> ) }

    return (
          <Grid container >
            <Grid item xs={12} sm={6}>
              {this.props.userQuery.user.firstName}
            </Grid>
            <Grid item xs={12} sm={6}>
              {this.props.userQuery.user.lastName}
            </Grid>
            <Grid item xs={12} sm={6}>
              {this.props.userQuery.user.billingCountry}
            </Grid>
            <Grid item xs={12} sm={6}>
              {this.props.userQuery.user.billingState}
            </Grid>
            <Grid item xs={12} sm={12}>
              {this.props.userQuery.user.billingAdress}
            </Grid>
            <Grid item xs={12} sm={6}>
              {this.props.userQuery.user.billingZip}
            </Grid>
            <Grid item xs={12} sm={6}>
              {this.props.userQuery.user.billingCity}
            </Grid>
          </Grid>
        )
      }
}

export default compose(
  graphql(USER_ADDRESS_QUERY, {
    name: 'userQuery',
    options: props => ({
      variables: {
          where: {
            id: props.userId,
          }
        },
    }),
  }),
  withRouter,
  withApollo
)(UserAddressView)
