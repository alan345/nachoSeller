// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { DELETE_MUTATION_CATEGORIE_PRODUCT } from './GraphQL'
import { CATEGORIES_PRODUCTS_QUERY } from '../list/GraphQL'
import SecondValidationButton from '../../nav/SecondValidationButton'
import { withContext } from '../../withContext'
import type { User } from '../../user/User.type'
import type {CategorieProduct} from '../../categorieProduct/CategorieProduct.type'

export type State = {}

export type Props = {
  me: User,
  deleteCategorieProduct: any,
  categorieProduct: CategorieProduct
}

class DeleteCategorieProduct extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {this.props.me &&
          this.props.me.role === 'ADMIN' && (
            <SecondValidationButton
              buttonText={'Delete'}
              color="secondary"
              variant="contained"
              onClick={() => this.deleteCategorieProduct()}
            />
          )}
      </React.Fragment>
    )
  }

  deleteCategorieProduct = async () => {
    await this.props.deleteCategorieProduct({
      variables: {
        where: {
          id: this.props.categorieProduct.id
        }
      }
    })
  }
}

export default compose(
  graphql(DELETE_MUTATION_CATEGORIE_PRODUCT, {
    name: 'deleteCategorieProduct',
    options: {
      refetchQueries: [
        {
          query: CATEGORIES_PRODUCTS_QUERY
        }
      ]
    }
  }),
  withContext,
  withApollo
)(DeleteCategorieProduct)
