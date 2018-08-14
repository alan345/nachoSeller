// @flow
import React from 'react'
import UploadFile from '../../nav/UploadFile'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import type { Product } from '../Product.type'

type State = {
  product: Product,
  nameValidation: boolean,
  shortDescriptionValidation: boolean,
  maxName: number,
  maxShortDescription: number,
}
type Props = {
  updateProductData: (Product) => void,
  product: Product
}

class ProductPageForm extends React.Component<Props, State> {
  state = {
    nameValidation: true,
    shortDescriptionValidation: true,
    maxShortDescription: 90,
    maxName: 15,
    product: this.props.product
  }

  onChangeName = (e: any) => {
    this.setState({
      product: {
        ...this.state.product,
        name: e.target.value,
      },
      nameValidation: (e.target.value.length <= this.state.maxName) ? true : false
    })
  }
  onChangeShortDescription = (e: any) => {
    this.setState({
      product: {
        ...this.state.product,
        shortDescription: e.target.value
      },
      shortDescriptionValidation: (e.target.value.length <= this.state.maxShortDescription) ? true : false
    })
  }

  render() {
    return (
      <React.Fragment>
        <Grid container >
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='name'>Name ({this.state.product.name.length}/{this.state.maxName})</InputLabel>
              <Input
                id='name'
                onChange={this.onChangeName}
                error={!this.state.nameValidation}
                type='text'
                value={this.state.product.name}/>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='urlName'>URLname (No spaces)</InputLabel>
              <Input id='urlName' onChange={e => this.setState({
                  product: {
                    ...this.state.product,
                    urlName: e.target.value
                  }
                })} type='text' value={this.state.product.urlName}/>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='signupLink'>signupLink</InputLabel>
              <Input id='signupLink' onChange={e => this.setState({
                  product: {
                    ...this.state.product,
                    signupLink: e.target.value
                  }
                })} type='text' value={this.state.product.signupLink}/>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='loginLink'>loginLink</InputLabel>
              <Input id='loginLink' onChange={e => this.setState({
                  product: {
                    ...this.state.product,
                    loginLink: e.target.value
                  }
                })} type='text' value={this.state.product.loginLink}/>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='cancellationTerms'>cancellationTerms</InputLabel>
              <Input id='cancellationTerms' onChange={e => this.setState({
                  product: {
                    ...this.state.product,
                    cancellationTerms: e.target.value
                  }
                })} type='text' value={this.state.product.cancellationTerms}/>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='listPrice'>ListPrice</InputLabel>
              <Input id='listPrice' onChange={e => this.setState({
                  product: {
                    ...this.state.product,
                    listPrice: e.target.value
                  }
                })} type='number' value={this.state.product.listPrice}/>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='trialPeriod'>TrialPeriod</InputLabel>
              <Input id='trialPeriod' onChange={e => this.setState({
                  product: {
                    ...this.state.product,
                    trialPeriod: e.target.value
                  }
                })} type='number' value={this.state.product.trialPeriod}/>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='shortDescription'>shortDescription ({this.state.product.shortDescription.length}/{this.state.maxShortDescription})</InputLabel>
              <Input
                id='shortDescription'
                multiline
                rowsMax='10'
                error={!this.state.shortDescriptionValidation}
                value={this.state.product.shortDescription}
                onChange={this.onChangeShortDescription}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor='description'>Description</InputLabel>
              <Input
                id='description'
                multiline
                value={this.state.product.description}
                onChange={e => this.setState({
                  product: {
                    ...this.state.product,
                    description: e.target.value
                  }
                })}
              />
            </FormControl>
          </Grid>          
          <Grid item xs={12} sm={6}>
          <Paper className="paperIn">
          {this.state.product.nameFile}
            {'600x600=>ratio: 1'}
              <UploadFile
                isEditMode={true}
                nameFile={this.state.product.nameFile}
                onSelectFile={nameFile => this.setState({
                  product: {
                    ...this.state.product,
                    nameFile: nameFile
                  }
                })}/>
                </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
          {this.state.product.nameFileBanner}
          <Paper className="paperIn">
            {'max width: 336px'}
              <UploadFile
                isEditMode={true}
                nameFile={this.state.product.nameFileBanner}
                onSelectFile={nameFileBanner => this.setState({
                  product: {
                    ...this.state.product,
                    nameFileBanner: nameFileBanner
                  }
                })}/>
              </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => this.props.updateProductData(this.state.product)}>
              Save
            </Button>
          </Grid>
        </Grid>
    </React.Fragment>
  )}
}

export default ProductPageForm
