// @flow
import React from 'react'

type State = {}

type Props = {
  status: string,
}

class MappingStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      statusLabel: this.getStatusLabel(this.props.status)
    }
  }
    

  getStatusLabel = (status: string) => ({
    'ACTIVE_TRIAL': 'Active',
    'ACTIVE_OFF_CYCLE': 'Active',
    'ACTIVE_REGULAR': 'Active',
    'ACTIVE_UNTIL_END_BILLING': 'Ending Soon',
    'PENDING_SIGNUP': 'SignUp pending',
    'PENDING_PAYMENT': 'Payment pending',
    'CANCELLED': 'Cancelled',
    'CANCELLED_BY_ADMIN': 'Cancelled',
  })[status]

  render() {
    return (
      <React.Fragment>
       { this.state.statusLabel}
      </React.Fragment>
    )
  }
}

export default MappingStatus
