// @flow
import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import {AUTH_TOKEN} from '../../../constants/constants'
import { withContext } from '../../withContext'
import { withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

type State = {}

type Props = {
  openSnackBar: (message: string) => void,
  client: any
}

class Logout extends React.Component<Props, State> {
  logout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    this.props.openSnackBar('You are now Logout')
    this.props.client.resetStore()
    this.props.history.push('/')
  }

  render() {
     return (
      <MenuItem onClick={() => this.logout()}>Logout</MenuItem>    
     )
  }
}

export default compose(
  withContext,
  withRouter,
  withApollo
)(Logout)
