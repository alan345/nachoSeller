// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { CREATE_CATEGORY_SELLER_MUTATION } from './GraphQL'
import { CATEGORIES_PRODUCTS_QUERY } from '../list/GraphQL'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import {withContext} from '../../withContext'
import type {CategorieProduct} from '../CategorieProduct.type'

type State = {
  categorieProduct: CategorieProduct
}

type Props = {
  createCategorieProduct: any,
  openSnackBar: (message: string) => void
}

class CategorieProductCreate extends React.Component<Props, State> {
  state = {
    categorieProduct: {
      name: '',
      urlName: '',
      nameFile: '',
      nameFileMobile: '',
      orderByInt: 50,
    }
  }

  render() {
    return (
      <Paper className='paperIn'>
        <FormControl>
          <InputLabel htmlFor='name'>Name</InputLabel>
          <Input id='name' onChange={e => this.setState({
              categorieProduct: {
                ...this.state.categorieProduct,
                name :e.target.value
              }
            })
          } type='text' value={this.state.categorieProduct.name}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='urlName'>URLname (No spaces)</InputLabel>
          <Input id='urlName' onChange={e => this.setState({
              categorieProduct: {
                ...this.state.categorieProduct,
                urlName :e.target.value
              }
            })
          } type='text' value={this.state.categorieProduct.urlName}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='orderByInt'>orderByInt</InputLabel>
          <Input id='orderByInt' onChange={e => this.setState({
              categorieProduct: {
                ...this.state.categorieProduct,
                orderByInt :e.target.value
              }
            })
          } type='number' value={this.state.categorieProduct.orderByInt}/>
        </FormControl>
        <br />
        <br />
        <Button onClick={this.createCategorieProduct}>Create Category</Button>
      </Paper>
    )
  }

  createCategorieProduct = async () => {
    const { name, nameFile, urlName, nameFileMobile, orderByInt } = this.state.categorieProduct
    try {
      await this.props.createCategorieProduct({
        variables: {
          data: {
            name,
            nameFile,
            nameFileMobile,
            urlName,
            orderByInt
          }
        }
      })
    } catch (e) {
      this.props.openSnackBar(e.graphQLErrors[0].message)
    }
  }
}

export default compose(
  graphql(CREATE_CATEGORY_SELLER_MUTATION, {
    name: 'createCategorieProduct',
    options: {
      refetchQueries: [{
        query: CATEGORIES_PRODUCTS_QUERY,
      }]
    }
  }),
  withRouter,
  withContext,
  withApollo
)(CategorieProductCreate)
