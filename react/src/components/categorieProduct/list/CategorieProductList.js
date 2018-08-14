// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import { CATEGORIES_PRODUCTS_QUERY_LIGHT } from './GraphQL'
import NotAuth from '../../nav/error/NotAuth'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import Paper from '@material-ui/core/Paper'
import type {CategorieProduct} from '../CategorieProduct.type'

type State = {
  idCars: string[]
}

type Props = {
  categorieProducts: any,
  elemClicked: (categorie: CategorieProduct) => void
}

class CategorieProductList extends React.Component<Props, State> {
  onElemSelected(elems){
    let idCars = elems.map(el => {return {id: el.id}})
    this.setState({idCars})
  }

  render() {
    if (this.props.categorieProducts.error) { return ( <NotAuth/> ) }
    if (this.props.categorieProducts.loading) { return (<Loading />) }
    if(!this.props.categorieProducts) { return ( <NotFound/> ) }

    return (
      <React.Fragment>
        {this.props.categorieProducts.categorieProducts.map(categorie => (
          <Paper key={categorie.id}>
            <div className='cursor paperIn' onClick={() => this.props.elemClicked(categorie)}>{categorie.name}</div>
          </Paper>
        ))}
      </React.Fragment>
    )
  }
}

export default graphql(CATEGORIES_PRODUCTS_QUERY_LIGHT, {
  name: 'categorieProducts',
  fetchPolicy: 'network-only',
  options: props => ({
    variables: {
      where: {
        name_contains: props.query
      }
    }
  })
})(CategorieProductList)
