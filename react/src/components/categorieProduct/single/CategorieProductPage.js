// @flow
import React from 'react'
import ProductCard from '../../product/single/ProductCard'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import { CATEGORIES_SINGLE_PRODUCTS_QUERY } from './GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router'
import Hero from './hero/Hero'
import CategorieProductEdit from './CategorieProductEdit'
import CategorieProductAddPositionProduct from './CategorieProductAddPositionProduct'
import RemoveProductFromCategory from './RemoveProductFromCategory'
import EditPostitionProduct from './EditPostitionProduct'
import {AppContext} from '../../AppContext'
import Breadcrumb from './breadcrumb/Breadcrumb'
import './Style.css'

type State = {
  isEditMode: boolean,
}

type Props = {
  categorieSingleProducts: any
}

class CategorieProductPage extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    if (this.props.categorieSingleProducts.error) { return ( <NotAuth/> ) }
    if (this.props.categorieSingleProducts.loading) { return (<Loading />) }
    if(!this.props.categorieSingleProducts) { return ( <NotFound/> ) }
    const {categorieSingleProducts} = this.props.categorieSingleProducts

    return (
      <React.Fragment>
        <Hero
          height={'40vh'}
          alwaysShowTextInPicture={true}
          nameFile={categorieSingleProducts.nameFile}
          nameFileMobile={categorieSingleProducts.nameFileMobile}
          title={categorieSingleProducts.name}
          subTitle1={categorieSingleProducts.description}
          subTitle2={''} />
        <div className='content'>
          <Breadcrumb categorieSingleProducts={categorieSingleProducts}/>
          <br />
            <div className='tac'>
                <Grid container spacing={16}>
                  {categorieSingleProducts.positionProducts && categorieSingleProducts.positionProducts.map((positionProduct) => (
                    <Grid
                      xs={12} sm={6} md={3} lg={3} xl={3}
                      key={positionProduct.id}
                      item>
                      <Link to={'/product/' + positionProduct.product.urlName}>
                        <ProductCard elemClicked={()=>{}} product={positionProduct.product} />
                      </Link>
                      <br />
                      {this.state.isEditMode && (
                        <React.Fragment>
                          <RemoveProductFromCategory
                            categorieProduct={categorieSingleProducts}
                            positionProductId={positionProduct.id}
                            />
                          <EditPostitionProduct
                            categorieProductId={categorieSingleProducts.id}
                            positionProduct={positionProduct}
                            />
                        </React.Fragment>
                      )}
                    </Grid>
                  ))}
              </Grid>
            </div>
        </div>
        <AppContext.Consumer>
          {context => (
            <React.Fragment>
              {(context.me && context.me.role) === 'ADMIN' && (
                <p className='cursor' onClick={()=> this.setState({isEditMode: !this.state.isEditMode})}>Edit this category</p>
              )}
            </React.Fragment>
          )}
        </AppContext.Consumer>
        {this.state.isEditMode && (
          <React.Fragment>
            <CategorieProductEdit categorieSingleProducts={categorieSingleProducts}/>
            <CategorieProductAddPositionProduct categorieProduct={categorieSingleProducts}/>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(CATEGORIES_SINGLE_PRODUCTS_QUERY, {
    name: 'categorieSingleProducts',
    fetchPolicy: 'network-only',
    options: props => ({
      variables: {
        urlName: props.match.params.urlName
      }
    })
  }),
  withRouter,
  withApollo
)(CategorieProductPage)
