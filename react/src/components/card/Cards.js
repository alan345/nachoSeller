// @flow
import React from 'react'
import DeleteCard from './DeleteCard'
import SetDefaultSource from './SetDefaultSource'
import Paper from '@material-ui/core/Paper'
import type {Card} from './Card.type'
import type { UserStripe } from './UserStripe.type'
type State = {
  cards: Card[]
}

type Props = {
  userStripe: UserStripe,
  userId: string,
  showDefaultCard: boolean
}

class Cards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      cards: this.getCardsUpdated(props.showDefaultCard, props.userStripe)
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.userStripe !== prevProps.userStripe) {
      this.setState({cards: this.getCardsUpdated(this.props.showDefaultCard, this.props.userStripe)})
    }
  }

  getCardsUpdated = (showDefaultCard: Card, userStripe: UserStripe) => {
    if(showDefaultCard) {
      return userStripe.sources.data.filter(card => card.id === userStripe.default_source)
    } else {
      return userStripe.sources.data
    }
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          {
            this.state.cards && this.state.cards.map((card) => (
              <div key={card.id}>
                <h3>{card.brand} {' '}
                  {card.id === this.props.userStripe.default_source ? (
                    <small>Default</small>
                  ) : (
                    <SetDefaultSource card={card} userId={this.props.userId}/>
                  )}
                </h3>
                <div className='floatRight'>
                  {this.state.cards.length>1 && (
                    <DeleteCard card={card} userId={this.props.userId}/>
                  )}
                </div>
                <div>
                  {card.brand} ({card.funding}) ending by {card.last4} <br />
                  expired on {card.exp_month}/{card.exp_year}
                </div>
              </div>
            ))
          }
        </Paper>
      </div>
    )
  }
}

export default Cards
