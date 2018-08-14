// @flow
import React from 'react'
import {graphql} from 'react-apollo'
import NotAuth from '../../nav/error/NotAuth'
import ProductCard from '../single/ProductCard'
import Loading from '../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import {PRODUCTS_QUERY} from '../GraphQL'
import type { Product, NodeProduct } from '../Product.type'

type Props = {
  history: any,
  productsQueryConnection: any,
  elemClicked: (Product: Product) => void
}

type State = {
  query: string,
  orderBy: string
}

class ProductsPageList extends React.Component<Props, State> {
  state = {
    query: '',
    orderBy: 'name_ASC'
  }

  render() {
    if (this.props.productsQueryConnection.error) {
      return (<NotAuth/>)
    }
    if (this.props.productsQueryConnection.loading) {
      return (<Loading />)
    }
    const {edges} = this.props.productsQueryConnection.productsConnection
    return (
      <React.Fragment>
        <Grid container>
        {edges && edges.map((product: NodeProduct) => (
          <Grid
            xs={6} sm={4} md={4} lg={3} xl={1}
            key={product.node.id}
            item>
            <ProductCard elemClicked={()=>this.props.elemClicked(product.node)} product={product.node} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>)
  }
}

export default graphql(PRODUCTS_QUERY, {
  name: 'productsQueryConnection', // name of the injected prop: this.props.feedQuery...
  fetchPolicy: 'network-only',
  options: props => ({
    variables: {
      orderBy: props.orderBy,
      where: {
        name_contains: props.query,
      }
    }
  })

})(ProductsPageList)
