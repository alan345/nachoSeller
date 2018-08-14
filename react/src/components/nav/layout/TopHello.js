// @flow
import React from 'react'
import MenuAvatar from './MenuAvatar'
import { Link } from 'react-router-dom'
import {withContext} from '../../withContext'
import Button from '@material-ui/core/Button'
import type { User } from '../../user/User.type'

type State = {}

type Props = {
  me: User
}

class TopHello extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {(this.props.me) ? (
          <MenuAvatar user={this.props.me} nameFile={this.props.me.nameFile}/>
        ) : (
          <React.Fragment>
            <Link to='/login'>
              <Button>
                Sign in
              </Button>
            </Link>
            <Link to='/signup'>
              <Button color='primary' variant='contained'>
                Sign up
              </Button>
            </Link>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default withContext(TopHello)
