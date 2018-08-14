// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import {
  UPDATE_CATEGORY_SELLER_MUTATION,
  CATEGORIES_SINGLE_PRODUCTS_QUERY
} from './GraphQL'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import type { CategorieProduct } from '../CategorieProduct.type'
import UploadFile from '../../nav/UploadFile';

type State = {
  categorieSingleProducts: CategorieProduct
}

type Props = {
  categorieSingleProducts: CategorieProduct,
  updateCategorieProduct: any
}

class CategorieProductEdit extends React.Component<Props, State> {
  state = {
    categorieSingleProducts: this.props.categorieSingleProducts
  }

  render() {
    return (
      <Paper className="paperIn">
        <h2>Edit Category</h2>
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={this.state.categorieSingleProducts.name}
            onChange={e =>
              this.setState({
                categorieSingleProducts: {
                  ...this.state.categorieSingleProducts,
                  name: e.target.value
                }
              })
            }
            type="text"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="description">description</InputLabel>
          <Input
            id="description"
            value={this.state.categorieSingleProducts.description}
            onChange={e =>
              this.setState({
                categorieSingleProducts: {
                  ...this.state.categorieSingleProducts,
                  description: e.target.value
                }
              })
            }
            type="text"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="urlName">urlName</InputLabel>
          <Input
            id="urlName"
            value={this.state.categorieSingleProducts.urlName}
            onChange={e =>
              this.setState({
                categorieSingleProducts: {
                  ...this.state.categorieSingleProducts,
                  urlName: e.target.value
                }
              })
            }
            type="text"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="orderByInt">orderByInt</InputLabel>
          <Input
            id="orderByInt"
            value={this.state.categorieSingleProducts.orderByInt}
            onChange={e =>
              this.setState({
                categorieSingleProducts: {
                  ...this.state.categorieSingleProducts,
                  orderByInt: e.target.value
                }
              })
            }
            type="number"
          />
        </FormControl>
        <br />
        <br />
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Paper className="paperIn">
              <h4>Image desktop {'1280x500=>ratio: 2.56)'}</h4>
              <UploadFile
                isEditMode={true}
                nameFile={this.state.categorieSingleProducts.nameFile}
                onSelectFile={nameFile =>
                  this.setState({
                    categorieSingleProducts: {
                      ...this.state.categorieSingleProducts,
                      nameFile: nameFile
                    }
                  })
                }
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Paper className="paperIn">
              <h4>Image mobile {'(720x300=>ratio: 2.25)'}</h4>
              <UploadFile
                isEditMode={true}
                nameFile={this.state.categorieSingleProducts.nameFileMobile}
                onSelectFile={nameFileMobile =>
                  this.setState({
                    categorieSingleProducts: {
                      ...this.state.categorieSingleProducts,
                      nameFileMobile: nameFileMobile
                    }
                  })
                }
              />
            </Paper>
          </Grid>
        </Grid>
        <Button onClick={this.updateCategorieProduct}>Update Category</Button>
      </Paper>
    )
  }

  updateCategorieProduct = async () => {
    const {
      name,
      description,
      nameFile,
      urlName,
      nameFileMobile,
      orderByInt
    } = this.state.categorieSingleProducts
    await this.props.updateCategorieProduct({
      variables: {
        where: { id: this.state.categorieSingleProducts.id },
        data: {
          name,
          description,
          nameFile,
          orderByInt,
          nameFileMobile,
          urlName
        }
      }
    })
  }
}

export default compose(
  graphql(UPDATE_CATEGORY_SELLER_MUTATION, {
    name: 'updateCategorieProduct',
    options: props => ({
      refetchQueries: [
        {
          query: CATEGORIES_SINGLE_PRODUCTS_QUERY,
          variables: { urlName: props.categorieSingleProducts.urlName }
        }
      ]
    })
  }),
  withRouter,
  withApollo
)(CategorieProductEdit)
