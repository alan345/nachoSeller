// @flow
import React from 'react'
import Paper from '@material-ui/core/Paper'

type State = {}

type Props = {}

class Loading extends React.Component<Props, State> {
    render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn'>
          Loading...
        </Paper>
      </div>
    )
  }
}

export default Loading
