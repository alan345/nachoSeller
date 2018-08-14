// @flow
import React from 'react'
import TopHello  from '../layout/TopHello'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {withContext} from '../../withContext'
import { Link } from 'react-router-dom'
import './Header.css'

type State = {}

type Props = {
  isMobile: boolean,
  toggleDrawer: (toggleDrawer: boolean) => void
}

class Header extends React.Component<Props, State> {
  render() {
    return (
      <div className='flexGrow'>
        <AppBar classes={{'root': 'rootHeader'}} position='static' color='inherit'>
          <Toolbar>
            {this.props.isMobile && (
              <React.Fragment>
                <Icon onClick={this.props.toggleDrawer(true)}>menu</Icon>
                <div className='flex'></div>
              </React.Fragment>
            )}
            <Link to='/'>
              <Button>
                <img src='/logo/NN_vert_reversed.png' className='logo' alt='logo' />
              </Button>
            </Link>
            <div className='flex'></div>
              <React.Fragment>
                {(!this.props.isMobile) && (
                  <TopHello />
                )}
              </React.Fragment>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withContext(Header)
