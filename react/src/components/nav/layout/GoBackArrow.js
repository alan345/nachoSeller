// @flow
import React from 'react'
import {withRouter} from 'react-router'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

type State = {
}

type Props = {
  history: any
}

class GoBackArrow extends React.Component<Props, State> {
  render() {
       return (
         <Button variant="contained" onClick={this.props.history.goBack}>
          <Icon>arrow_back</Icon>
         </Button>
       )
    }
}

export default withRouter(GoBackArrow)
