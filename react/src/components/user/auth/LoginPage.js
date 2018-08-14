// @flow
import React from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose, withApollo } from 'react-apollo'
import { LOGIN_MUTATION } from './GraphQL'
import { ME_QUERY_ROLE } from '../../GraphQL'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import {Link} from 'react-router-dom'
import {withContext} from '../../withContext'

type State = {
  email: string,
  password: string,
  name: string,
  activeStep: number,
}

type Props = {
  loginMutation: any,
  history: any,
  refetchMe: () => void,
  openSnackBar: (message: string) => void
}

class LoginPage extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    name: '',
    activeStep: 0,
  }
  passwordRef = {}
  emailRef = {}


  onFocusField = (field) => {
    if(field === 'email') { this.setState({activeStep:0}) }
    if(field === 'password') { this.setState({activeStep:1}) }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if(this.state.activeStep===0) {
        this.passwordRef.focus()
        this.setState({activeStep: 1})
      } else if(this.state.activeStep===1) {
        this._confirm()
      }
    }
  }

  render() {
    return (
      <div className='paperOut'>
        <Paper className='paperIn smallPaper'>
        <div className='tac'>
          <h3>Sign In</h3>
          <div>
            New to NachoNacho? <Link to='/signup'>Sign up</Link>
            <br />
            <br />
            <Link to='/magicLink'>Sign In with Magic Link?</Link>
          </div>
          <br />
          <div>
            <FormControl>
              <InputLabel htmlFor='email'>Your email address</InputLabel>
              <Input
                id='email'
                onChange={e => this.setState({ email: e.target.value })}
                type='text'
                onFocus={() => this.onFocusField('email')}
                inputRef={node => this.emailRef = node}
                onKeyPress={this.handleKeyPress}
                value={this.state.email}/>
            </FormControl>
          </div>
          <div>

            <FormControl>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                id='password'
                onChange={e => this.setState({ password: e.target.value })}
                type='password'
                onFocus={() => this.onFocusField('password')}
                inputRef={node => this.passwordRef = node}
                onKeyPress={this.handleKeyPress}
                value={this.state.password}/>
            </FormControl>
            <div>
              <Link to='/forgetPassword'>Forget Your password?</Link>
            </div>
          </div>
        <br />
          <div>
            <Button id='ok' variant='raised' onClick={() => this._confirm()}>
              Ok
            </Button>
          </div>
        </div>
      </Paper>
      </div>
    )
  }

  _confirm = async () => {
    const { email, password } = this.state
    try {
      let result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })
      const { token, user } = result.data.login
      this._saveUserData(token, user)
    } catch (e) {
      console.log(e)
      this.props.openSnackBar(e.graphQLErrors[0].message)
    }
  }

  _saveUserData = async (token, user) => {
    localStorage.setItem(AUTH_TOKEN, token)
    localStorage.setItem('userToken', JSON.stringify(user))

    try {
      await this.props.refetchMe()
      this.props.history.push(`/`)
      this.props.openSnackBar('Sign In successful!')
    } catch (e) {
      console.log(e)   
    }
  }
}

export default compose(
  graphql(LOGIN_MUTATION, {name: 'loginMutation'}),
  graphql(ME_QUERY_ROLE, {name: 'mequery'}),
  withApollo,  
  withContext
)(LoginPage)
