// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { USER_QUERY } from '../../GraphQL'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import UserProfileForm from './UserProfileForm'

type State = {}

type Props = {
  userQuery: any,
  changeEditMode: boolean
}


class UserProfile extends React.Component<Props, State> {
  render() {
    if (this.props.userQuery.error) { return ( <NotAuth/> ) }
    if (this.props.userQuery.loading) { return (<Loading />) }
    if(!this.props.userQuery) { return ( <NotFound/> ) }

    return (
      <Grid container >
        <UserProfileForm user={this.props.userQuery.user} changeEditMode={this.props.changeEditMode}/>
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
  withRouter,
  withApollo
)(UserProfile)
