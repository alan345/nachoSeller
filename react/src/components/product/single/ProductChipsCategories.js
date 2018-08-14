// @flow
import React from 'react'
import Button from '@material-ui/core/Button'
import type { Product } from '../Product.type'
import { Link } from 'react-router-dom'

type State = {}

type Props = {
  product: Product
}

class ProductChipsCategories extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {this.props.product.positionProducts.map(positionProduct => (
          <Link
            key={positionProduct.categorieProduct.id}
            to={'/category/' + positionProduct.categorieProduct.urlName}
          >
            <Button variant="extendedFab" color="default">
              {positionProduct.categorieProduct.name}
            </Button>
          </Link>
        ))}
      </React.Fragment>
    )
  }
}

export default ProductChipsCategories
