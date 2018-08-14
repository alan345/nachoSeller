// @flow
import React from 'react'

var parse = require('date-fns/parse')
var format = require('date-fns/format')

type State = {}

type Props = {
  date: Date
}

class DateComponent extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {format(parse(this.props.date), 'MMM, DD YYYY')}
      </React.Fragment>
    )
  }
}

export default DateComponent
