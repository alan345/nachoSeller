// @flow
import React from 'react'
import UploadFile from '../../../nav/UploadFile'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { UPDATE_USER_MUTATION } from '../../GraphQL'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import type { User } from '../../User.type'

type State = {
  user: User,
}

type Props = {
  user: User,
  updateUser: any,
  changeEditMode: () => void
}


class UserProfileForm extends React.Component<Props, State> {
  state = {
    user: this.props.user,
  }

  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor='firstName'>firstName</InputLabel>
            <Input id='firstName' onChange={e => this.setState({
                user : {
                  ...this.state.user,
                  firstName: e.target.value
                }
              }
            )} type='text' value={this.state.user.firstName}/>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor='lastName'>lastName</InputLabel>
            <Input id='lastName' onChange={e => this.setState({
                user: {
                ...this.state.user,
                lastName: e.target.value}
              })} type='text' value={this.state.user.lastName}/>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input id='email' onChange={e => this.setState({
                user: {
                ...this.state.user,
                email: e.target.value }
              })} type='text' value={this.state.user.email}/>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor='role'>Role</InputLabel>
            <Select inputProps={{
                user: {
                name: 'role',
                id: 'role' }
              }} onChange={e => this.setState({
                user: {
                ...this.state.user,
                role: e.target.value
              }
              })} value={this.state.user.role}>
              <MenuItem value='CUSTOMER'>CUSTOMER</MenuItem>
              <MenuItem value='ADMIN'>ADMIN</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor='gender'>Gender</InputLabel>
            <Select inputProps={{
                name: 'gender',
                id: 'gender'
              }} onChange={e => this.setState({
                user: {
                ...this.state.user,
                gender: e.target.value
              }
              })} value={this.state.user.gender}>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <InputLabel htmlFor='language'>language</InputLabel>
            <Select inputProps={{
                name: 'language',
                id: 'language'
              }} onChange={e => this.setState({
                user: {
                ...this.state.user,
                language: e.target.value
              }
              })} value={this.state.user.language}>
              <MenuItem value='en'>en</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <br />
          <br />
          <strong>Profile photo</strong>
          <UploadFile
            isEditMode={true}
            nameFile={this.state.user.nameFile}
            onSelectFile={nameFile => this.setState({
              user: {
              ...this.state.user,
              nameFile: nameFile
            }
            })}/>
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
        </React.Fragment>
      )
  }

  updateUser = async () => {
    let id = this.state.user.id
    const {
      firstName, lastName, email, role, nameFile, gender, billingAdress, billingCity,
      billingZip, billingState, billingCountry, birthday, language
    } = this.state.user

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
  graphql(UPDATE_USER_MUTATION, {
    name: 'updateUser',
  }),
  withRouter,
  withApollo
)(UserProfileForm)
