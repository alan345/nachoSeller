// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { UPDATE_CATEGORY_SELLER_MUTATION, CATEGORIES_SINGLE_PRODUCTS_QUERY } from './GraphQL'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'

type State = {
}

type Props = {
}

class RemoveProductFromCategory extends React.Component<Props, State> {
  render() {
    return (
      <Button onClick={this.removeUserFromCategory}>Remove Product from category</Button>
    )
  }

  removeUserFromCategory = async () => {
    await this.props.updateCategorieProduct({
      variables: {
        where: {id: this.props.categorieProduct.id},
        data: {
          name: this.props.categorieProduct.name,
          nameFile: this.props.categorieProduct.nameFile,
          urlName: this.props.categorieProduct.urlName,
          positionProducts: {
            delete: {
              id: this.props.positionProductId
            }
          }
        },
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
        variables: { urlName: props.categorieProduct.urlName }
      }]
    })
  }),
  withRouter,
  withApollo
)(RemoveProductFromCategory)
