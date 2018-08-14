// @flow
import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { AppContext } from '../../AppContext'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import Logout from './Logout'

type State = {}

type Props = {}

class MenuList extends React.Component<Props, State> {
  onClose = () => {
    this.props.onClose()
  }

  render() {
     return (
       <AppContext.Consumer>
         {context => (
           <React.Fragment>
             {(context.me) ? (
               <React.Fragment>
                 <Link to={'/user/myAccount'}>
                   <MenuItem onClick={this.onClose.bind(this)}>My Account</MenuItem>
                 </Link>
                 {(context.me && context.me.role) === 'ADMIN' && (
                   <React.Fragment>
                     <Link to='/product/create'>
                       <MenuItem onClick={this.onClose.bind(this)}>Create Product</MenuItem>
                     </Link>
                     <Link to='/users'>
                       <MenuItem onClick={this.onClose.bind(this)}>Users</MenuItem>
                     </Link>
                     <Link to='/products'>
                       <MenuItem onClick={this.onClose.bind(this)}>All Products</MenuItem>
                     </Link>
                     <Link to='/orders'>
                       <MenuItem onClick={this.onClose.bind(this)}>Orders</MenuItem>
                     </Link>
                   </React.Fragment>
                 )}
                 <Logout />
               </React.Fragment>
             ) : (
               <React.Fragment>
                 <Link to='/login'>
                   <MenuItem onClick={this.onClose.bind(this)}>Sign In</MenuItem>
                 </Link>
                 <Link to='/signup'>
                   <MenuItem onClick={this.onClose.bind(this)}>Sign Up</MenuItem>
                 </Link>
               </React.Fragment>
             )}
           </React.Fragment>
         )}
       </AppContext.Consumer>
     )
  }
}

export default withApollo(MenuList)
