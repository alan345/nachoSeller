// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import NotAuth from '../../nav/error/NotAuth'
import Icon from '@material-ui/core/Icon'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router-dom'
import { USERS_QUERY, DELETE_USER_MUTATION } from '../GraphQL'
class UsersPageList extends React.Component<Props, State> {
  state = {
    query: '',
    orderBy: 'lastName_ASC'
  }

  isUserMyself = (userId) => {
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    return userToken.id === userId
  }

  deleteUser = async id => {
    await this.props.deleteUser({
      variables: { id },
    })
    this.props.client.resetStore().then( () => {
      this.props.history.push('/users')
    })
  }

  render() {
    if (this.props.usersQueryConnection.error) {
      return (<NotAuth/>)
    }
    if (this.props.usersQueryConnection.loading) {
      return (<Loading />)
    }
    const {edges} = this.props.usersQueryConnection.usersConnection
    return (
      <React.Fragment>
      { edges && edges.map((user) => (
          <div className='cursor' key={user.node.id} >
            <div onClick={()=>this.props.elemClicked(user.node)}>
              <h3 className='black'>
                <Icon>fingerprint</Icon>{user.node.firstName} {user.node.lastName}
                </h3>
                Email: {user.node.email}
                <br/>
                Role: {user.node.role}
            </div>
            {!this.isUserMyself(user.node.id) && (
              <a
                className='pointer'
                onClick={() => this.deleteUser(user.node.id)}
                >
                Delete
              </a>
            )}
          </div>
      ))}
      {this.props.children}
    </React.Fragment>)
  }
}

export default compose(
  graphql(USERS_QUERY, {
    name: 'usersQueryConnection', // name of the injected prop: this.props.feedQuery...
    fetchPolicy: 'network-only',
    options: props => ({
      variables: {
        orderBy: props.orderBy,
        where: {
          lastName_contains: props.query
        }
      }
    })
  }),
  graphql(DELETE_USER_MUTATION, {
    name: 'deleteUser',
  }),
  withRouter,
  withApollo
)(UsersPageList)
