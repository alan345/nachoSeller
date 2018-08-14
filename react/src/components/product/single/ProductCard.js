// @flow
import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './Style.css'
import { URL_SERVER_MEDIA } from '../../../constants/constants'
import type { Product } from '../Product.type'

type State = {}

type Props = {
  product: Product,
  elemClicked: (elem: any) => void
}

class ProductCard extends React.Component<Props, State> {
  render() {
    return (
      <Badge
        className="badgeContent"
        classes={{
          badge: this.props.product.subscribed ? 'hide' : 'badgeOverride'
        }}
        badgeContent={'-' + this.props.product.myDiscount.toFixed(1) + '%'}
        color="secondary"
      >
        <Card
          onClick={() => this.props.elemClicked(this.props.product)}
          className="card cursor"
        >
          <Grid container spacing={0}>
            <Grid item xs={5} sm={12}>
              <div className="contentCard">
                <CardMedia
                  className="media"
                  image={URL_SERVER_MEDIA + '/' + this.props.product.nameFile}
                />
              </div>
            </Grid>
            <Grid item xs={7} sm={12}>
              <div className="contentText">
                <h3 className="fontWeight12 textSize11 margin1 tac black">
                  {this.props.product.name}
                </h3>
                <div className="shortDescriptionDiv tac">
                  <p className="textSize9 margin1 grey9">
                    {this.props.product.shortDescription}
                  </p>
                </div>
                {!this.props.product.subscribed && (
                  <div className="prices tac">
                    <span className="lineThrough black margin0 tac">
                      <span>${this.props.product.listPrice.toFixed(2)}</span>
                    </span>
                    <span className="red margin1 tac">
                      <span>
                        ${this.props.product.myListPrice.toFixed(2)}
                        /mo.
                      </span>
                    </span>
                  </div>
                )}
                {this.props.product.subscribed && (
                  <div className="tac width100per">
                    <Button className="margin0" size="small" color="primary">
                      Subscribed
                    </Button>
                  </div>
                )}
                {!this.props.product.subscribed && (
                  <div className="tac width100per hideMobile">
                    <Button className="margin0" size="small" color="primary">
                      See Details
                    </Button>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Card>
      </Badge>
    )
  }
}

export default ProductCard
