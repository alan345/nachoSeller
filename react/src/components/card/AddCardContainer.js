// @flow
import React from 'react'
import AddCard from './AddCard'
import {Elements, StripeProvider} from 'react-stripe-elements'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import { STRIPE_KEY_PK } from '../../constants/constants'

class AddCardContainer extends React.Component<Props, App>  {
  state = {
    showAddCard: false
  }
  render() {
    return (
      <React.Fragment>
        <div className='paperOut'>
          {(!this.state.showAddCard && this.props.userStripe.sources.data.length)  ? (
            <Icon className='cursor' onClick={()=> this.setState({showAddCard: !this.state.showAddCard})}>add</Icon>
          ) : (
            <Paper className='paperIn'>
              <StripeProvider apiKey={STRIPE_KEY_PK}>
                <Elements>
                  <AddCard userId={this.props.userId} user={this.props.user} />
                </Elements>
              </StripeProvider>
            </Paper>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default AddCardContainer
