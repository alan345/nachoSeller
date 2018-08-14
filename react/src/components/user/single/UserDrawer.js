// @flow
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import OrderList from '../../order/list/OrderList'
import UserProfile from './profile/UserProfile'
import UserAddress from './address/UserAddress'
import UserPricingElement from './UserPricingElement'
import SubscriptionList from '../../subscription/list/SubscriptionList'
import CardPage from '../../card/CardPage'
import UpdatePassword from '../auth/UpdatePassword'
import { withContext } from '../../withContext'
import './UserDrawer.css'

type State = {
  menuSelected: string
}

type Props = {
  userId: string,
  isMobile: boolean
}

class UserDrawer extends React.Component<Props, State> {
  state = {
    menuSelected: 'subscriptions'
  }

  isUserMyself = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'))
    return userToken.id === this.props.userId
  }

  render() {
    return (
      <div className="root">
        <Drawer
          variant="permanent"
          classes={{
            paper: this.props.isMobile
              ? 'paperDrawerWidthMobile'
              : 'paperDrawerWidthDesktop'
          }}
        >
          <List>
            <ListItem
              button
              onClick={() => {
                this.setState({ menuSelected: 'subscriptions' })
              }}
            >
              <Icon className="black cursor">view_quilt</Icon>
              <ListItemText primary="Subscriptions" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menuSelected: 'orders' })
              }}
            >
              <Icon className="black cursor">view_list</Icon>
              <ListItemText primary="Invoices" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                this.setState({ menuSelected: 'profile' })
              }}
            >
              <Icon className="black cursor">person</Icon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                this.setState({ menuSelected: 'cards' })
              }}
            >
              <Icon className="black cursor">credit_card</Icon>
              <ListItemText primary="Payment" />
            </ListItem>
            {this.isUserMyself() && (
              <ListItem
                button
                onClick={() => {
                  this.setState({ menuSelected: 'updatePassword' })
                }}
              >
                <Icon className="black cursor">security</Icon>
                <ListItemText primary="Password" />
              </ListItem>
            )}
          </List>
        </Drawer>

        <main className="mainDrawer">
          {this.state.menuSelected === 'orders' && (
            <React.Fragment>
              <h3>My Invoices</h3>
              <OrderList hideUser={true} userId={this.props.userId} />
            </React.Fragment>
          )}
          {this.state.menuSelected === 'profile' && (
            <React.Fragment>
              <h3>My Profile</h3>
              <UserProfile userId={this.props.userId} />
            </React.Fragment>
          )}
          {this.state.menuSelected === 'cards' && (
            <React.Fragment>
              <h3>Payment</h3>
              <CardPage
                showDefaultCard={false}
                canAddCard={true}
                userId={this.props.userId}
              />
              <br />
              <h3>Billing Address</h3>
              <UserAddress canEdit={true} userId={this.props.userId} />
            </React.Fragment>
          )}
          {this.state.menuSelected === 'subscriptions' && (
            <React.Fragment>
              <SubscriptionList
                title={'Errors'}
                hideIfNoData={true}
                status={[
                  'PENDING_SIGNUP',
                  'PENDING_PAYMENT',
                ]}
                userId={this.props.userId}
              />

              <h3>Current Subscriptions</h3>
              <UserPricingElement
                userId={this.props.userId}
                v={0}
                getUserPricingData={() => {}}
              />
              <SubscriptionList
                title=""
                status={['ACTIVE_TRIAL', 'ACTIVE_OFF_CYCLE', 'ACTIVE_REGULAR']}
                userId={this.props.userId}
              />
              <br />
              <SubscriptionList
                title={'Ending Soon'}
                status={['ACTIVE_UNTIL_END_BILLING']}
                userId={this.props.userId}
              />

              <br />
              <SubscriptionList
                title={'Prior Subscriptions'}
                status={['CANCELLED', 'CANCELLED_BY_ADMIN']}
                userId={this.props.userId}
                orderBy={'endAt_ASC'}
              />
            </React.Fragment>
          )}
          {this.state.menuSelected === 'updatePassword' && (
            <React.Fragment>
              <h3>Update Password</h3>
              <UpdatePassword />
            </React.Fragment>
          )}
        </main>
      </div>
    )
  }
}

export default withContext(UserDrawer)
