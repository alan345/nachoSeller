// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import { UPDATE_POSITION_SELLER_MUTATION, CATEGORIES_SINGLE_PRODUCTS_QUERY } from './GraphQL'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

type State = {
  orderByHomeInt: number,
  orderByInt: number,
  isFeatured: boolean,
  positionProduct: PositionProduct
}

type Props = {
  positionProduct: {
    orderByHomeInt: number,
    orderByInt: number,
    isFeatured: boolean
  }
}

class EditPostitionProduct extends React.Component<Props, State> {
  state = {
    orderByHomeInt: this.props.positionProduct.orderByHomeInt,
    orderByInt: this.props.positionProduct.orderByInt,
    isFeatured: this.props.positionProduct.isFeatured,
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <FormControl>
            <InputLabel htmlFor='orderByInt'>orderByInt</InputLabel>
            <Input id='orderByInt' onChange={e => this.setState({
                ...this.state.positionProduct,
                orderByInt: e.target.value
              })
            } type='number' value={this.state.orderByInt}/>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor='orderByHomeInt'>orderByHomeInt</InputLabel>
            <Input id='orderByHomeInt' onChange={e => this.setState({
                ...this.state.positionProduct,
                orderByHomeInt: e.target.value
              })
            } type='number' value={this.state.orderByHomeInt}/>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormControlLabel
              label="isFeatured Homepage"
              control={
                <Checkbox
                  checked={this.state.isFeatured}
                  onChange={e => this.setState({
                    isFeatured: e.target.checked
                  })}
                />
              }
            />
          </FormControl>
        </div>
        <Button onClick={this.updatePositionProduct}>Update</Button>
      </React.Fragment>
    )
  }

  updatePositionProduct = async () => {
    await this.props.updatePositionProduct({
        variables: {
          where: {id: this.props.positionProduct.id},
          data: {
            orderByInt: this.state.orderByInt,
            orderByHomeInt: this.state.orderByHomeInt,
            isFeatured: this.state.isFeatured
          },
        }
      })
    }
}

export default compose(
  graphql(UPDATE_POSITION_SELLER_MUTATION, {
    name: 'updatePositionProduct',
    options: props => ({
      refetchQueries: [{
        query: CATEGORIES_SINGLE_PRODUCTS_QUERY,
        variables: { categorieProductId: props.categorieProductId}
      }]
    })
  }),
  withRouter,
  withApollo
)(EditPostitionProduct)
