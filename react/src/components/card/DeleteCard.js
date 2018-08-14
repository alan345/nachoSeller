// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import {DELETE_CARD_MUTATION, USER_STRIPE_QUERY} from './GraphQL'
import Icon from '@material-ui/core/Icon'
import { withContext } from '../withContext'
import type {Card} from './Card.type'

type State = {}

type Props = {
  deleteCard: any,
  openSnackBar: (message: string) => void,
  card: Card
}

class DeleteCard extends React.Component<Props, State> {
  deleteCard = async stripe_card_id => {
    try {
      await this.props.deleteCard({
        variables: {
          stripe_card_id: stripe_card_id
        },
      })
    } catch (e) {
      this.props.openSnackBar(e.graphQLErrors[0].message)
    }
    this.props.openSnackBar('Card Successfully Deleted')
  }

  render() {
    return (
      <Icon className='black cursor' onClick={()=> this.deleteCard(this.props.card.id)}>delete</Icon>
    )
  }
}

export default compose(
  graphql(DELETE_CARD_MUTATION, {
    name: 'deleteCard',
    options: props => ({
      refetchQueries: [{
        query: USER_STRIPE_QUERY,
        variables: { userId: props.userId}
      }]
    })
  }),
  withContext
)(DeleteCard)
