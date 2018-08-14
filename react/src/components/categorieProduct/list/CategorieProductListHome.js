// @flow
import React from 'react'
import ProductCard from '../../product/single/ProductCard'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { graphql, compose, withApollo } from 'react-apollo'
import NotAuth from '../../nav/error/NotAuth'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router'
import CategorieProductCreate from '../single/CategorieProductCreate'
import { CATEGORIES_PRODUCTS_QUERY } from './GraphQL'
import DeleteCategorieProduct from '../single/DeleteCategorieProduct'
import {withContext} from '../../withContext'
import { Link } from 'react-router-dom'

export type State = {
  showAddCategory: boolean
}

export type Props = {
  categorieProducts: any,
  deleteCategorieProduct: any,
  me: any,
  isMobile: boolean
}

class CategorieProductListHome extends React.Component<Props, State> {
  state: State = {
    showAddCategory: false
  }

  render() {
    if (this.props.categorieProducts.error) { return ( <NotAuth/> ) }
    if (this.props.categorieProducts.loading) { return (<Loading />) }
    if(!this.props.categorieProducts) { return ( <NotFound/> ) }

    return (
      <div id='products'>
        <div>
          {this.props.categorieProducts.categorieProducts.map((categorie, j) => (
            <div key={categorie.id}>
              <Link to={'/category/' + categorie.urlName}>
                <Button size="large" classes={{'root': 'tal'}}>
                  <div className='nameCategory textSize11'>{categorie.name}</div>
                  <div className='textSize9 blue seeAllClass noWrap'>See all</div>
                  <div className='arrowRight'><Icon>keyboard_arrow_right</Icon></div>
                </Button>
              </Link>
              {this.state.showAddCategory && (
                <DeleteCategorieProduct categorieProduct={categorie} />
              )}
              <br />
              <br />
              <div className='tac'>
                <Grid container spacing={16}>
                <React.Fragment>
                  {categorie.positionProducts && categorie.positionProducts.map((positionProduct, i) => {
                    if(!(this.props.isMobile && i>=2)) {
                      return (
                        <Grid
                          xs={12} sm={6} md={3} lg={3} xl={3}
                          key={positionProduct.id + positionProduct.product.id}
                          item>
                          <Link to={'/product/' + positionProduct.product.urlName}>
                            <ProductCard elemClicked={()=>{}} product={positionProduct.product} />
                          </Link>
                        </Grid>
                      )
                    }
                    return true
                  })}
                  </React.Fragment>
                </Grid>
              </div>
              {(this.props.categorieProducts.categorieProducts.length !== j+1) && (
                <div className='divider'>
                  <Divider />
                </div>
              )}
          </div>
          ))}
          </div>
          {(this.props.me && this.props.me.role) === 'ADMIN' && (
            <React.Fragment>
              <br />
              <div className='cursor' onClick={()=> this.setState({showAddCategory:!this.state.showAddCategory})}>
                + Category
              </div>
              {this.state.showAddCategory && (
                <CategorieProductCreate />
              )}
            </React.Fragment>
          )}
      </div>
    )
  }
}

export default compose(
  graphql(CATEGORIES_PRODUCTS_QUERY, {
    name: 'categorieProducts',
    fetchPolicy: 'network-only',
    options: {
      variables: {
        v: Math.random()
      }
    }

  }),
  withRouter,
  withContext,
  withApollo
)(CategorieProductListHome)
