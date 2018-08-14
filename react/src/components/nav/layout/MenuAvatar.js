// @flow
import React from 'react'
import {withRouter} from 'react-router'
import Button from '@material-ui/core/Button'
import ImageTemplate from '../ImageTemplate'
import MenuList from './MenuList'
import Menu from '@material-ui/core/Menu'
import { withApollo, compose } from 'react-apollo'

type State = {
  anchorEl: any
}

type Props = {
  nameFile: string
}

class MenuAvatar extends React.Component<Props, State> {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
       return (
         <div>
           <Button
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}>
            <ImageTemplate format={'avatar'} nameFile={this.props.nameFile} />
           </Button>
           <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}>
            <MenuList onClose={this.handleClose}/>
           </Menu>
         </div>
       )
    }
}

export default compose(
  withRouter,
  withApollo
)(MenuAvatar)
