// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { UPDATE_CATEGORY_SELLER_MUTATION, CATEGORIES_SINGLE_PRODUCTS_QUERY } from './GraphQL'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Autocomplete from './autocomplete/Autocomplete'
import type {CategorieProduct} from '../CategorieProduct.type'

type State = {
}

type Props = {
  updateCategorieProduct: any,
  categorieProduct: CategorieProduct
}

class CategorieProductAddPositionProduct extends React.Component<Props, State> {
  onElemSelected (product) {
    this.updateCategorieProduct(product)
  }

  render() {
    return (
      <Paper className='paperIn'>
        <h2>Add Product to Category</h2>
        <Autocomplete  onElemSelected={this.onElemSelected.bind(this)}/>
      </Paper>
    )
  }

  updateCategorieProduct = async (product) => {
    await this.props.updateCategorieProduct({
      variables: {
        where: {id: this.props.categorieProduct.id},
        data: {
          name: this.props.categorieProduct.name,
          nameFile: this.props.categorieProduct.nameFile,
          positionProducts: {
            create: {
              product: {connect: {id: product.id}},
              orderByInt: 50,
              orderByHomeInt: 50,
              isFeatured: true
            }
          }
        }
      }
    })
  }
}

export default compose(
  graphql(UPDATE_CATEGORY_SELLER_MUTATION, {
    name: 'updateCategorieProduct',
    options: props => ({
      refetchQueries: [{
        query: CATEGORIES_SINGLE_PRODUCTS_QUERY,
        variables: { urlName: props.categorieProduct.urlName}
      }]
    })
  }),
  withRouter,
  withApollo
)(CategorieProductAddPositionProduct)
