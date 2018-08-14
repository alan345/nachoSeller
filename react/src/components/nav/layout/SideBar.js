// @flow
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import {AppContext} from '../../AppContext'
import MenuList from './MenuList'
import ImageTemplate from '../ImageTemplate'

type State = {}

type Props = {}

class SideBar extends React.Component<Props, State> {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Drawer
            variant={context.state.variant}
            open={context.state.isSideBarOpen}
            onClose={context.toggleDrawer(false)}>
            <div onClick={context.toggleDrawer(false)} >
              <MenuItem>
                <Icon>arrow_back</Icon>
                <div className='flex'></div>
                {context.me && (
                  <ImageTemplate format={'avatar'} nameFile={context.me.nameFile} />
                )}
              </MenuItem>
              <MenuList onClose={()=>{}}/>
            </div>
          </Drawer>
        )}
      </AppContext.Consumer>
    )
  }
}

export default SideBar
