// @flow
import React from 'react'
import { withRouter } from 'react-router'
import Paper from '@material-ui/core/Paper'
import {Link} from 'react-router-dom'
import { AUTH_TOKEN } from '../../../constants/constants'

type Props = {
  history: any
}

type State = {}

class NotFound extends React.Component<Props, State> {
  logout () {
    localStorage.removeItem(AUTH_TOKEN)
    this.props.history.push(`/login`)
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          404 Error !!
          <br/>
          <Link to='/'>Home</Link>
          <div onClick={this.logout}>Logout</div>
        </Paper>
      </div>
    )
  }
}

export default withRouter(NotFound)
