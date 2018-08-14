// @flow
import React from 'react'
import Button from '@material-ui/core/Button'
import { graphql, compose } from 'react-apollo'
import { injectStripe, CardCVCElement, CardExpiryElement, CardNumberElement} from 'react-stripe-elements'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../withContext'
import {CREATE_CARD_MUTATION, USER_STRIPE_QUERY} from './GraphQL'
import './Card.css'

type State = {}

type Props = {
  openSnackBar: (message: string) => void,
  createCardMutation: any
}

class AddCard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    let {token} = await this.props.stripe.createToken({name: 'card'})
    if (token) {
      try {
        await this.props.createCardMutation({
          variables: {tokenCardId: token.id },
        })
        this.props.openSnackBar('Card Successfully Added')
      } catch (e) {
        e.graphQLErrors.some(graphQLError => this.props.openSnackBar(graphQLError.message))
        throw e
      }
    }
  }

  render() {
    return (
      <Grid container >
        <Grid item xs={12} sm={8}>
          <h3>Add your Card <small>4242424242424242</small></h3>
        </Grid>
        <Grid item xs={12} sm={4} className='tac'>
          <img alt='Card' className='cardsImg' src='/cards.png' />
        </Grid>

        <Grid item xs={12} sm={12}>
          <CardNumberElement />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardExpiryElement />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardCVCElement />
        </Grid>
        <Grid item xs={12} sm={12} className='tac'>
          <Button className='creatCardButton' onClick={this.submit}>Create Card</Button>
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  graphql(CREATE_CARD_MUTATION, {
    name: 'createCardMutation',
    options: props => ({
      refetchQueries: [{
        query: USER_STRIPE_QUERY,
        variables: { userId: props.userId }
      }]
    })
   }),
   withContext,
  injectStripe
)(AddCard)
