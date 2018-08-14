// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { CREATE_PRODUCT_MUTATION } from '../GraphQL'
import { CATEGORIES_PRODUCTS_QUERY } from '../../categorieProduct/list/GraphQL'
import { withRouter } from 'react-router-dom'
import NotAuth from '../../nav/error/NotAuth'
import Paper from '@material-ui/core/Paper'
import ProductPageForm from './ProductPageForm'
import { AUTH_TOKEN } from '../../../constants/constants'
import type { Product } from '../Product.type'
import {withContext} from '../../withContext'

type State = {
  product: Product
}

type Props = {
  createProduct: any,
  openSnackBar: (message: string) => void,
  history: any
}

class ProductPageCreate extends React.Component<Props, State>  {
  state = {
    product: {
      id: '',
      name: '',
      urlName: '',
      listPrice: 0,
      trialPeriod: 0,
      myDiscount: 0,
      myListPrice: 0,
      positionProducts: [],
      subscribed: false,
      nameFile: '',
      nameFileBanner: '',
      description: '',
      shortDescription: '',
      loginLink: '',
      signupLink: '',
      cancellationTerms: '',
    }
  }

  updateProductData(product: Product) {
    this.createProduct(product)
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if(!authToken) {
      return (<NotAuth/>)
    }

    return (
      <React.Fragment>
        <div className='paperOut'>
          <Paper className='paperIn'>

            <div className='flex justify-between items-center'>
              <h1 className='f3 black-80 fw4 lh-solid'>
                { this.state.product.name}
              </h1>
            </div>
            <ProductPageForm
              updateProductData={this.updateProductData.bind(this)}
              product={this.state.product}
            />
          </Paper>
        </div>
      </React.Fragment>
    )
  }

  createProduct = async (product: Product) => {
    const {
      name, listPrice,
      nameFile, description,
      shortDescription, trialPeriod,
      loginLink, signupLink,
      cancellationTerms, urlName,
      nameFileBanner
    } = product
    try {
      await this.props.createProduct({
        variables: {
          data: {
            name,
            urlName,
            trialPeriod,
            listPrice,
            nameFile,
            description,
            shortDescription,
            loginLink,
            signupLink,
            cancellationTerms,
            nameFileBanner
          }
        }
      })
    } catch (e) {
      e.graphQLErrors.some(graphQLError => this.props.openSnackBar(graphQLError.message))
      throw e
    }
    this.props.openSnackBar('Product Created')
    this.props.history.push('/')
  }
}

export default compose(
  graphql(CREATE_PRODUCT_MUTATION, {
    name: 'createProduct',
    options: {
      refetchQueries: [{
        query: CATEGORIES_PRODUCTS_QUERY
      }]
    }
  }),
  withRouter,
  withApollo,
  withContext
)(ProductPageCreate)
