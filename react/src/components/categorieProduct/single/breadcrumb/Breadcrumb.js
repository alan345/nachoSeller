// @flow
import React from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
import type { CategorieProduct } from '../../CategorieProduct.type'

type State = {
}

type Props = {
  categorieSingleProducts: CategorieProduct
}

class Breadcrumb extends React.Component<Props, State> {
  render() {
    return (
      <ul className="breadcrumb">
        <Link to='/'>
          <li className='breadcrumbLi'>
            <Button>
              NachoNacho
            </Button>
          </li>
        </Link>
        <li className='breadcrumbLi arrowRightCateg'><Icon>keyboard_arrow_right</Icon></li>
        <li className='breadcrumbLi breadcrumbCategName'>
          {this.props.categorieSingleProducts.name}
        </li>
      </ul>
    )
  }
}

export default Breadcrumb
