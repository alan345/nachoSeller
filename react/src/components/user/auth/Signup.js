// @flow
import React from 'react'
import { AUTH_TOKEN } from '../../../constants/constants'
import { graphql, compose, withApollo } from 'react-apollo'
import { SIGNUP_MUTATION } from './GraphQL'
import { ME_QUERY_ROLE } from '../../GraphQL'
import Password from './Password'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import LinearProgress from '@material-ui/core/LinearProgress'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { withContext } from '../../withContext'
import './auth.css'

var validator = require('email-validator')

type State = {
  showThanksYouPage: false,
  email: string,
  lastNameValidation: boolean,
  firstNameValidation: boolean,
  emailValidation: boolean,
  inputValidation2: boolean,
  password: string,
  firstName: string,
  lastName: string,
  isPasswordActiveStep: boolean,
  activeStep: number,
  maxStep: number
}

type Props = {
  signupMutation: any,
  openSnackBar: (message: string) => void
}

class Signup extends React.Component<Props, State> {
  state = {
    email: '',
    lastNameValidation: true,
    firstNameValidation: true,
    emailValidation: true,
    inputValidation2: true,
    password: '',
    firstName: '',
    lastName: '',
    isPasswordActiveStep: false,
    activeStep: 0,
    maxStep: 3
  }

  lastNameRef: any
  emailRef: any
  input0: any

  onChangePassword(statePasword) {
    this.setState({
      password: statePasword.password,
      inputValidation2: statePasword.inputValidation2
    })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
    this.setState({ emailValidation: this.validateEmail(e.target.value) })
  }
  onChangeLastName(e) {
    this.setState({ lastName: e.target.value })
    this.setState({ lastNameValidation: this.validateLastName(e.target.value) })
  }
  onChangeFirstName(e) {
    this.setState({ firstName: e.target.value })
    this.setState({
      firstNameValidation: this.validateFirstName(e.target.value)
    })
  }
  validateEmail(email) {
    return validator.validate(email)
  }
  validateLastName(input) {
    return input.length > 3
  }
  validateFirstName(input) {
    return input.length > 3
  }
  calculateBuffer() {
    let data = ''
    if (this.state.activeStep === 0) {
      data = this.state.firstName
    }
    if (this.state.activeStep === 1) {
      data = this.state.lastName
    }
    if (this.state.activeStep === 2) {
      data = this.state.email
    }
    if (this.state.activeStep === 3) {
      data = this.state.password
    }
    let maxValue = data.length / 10 > 1 ? 1 : data.length / 10
    return ((this.state.activeStep + maxValue) * 100) / this.state.maxStep
  }
  handleNext = () => {
    if (this.state.firstName) {
      if (this.state.activeStep === 0) {
        if (this.state.firstNameValidation) {
          this.setState(
            {
              activeStep: this.state.activeStep + 1
            },
            () => {
              this.lastNameRef.focus()
            }
          )
        }
      }
      if (this.state.activeStep === 1) {
        if (this.state.lastNameValidation) {
          this.setState(
            {
              activeStep: this.state.activeStep + 1
            },
            () => {
              this.emailRef.focus()
              // this.setState({isPasswordActiveStep:true})
            }
          )
        }
      }
      if (this.state.activeStep === 2) {
        if (this.state.emailValidation) {
          this.setState(
            {
              activeStep: this.state.activeStep + 1
            },
            () => {
              // this.input2.focus()
              this.setState({ isPasswordActiveStep: true })
            }
          )
        }
      }
      if (this.state.activeStep === 3) {
        if (this.state.inputValidation2) {
          this._confirm()
        }
      }
    }
  }

  handleKey = data => {
    if (data.charCode === 13) {
      this.handleNext()
    }
  }
  onFocusField = field => {
    if (field === 'firstName') {
      this.setState({ activeStep: 0 })
    }
    if (field === 'lastName') {
      this.setState({ activeStep: 1 })
    }
    if (field === 'email') {
      this.setState({ activeStep: 2 })
    }
  }

  render() {
    if (this.state.showThanksYouPage) {
      return (
        <div className="paperOut">
          <Paper className="paperIn">
            <h1>THANKS YOU!</h1>
            <h4>You can refresh page!</h4>
            
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </Paper>
        </div>
      )
    }
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <h4 className="mv3">Sign Up</h4>
          <div className="flex flex-column">
            <LinearProgress
              variant="buffer"
              classes={{
                dashedColorPrimary: 'dashedColorPrimaryLinearProgress'
              }}
              value={(this.state.activeStep * 100) / this.state.maxStep}
              valueBuffer={this.calculateBuffer()}
            />
            <br />
            <div className="tac">
              <FormControl
                className={
                  'wrapperAnimate ' +
                  (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')
                }
              >
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  error={!this.state.firstNameValidation}
                  value={this.state.firstName}
                  onFocus={() => this.onFocusField('firstName')}
                  inputRef={node => (this.input0 = node)}
                  onChange={this.onChangeFirstName.bind(this)}
                  type="text"
                  onKeyPress={this.handleKey}
                />
              </FormControl>
              {this.state.activeStep === 0 && (
                <Button
                  onClick={this.handleNext}
                  variant="fab"
                  color="primary"
                  mini
                >
                  <Icon>navigate_next</Icon>
                </Button>
              )}

              <br />
              <br />
              {this.state.activeStep >= 1 && (
                <React.Fragment>
                  <FormControl
                    className={
                      'wrapperAnimate ' +
                      (this.state.activeStep === 1
                        ? 'focusField'
                        : 'notFocusField')
                    }
                  >
                    <InputLabel htmlFor="lastName">Last name</InputLabel>
                    <Input
                      id="lastName"
                      value={this.state.lastName}
                      onFocus={() => this.onFocusField('lastName')}
                      error={!this.state.lastNameValidation}
                      onChange={this.onChangeLastName.bind(this)}
                      type="text"
                      inputRef={node => (this.lastNameRef = node)}
                      onKeyPress={this.handleKey}
                    />
                  </FormControl>
                  {this.state.activeStep === 1 && (
                    <Button
                      onClick={this.handleNext}
                      variant="fab"
                      color="primary"
                      mini
                    >
                      <Icon>navigate_next</Icon>
                    </Button>
                  )}
                </React.Fragment>
              )}

              <br />
              <br />
              {this.state.activeStep >= 2 && (
                <React.Fragment>
                  <FormControl
                    className={
                      'wrapperAnimate ' +
                      (this.state.activeStep === 2
                        ? 'focusField'
                        : 'notFocusField')
                    }
                  >
                    <InputLabel htmlFor="email">Your email address</InputLabel>
                    <Input
                      id="email"
                      value={this.state.email}
                      onFocus={() => this.onFocusField('email')}
                      error={!this.state.emailValidation}
                      onChange={this.onChangeEmail.bind(this)}
                      type="text"
                      inputRef={node => (this.emailRef = node)}
                      onKeyPress={this.handleKey}
                    />
                  </FormControl>
                  {this.state.activeStep === 2 && (
                    <Button
                      onClick={this.handleNext}
                      variant="fab"
                      color="primary"
                      mini
                    >
                      <Icon>navigate_next</Icon>
                    </Button>
                  )}
                </React.Fragment>
              )}
              <br />
              <br />
              {this.state.activeStep >= 3 && (
                <React.Fragment>

                  Request will be sent to NachoNacho via POST API to check if token is correct, berfore create user.
                  <br />
                  <Password
                    handleNext={this.handleNext.bind(this)}
                    activeStep={this.state.isPasswordActiveStep}
                    onChange2={this.onChangePassword.bind(this)}
                  />

                </React.Fragment>
              )}
            </div>
          </div>
        </Paper>
      </div>
    )
  }

  _confirm = async () => {
    const { firstName, email, password, lastName } = this.state
    if (!password) {
      return
    }
    let result
    try {
      result = await this.props.signupMutation({
        variables: {
          firstName,
          lastName,
          email,
          password
        }
      })
    } catch (e) {
      if (e.graphQLErrors.length) {
        this.props.openSnackBar(e.graphQLErrors[0].message)
      } else {
        this.props.openSnackBar('error')
      }
      this.setState({ activeStep: 0 })
      throw e
    }
    const { token, user } = result.data.signup
    this._saveUserData(token, user)
  }

  _saveUserData = async (token, user) => {
    this.setState({ showThanksYouPage: true })
    // localStorage.setItem(AUTH_TOKEN, token)
    // localStorage.setItem('userToken', JSON.stringify(user))
    // window.location.reload()
    // try {
    //   await this.props.refetchMe()
    // this.props.history.push(`/`)
    //   this.props.openSnackBar('Sign In successful!')
    // } catch (e) {
    //   console.log(e)
    // }
  }
}

export default compose(
  withApollo,
  withContext,
  graphql(ME_QUERY_ROLE, { name: 'me' }),
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' })
)(Signup)
