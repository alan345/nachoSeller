// @flow
import React from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import UserProfileEdit from './UserProfileEdit'
import UserProfileView from './UserProfileView'

type State = {
  isEditMode: boolean
}

type Props = {
  userId: string
}


class UserProfile extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }
  changeEditMode = () => {
    this.setState({isEditMode: !this.state.isEditMode})
  }
  render() {
    return (
        <div className='paperOut'>
          <Paper className='paperIn'>
            {this.state.isEditMode ? (
              <UserProfileEdit changeEditMode={this.changeEditMode} userId={this.props.userId} />
            ) : (
              <React.Fragment>
                <span className='floatRight cursor' onClick={this.changeEditMode}>Edit</span>
                <UserProfileView userId={this.props.userId}/>
              </React.Fragment>
            )}
          </Paper>
        </div>
      )
    }
}

export default compose(
  withRouter
)(UserProfile)
