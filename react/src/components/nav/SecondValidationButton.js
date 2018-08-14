// @flow
import React from 'react'
import Button from '@material-ui/core/Button'

class SecondValidationButton extends React.Component<Props, State> {
  state={
    isAskingValidation: false
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isAskingValidation ? (
          <React.Fragment>
            <Button color={this.props.color} variant={this.props.variant} onClick={this.props.onClick}>Sure?</Button>
            <Button variant={this.props.variant} onClick={()=>this.setState({isAskingValidation: false})}>nope!</Button>
          </React.Fragment>
        ) : (
          <Button color={this.props.color} variant={this.props.variant} onClick={()=>this.setState({isAskingValidation: true})}>{this.props.buttonText}</Button>
        )}
      </React.Fragment>
    )
  }
}

export default SecondValidationButton
