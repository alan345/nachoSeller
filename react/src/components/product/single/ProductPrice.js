// @flow
import React from 'react'
import './Style.css'
import Badge from '@material-ui/core/Badge'
import type { Product } from '../Product.type'

type State = {}

type Props = {
  product: Product
}

class ProductPrice extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {!this.props.product.subscribed && (
          <div>
            <span className='pricingCategText lineThrough black textSize11'>
              ${this.props.product.listPrice.toFixed(2)}
            </span>
            <span className='pricingCategText black textSize11'>
              ${this.props.product.myListPrice.toFixed(2)}
            </span>            
            <Badge
              classes={{
                badge: 'badgeOverride',
              }}
              badgeContent={'-' + this.props.product.myDiscount.toFixed(1) + '%'} color="secondary">
              <span className='textTransparencyWhiteMax'>{'____'}</span>
            </Badge>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default ProductPrice
