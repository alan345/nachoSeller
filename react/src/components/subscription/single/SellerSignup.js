// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { SUBSCRIPTION_QUERY } from '../GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'

type State = {
  openIframe: boolean,
  openSignupInNachoNacho: boolean
}

type Props = {
  subscriptionQuery: any
}

class SellerSignup extends React.Component<Props, State> {
  state = {
    openIframe: false,
    openSignupInNachoNacho: false
  }

  ifr: any

  render() {
    if (this.props.subscriptionQuery.error) { return (<NotAuth />) }
    if (this.props.subscriptionQuery.loading) { return (<Loading />) }
    if(!this.props.subscriptionQuery) { return (<NotFound/>) }

    return (
        <div className='paperOut'>
          <Paper className='paperIn tac'>
              <h1>Seller Signup!</h1>
              <div className='cursor' onClick={()=>this.setState({openIframe:!this.state.openIframe})}>1/ open in Iframe</div>
              A token will be added in URL. This token will be used for the callback.<br />
              Issue with allow-same-origin..<br />
              Cannot trigger when user validate form into Iframe.

              {this.state.openIframe && (
                  <iframe
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    style={{ width: '100%', height: '700px' }}
                    src={this.props.subscriptionQuery.subscription.product.signupLink}
                    ref={(f) => { this.ifr = f }}
                  />
              )}
              <br />
              <br />
            <div className='cursor' onClick={()=> window.open(this.props.subscriptionQuery.subscription.product.signupLink, "_blank")}>
            2/ Open in other windows
            </div>
            A token will be added in URL. This token will be used for the callback.<br />
            If SellerSignup & callback form nachoNacho are ok,<br />
            User can stay on buyer website. No need to go back on MachoNacho           
            <br />
            <br />
            <div className='cursor' onClick={()=>this.setState({openSignupInNachoNacho:!this.state.openSignupInNachoNacho})}>3/ Signup in NachoNacho</div>
            Form will send information throught Seller API, in order to create a new User. <br />
            Once user is created, a link will be available in `my account` to go to login to buyer website.
            {this.state.openSignupInNachoNacho && (
              <div>
              <TextField id="name" label="Name" /><br />
              <TextField id="email" label="email" /><br />
              <TextField id="name" label="address" /><br />
              <TextField id="name" label="city" /><br />
              <TextField id="name" label="country" /><br />
              <TextField id="name" label="language" /><br />
              ...
              </div>
            )}
            <br />
            <br />
            <br />
          </Paper>
        </div>
    )
  }
}

export default compose(
  graphql(SUBSCRIPTION_QUERY, {
    name: 'subscriptionQuery',
    options: props => ({
      variables: {
          where: {
            id: props.match.params.subscriptionId,
          }
        },
    }),
  }),
  withApollo,
  withRouter,
)(SellerSignup)
