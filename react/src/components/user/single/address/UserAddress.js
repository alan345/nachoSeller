// @flow
import React from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import UserAddressEdit from './UserAddressEdit'
import UserAddressView from './UserAddressView'

class UserAddress extends React.Component<Props, State> {
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
          {this.props.showTitle && (
            <h3>Billing Address</h3>
          )}
          {this.state.isEditMode ? (
            <UserAddressEdit changeEditMode={this.changeEditMode} userId={this.props.userId} />
          ) : (
            <React.Fragment>
              {this.props.canEdit && (
                <span className='floatRight cursor' onClick={this.changeEditMode}>Edit</span>
              )}
              <UserAddressView userId={this.props.userId}/>
            </React.Fragment>
          )}
        </Paper>
      </div>
    )
  }
}

export default compose(
  withRouter
)(UserAddress)
