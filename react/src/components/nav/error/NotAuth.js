// @flow
import React from 'react'
import { withRouter } from 'react-router'
import Paper from '@material-ui/core/Paper'
import {Link} from 'react-router-dom'

type Props = {}
type State = {}

class NotAuth extends React.Component<Props, State> {
  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          Not authentificated!
          <br/>
          <br/>
          <Link to='/login'>Login</Link>
        </Paper>
      </div>
    )
  }
}

export default withRouter(NotAuth)
