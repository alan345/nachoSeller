// @flow
import React from 'react'
import {withContext} from './withContext'
import Home from './nav/home/Home'
import Privacy from './nav/page/Privacy'
import About from './nav/page/About'
import HowItWorks from './nav/page/HowItWorks'
import Contact from './nav/page/Contact'
import FAQ from './nav/page/FAQ'
import Terms from './nav/page/Terms'
import UsersPage from './user/list/UsersPage'
import UserPage from './user/single/UserPage'
import ProductsPage from './product/list/ProductsPage'
import ProductPage from './product/single/ProductPage'
import ProductPageCreate from './product/single/ProductPageCreate'
import CategorieProductPage from './categorieProduct/single/CategorieProductPage'
import OrderCreate from './order/single/OrderCreate'
import SellerSignup from './subscription/single/SellerSignup'
import CancelSubscription from './subscription/single/CancelSubscription'
import Subscription from './subscription/single/Subscription'
import ThankYouPage from './order/single/ThankYouPage'
import Checkout from './order/single/Checkout'
import OrderList from './order/list/OrderList'
import ForgetPassword from './user/auth/ForgetPassword'
import LoginPage from './user/auth/LoginPage'
import MagicLink from './user/auth/MagicLink'
import MagicLinkLogin from './user/auth/MagicLinkLogin'
import Signup from './user/auth/Signup'
import ResetPassword from './user/auth/ResetPassword'
import ValidateEmail from './user/auth/ValidateEmail'
import {
  BrowserRouter as Router, //HashRouter
  Route,
  Switch,
} from 'react-router-dom'
import Header from './nav/header/Header'
import Footer from './nav/footer/Footer'
import NotFound from './nav/error/NotFound'
import SideBar from './nav/layout/SideBar'

type Props = {}
type State = {}

class SubApp extends React.Component<Props, State> {
  render() {
    // console.log(this.props.me.me)
    return (
      <Router>
        <React.Fragment>
            <SideBar />
              <Header />
              <div className='components'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/users' component={UsersPage} />
                  <Route path='/user/myAccount' component={UserPage} />
                  <Route path='/user/admin/:id' component={UserPage} />
                  <Route path='/category/:urlName' component={CategorieProductPage} />
                  <Route path='/products' component={ProductsPage} />
                  <Route path='/orders' component={OrderList} />
                  <Route path='/product/create' component={ProductPageCreate} />
                  <Route path='/product/:urlName' component={ProductPage} />
                  <Route path='/order/create/:productId' component={OrderCreate} />
                  <Route path='/order/Checkout/:productId' component={Checkout} />
                  <Route path='/order/ThankYouPage/:orderId' component={ThankYouPage} />
                  <Route path='/subscription/sellerSignup/:subscriptionId' component={SellerSignup} />
                  <Route path='/subscription/cancelSubscription/:subscriptionId' component={CancelSubscription} />
                  <Route path='/subscription/:subscriptionId' component={Subscription} />
                  <Route path='/login' component={LoginPage} />
                  <Route path='/magicLink' component={MagicLink} />
                  <Route path='/magicLinkLogin' component={MagicLinkLogin} />
                  <Route path='/signup' component={Signup} />
                  <Route path='/forgetPassword' component={ForgetPassword} />
                  <Route path='/resetPassword' component={ResetPassword} />
                  <Route path='/validateEmail' component={ValidateEmail} />
                  <Route path='/page/about' component={About} />
                  <Route path='/page/howItWorks' component={HowItWorks} />
                  <Route path='/page/FAQ' component={FAQ} />
                  <Route path='/page/contact' component={Contact} />
                  <Route path='/page/terms' component={Terms} />
                  <Route path='/page/privacy' component={Privacy} />
                  <Route component={NotFound} />
                </Switch>
              </div>
              <Footer />
        </React.Fragment>
      </Router>
    )
  }
}

export default withContext(SubApp)
