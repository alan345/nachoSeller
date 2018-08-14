// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import { UPDATE_DEFAULT_SOURCE_MUTATION, USER_STRIPE_QUERY} from './GraphQL'
import Button from '@material-ui/core/Button'
import { withContext } from '../withContext'
import type { Card } from './Card.type'

type State = {}

type Props = {
  card: Card,
  openSnackBar: (message: string) => void,
  setDefaultSource: any
}

class SetDefaultSource extends React.Component<Props, State> {
  setDefaultSource = async stripe_card_id => {
    try {
      await this.props.setDefaultSource({
        variables: {
          stripe_card_id: stripe_card_id
        }
      })
      this.props.openSnackBar('Card Successfully Set as Default')
    } catch (e) {
      e.graphQLErrors.some(graphQLError => this.props.openSnackBar(graphQLError.message))
      throw e
    }
  }

  render() {
    return (
      <Button onClick={()=>this.setDefaultSource(this.props.card.id)}>Set as Default</Button>
    )
  }
}

export default compose(
  graphql(UPDATE_DEFAULT_SOURCE_MUTATION, {
    name: 'setDefaultSource',
    options: props => ({
      refetchQueries: [{
        query: USER_STRIPE_QUERY,
        variables: { userId: props.userId}
      }]
    })
  }),
  withContext
)(SetDefaultSource)
