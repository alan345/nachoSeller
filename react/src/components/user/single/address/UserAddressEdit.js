// @flow
import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { USER_ADDRESS_QUERY, UPDATE_USER_ADDRESS_MUTATION } from '../../GraphQL'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

type State = {}

type Props = {
  changeEditMode: () => void,
  showTitle: boolean
}


class UserAddressEdit extends React.Component<Props, State> {
  render() {
    if (this.props.userQuery.error) { return ( <NotAuth/> ) }
    if (this.props.userQuery.loading) { return (<Loading />) }
    if(!this.props.userQuery) { return ( <NotFound/> ) }

    return (
    <React.Fragment>
      {this.props.showTitle && (
        <h3>Billing Address</h3>
      )}
          <Grid container >
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor='firstName'>firstName</InputLabel>
                <Input id='firstName' onChange={e => this.updateUserData({
                    ...this.props.userQuery.user,
                    firstName: e.target.value
                  })} type='text' value={this.props.userQuery.user.firstName}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor='lastName'>lastName</InputLabel>
                <Input id='lastName' onChange={e => this.updateUserData({
                    ...this.props.userQuery.user,
                    lastName: e.target.value
                  })} type='text' value={this.props.userQuery.user.lastName}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor='billingCountry'>billingCountry</InputLabel>
                <Input id='billingCountry' onChange={e => this.updateUserData({
                    ...this.props.userQuery.user,
                    billingCountry: e.target.value
                  })} type='text' value={this.props.userQuery.user.billingCountry}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor='billingState'>billingState</InputLabel>
                <Input id='billingState' onChange={e => this.updateUserData({
                    ...this.props.userQuery.user,
                    billingState: e.target.value
                  })} type='text' value={this.props.userQuery.user.billingState}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <InputLabel htmlFor='billingAdress'>billingAdress</InputLabel>
                <Input id='billingAdress' onChange={e => this.updateUserData({
                    ...this.props.userQuery.user,
                    billingAdress: e.target.value
                  })} type='text' value={this.props.userQuery.user.billingAdress}/>
                </FormControl>
              </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor='billingZip'>billingZip</InputLabel>
                <Input id='billingZip' onChange={e => this.updateUserData({
                    ...this.props.userQuery.user,
                    billingZip: e.target.value
                  })} type='text' value={this.props.userQuery.user.billingZip}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <InputLabel htmlFor='billingCity'>billingCity</InputLabel>
                <Input id='billingCity' onChange={e => this.updateUserData({
                    ...this.props.userQuery.user,
                    billingCity: e.target.value
                  })} type='text' value={this.props.userQuery.user.billingCity}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <br />
            </Grid>
            <Grid item xs={12} sm={12}>
            <div className=''>
              <Button onClick={() => this.props.changeEditMode()} >
                Cancel
              </Button>            
              <Button onClick={() => this.updateUser()} >
                Save
              </Button>
            </div>
            </Grid>
          </Grid>
        </React.Fragment>
  )
  }

  updateUserData(user) {
    this.props.userQuery.user = user
    this.forceUpdate()
  }

  updateUser = async () => {
    let id = this.props.userQuery.user.id
    const {
      firstName, lastName, email, role, nameFile, gender, billingAdress, billingCity,
      billingZip, billingState, billingCountry, birthday, language
    } = this.props.userQuery.user

    await this.props.updateUser({
      variables: {
        where: {id: id},
        data: {
          firstName, lastName, email, role, nameFile, gender, billingAdress, billingCity,
          billingZip, billingState, billingCountry, birthday, language
        },
      }
    })
    this.props.changeEditMode()
  }
}

export default compose(
  graphql(UPDATE_USER_ADDRESS_MUTATION, {
    name: 'updateUser',
  }),
  graphql(USER_ADDRESS_QUERY, {
    name: 'userQuery',
    options: props => ({
      variables: {
          where: {
            id: props.userId,
          }
        },
    }),
  }),
  withRouter,
  withApollo
)(UserAddressEdit)
