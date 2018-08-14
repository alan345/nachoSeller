// @flow
import React from 'react'
import { withRouter } from 'react-router'
import TextField from '@material-ui/core/TextField'
import ProductsPageList from '../../../product/list/ProductsPageList'
import './Autocomplete.css'
import type { CategorieProduct } from '../../CategorieProduct.type'

export type State = {
  queryAutocomplete: string,
  elemSelected: CategorieProduct,
  elemSelecteds: CategorieProduct[],
  orderBy: string
}

export type Props = {
  onElemSelected: (elem: CategorieProduct) => void,
  elemSelected: CategorieProduct
}

class Autocomplete extends React.Component<Props, State> {
  state = {
    queryAutocomplete : '',
    elemSelecteds: [],
    elemSelected: {},
    orderBy: 'name_ASC'
  }
  elemClicked(elem) {
    this.setState({
      queryAutocomplete: ''
    })
    this.props.onElemSelected(elem)
  }
  handleDelete(data){
    const elemSelecteds = [...this.state.elemSelecteds]
    const chipToDelete = elemSelecteds.indexOf(data)
    elemSelecteds.splice(chipToDelete, 1)
    this.setState({ elemSelecteds },
    () => this.props.onElemSelected(this.state.elemSelecteds))
  }

  componentDidMount() {
    this.setState({elemSelecteds:this.props.elemSelected})
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.queryAutocomplete}
          onChange={e => this.setState({
            queryAutocomplete: e.target.value,
            elemSelected: {},
          })}
          type='text'
          label='Search Product'
        />
      <br/>
      <ProductsPageList
        elemClicked={this.elemClicked.bind(this)}
        query={this.state.queryAutocomplete}
        orderBy={this.state.orderBy}/>
      </div>
    )
  }
}

export default withRouter(Autocomplete)
