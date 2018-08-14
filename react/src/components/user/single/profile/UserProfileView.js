// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withContext } from '../../../withContext'
import { USER_QUERY } from '../../GraphQL'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import type { User } from '../../User.type'

type State = {}

type Props = {
  userQuery: any,
  me: User
}


class UserProfileView extends React.Component<Props, State> {
  render() {
    if (this.props.userQuery.error) { return ( <NotAuth/> ) }
    if (this.props.userQuery.loading) { return (<Loading />) }
    if(!this.props.userQuery) { return ( <NotFound/> ) }

    return (
      <Grid container >
        {(this.props.me && this.props.me.role === 'ADMIN') && (
          <Grid item xs={12} sm={12}>
            {this.props.userQuery.user.stripe_cus_id}
            <br />
            <br />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          {this.props.userQuery.user.firstName}
        </Grid>
        <Grid item xs={12} sm={6}>
          {this.props.userQuery.user.lastName}
        </Grid>
        <Grid item xs={12} sm={6}>
          {this.props.userQuery.user.email}
        </Grid>
        <Grid item xs={12} sm={6}>
          {this.props.userQuery.user.role}
        </Grid>
        <Grid item xs={12} sm={6}>
          {this.props.userQuery.user.gender}
        </Grid>
        <Grid item xs={12} sm={6}>
          {this.props.userQuery.user.language}
        </Grid>
    </Grid>
  )
  }
}

export default compose(
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: props => ({
      variables: {
          where: {
            id: props.userId,
          }
        },
    }),
  }),
  withContext,
  withApollo
)(UserProfileView)
