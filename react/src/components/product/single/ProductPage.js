// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter, Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import NotAuth from '../../nav/error/NotAuth'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import ImageTemplate from '../../nav/ImageTemplate'
import ProductPageEdit from './ProductPageEdit'
import ProductChipsCategories from './ProductChipsCategories'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ProductPrice from './ProductPrice'
import { PRODUCT_QUERY, UPDATE_PRODUCT_MUTATION } from '../GraphQL'
import { CATEGORIES_PRODUCTS_QUERY } from '../../categorieProduct/list/GraphQL'
import { withContext } from '../../withContext'

type State = {
  open: boolean,
  isEditMode: boolean,
  updatedCategories: [],
  categoriesUpdated: boolean
}

type Props = {
  productQuery: any,
  updateProduct: any,
  me: any
}

class ProductPage extends React.Component<Props, State> {
  state = {
    open: false,
    isEditMode: false,
    updatedCategories: [],
    categoriesUpdated: false
  }

  updateProductData(product) {
    this.props.productQuery.product = product
    this.forceUpdate()
  }

  onElemSelected(elems) {
    this.setState({
      categoriesUpdated: true,
      updatedCategories: elems
    })
  }

  reduceCategories(elems) {
    return elems.map(el => {
      return { id: el.id }
    })
  }

  toggleEditMode = () => {
    this.setState({ isEditMode: !this.state.isEditMode })
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
            <Grid container>
              <Grid item xs={12}>
                <h1 className="textSize14 fontWeight12 margin5">
                  {this.props.productQuery.product.name}
                  {(this.props.me && this.props.me.role) === 'ADMIN' && (
                    <React.Fragment>
                      {' '}<Icon onClick={this.toggleEditMode}>border_color</Icon>
                    </React.Fragment>
                  )}
                </h1>
              </Grid>
              <Grid item xs={12} sm={4}>
                {this.props.productQuery.product.nameFile && (
                  <div className="imageProduct">
                    <ImageTemplate
                      format={'big'}
                      nameFile={this.props.productQuery.product.nameFile}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={7}>
                <div>
                  <ProductChipsCategories
                    product={this.props.productQuery.product}
                  />
                </div>
                <br />
                {!this.state.isEditMode && (
                  <React.Fragment>
                    <ProductPrice product={this.props.productQuery.product} />
                    <br />
                    <Divider className='dividerProductTop'/>
                    {this.props.productQuery.product.trialPeriod!==0 && (
                      <p>
                        {this.props.productQuery.product.trialPeriod} days free
                        trial
                      </p>
                    )}
                    <p>{this.props.productQuery.product.cancellationTerms}</p>
                    <Divider className='dividerProductTop'/>

                    <br />
                    <br />
                    {!this.props.productQuery.product.subscribed ? (
                      <Link
                        to={
                          '/order/checkout/' +
                          this.props.productQuery.product.id
                        }
                      >
                        <Button variant="contained" color="primary">
                          Subscribe
                        </Button>
                      </Link>
                    ) : (
                      <Link to={'/user/myAccount'}>
                        <Button variant="contained">
                          Subscribed. View in My Account
                        </Button>
                      </Link>
                    )}
                    <br />
                    <br />
                    <br />
                    <Divider className='dividerProductTop' />
                  </React.Fragment>
                )}
                {this.state.isEditMode && (
                  <ProductPageEdit
                    product={this.props.productQuery.product}
                    toggleEditMode={this.toggleEditMode.bind(this)}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={7}>
                <h3>{this.props.productQuery.product.shortDescription}</h3>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: this.props.productQuery.product.description
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <Divider className="verticalLine" />
              </Grid>
              <Grid item xs={12} sm={4}>
                {this.props.productQuery.product.nameFileBanner && (
                  <div className="imageProductBanner tac">
                    <ImageTemplate
                      format={'big'}
                      nameFile={this.props.productQuery.product.nameFileBanner}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>
        </div>
      </React.Fragment>
    )
  }

  updateProduct = async id => {
    let categoriesConnect
    if (this.state.categoriesUpdated) {
      let connects = this.reduceCategories(this.state.updatedCategories)
      let disconnects = this.props.productQuery.product.categories
        .filter(categorie => {
          return !connects.some(
            categorieSome => categorieSome.id === categorie.id
          )
        })
        .map(categorie => {
          return { id: categorie.id }
        })
      categoriesConnect = {
        disconnect: disconnects,
        connect: connects
      }
    }

    const {
      name,
      listPrice,
      nameFile,
      description,
      shortDescription,
      trialPeriod,
      loginLink,
      signupLink,
      cancellationTerms,
      urlName
    } = this.props.productQuery.product
    try {
      await this.props.updateProduct({
        variables: {
          where: { id: id },
          data: {
            name,
            urlName,
            listPrice,
            nameFile,
            description,
            shortDescription,
            categories: categoriesConnect,
            cancellationTerms,
            trialPeriod,
            loginLink,
            signupLink
          }
        }
      })
    } catch (e) {
      throw e
    }
    this.setState({ isEditMode: false })
    // this.props.client.resetStore()
  }
}

export default compose(
  graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    options: props => ({
      variables: {
        where: {
          urlName: props.match.params.urlName
        }
      }
    })
  }),
  graphql(UPDATE_PRODUCT_MUTATION, {
    name: 'updateProduct',
    options: { refetchQueries: [{ query: CATEGORIES_PRODUCTS_QUERY }] }
  }),
  withRouter,
  withContext,
  withApollo
)(ProductPage)
