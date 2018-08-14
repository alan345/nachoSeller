// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import NotAuth from '../../nav/error/NotAuth'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import ProductPageForm from './ProductPageForm'
import Button from '@material-ui/core/Button'
import type { Product } from '../Product.type'
import {
  PRODUCT_QUERY,
  UPDATE_PRODUCT_MUTATION,
  DELETE_SELLER_MUTATION
} from '../GraphQL'
import { CATEGORIES_PRODUCTS_QUERY } from '../../categorieProduct/list/GraphQL'

type State = {
  open: boolean
}
type Props = {
  deleteProduct: any,
  history: any,
  updateProduct: any => void,
  toggleEditMode: () => void,
  productQuery: {
    product: Product,
    error: any,
    loading: any
  }
}

class ProductPageEdit extends React.Component<Props, State> {
  state = {
    open: false,
    updatedCategories: [],
    categoriesUpdated: false
  }

  render() {
    if (this.props.productQuery.error) {
      return <NotAuth />
    }
    if (this.props.productQuery.loading) {
      return <Loading />
    }
    if (!this.props.productQuery) {
      return <NotFound />
    }

    return (
      <React.Fragment>
        <div className="paperOut">
          <Paper className="paperIn">
            <h2 className="textBig2 fontWeight10">
              {this.props.productQuery.product.name}
            </h2>
            <div>
              <ProductPageForm
                updateProductData={this.updateProductData.bind(this)}
                product={this.props.productQuery.product}
              />
              <Button
                onClick={() =>
                  this.deleteProduct(this.props.productQuery.product.id)
                }
              >
                Delete
              </Button>
            </div>
          </Paper>
        </div>
      </React.Fragment>
    )
  }

  updateProductData(product) {
    this.updateProduct(product)
  }

  updateProduct = async (product: Product) => {
    const {
      id,
      name,
      listPrice,
      nameFile,
      nameFileBanner,
      description,
      shortDescription,
      trialPeriod,
      cancellationTerms,
      loginLink,
      signupLink,
      urlName
    } = product
    try {
      await this.props.updateProduct({
        variables: {
          where: { id: id },
          data: {
            name,
            listPrice,
            nameFile,
            nameFileBanner,
            description,
            shortDescription,
            loginLink,
            signupLink,
            urlName,
            cancellationTerms,
            trialPeriod
          }
        }
      })
    } catch (e) {
      throw e
    }
    this.props.toggleEditMode()
  }

  deleteProduct = async id => {
    await this.props.deleteProduct({
      variables: {
        where: {
          id: id
        }
      }
    })
    this.props.history.push('/')
  }
}

export default compose(
  graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    options: props => ({
      variables: {
        where: {
          id: props.product.id
        }
      }
    })
  }),
  graphql(UPDATE_PRODUCT_MUTATION, {
    name: 'updateProduct',
    options: { refetchQueries: [{ query: CATEGORIES_PRODUCTS_QUERY }] }
  }),
  graphql(DELETE_SELLER_MUTATION, {
    name: 'deleteProduct',
    options: { refetchQueries: [{ query: CATEGORIES_PRODUCTS_QUERY }] }
  }),
  withRouter
)(ProductPageEdit)
