// @flow
import React from 'react'
import { withContext } from '../../withContext'
import Paper from '@material-ui/core/Paper'
import UserDrawer from './UserDrawer'
import EmailValidated from '../../nav/emailValidation/EmailValidated'

type State = {}

type Props = {
  match: {
    params: {
      userId: String
    }
  }
}

class UserPage extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <div className='paperOut'>
          <EmailValidated />
          <Paper>
            <UserDrawer userId={this.props.match.params.userId}/>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export default withContext(UserPage)
