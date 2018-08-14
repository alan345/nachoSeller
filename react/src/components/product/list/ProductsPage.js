// @flow
import React from 'react'
import ProductsPageList from './ProductsPageList'
import { withRouter } from 'react-router'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

type Props = {
  history: any
}

type State = {
  query: string,
  orderBy: string
}

class ProductsPage extends React.Component<Props, State> {
  state = {
    query: '',
    orderBy: 'name_ASC'
  }

  elemClicked(elem) {
    this.props.history.push('/product/' + elem.urlName)
  }

  render() {
    return (
        <div className='paperOut'>
          <Paper className='paperIn'>
        <TextField
          value={this.state.query}
          onChange={e => this.setState({
            query: e.target.value,
          })}
          type='text'
          label='Search Product'
        />
        <br/>
        <br/>

        <ProductsPageList
          showWhenQueryEmpty={true}
          query={this.state.query}
          showTitle={true}
          showMore={true}
          elemClicked={this.elemClicked.bind(this)}
          orderBy={this.state.orderBy}/>
          </Paper>
        </div>
    )
  }
}

export default withRouter(ProductsPage)
