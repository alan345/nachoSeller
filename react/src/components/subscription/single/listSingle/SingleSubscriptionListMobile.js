// @flow
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import ImageTemplate from '../../../nav/ImageTemplate'
import type {Subscription} from '../../Subscription.type'
import '../Style.css'

type State = {}

type Props = {
  subscription: Subscription
}

class SingleSubscriptionListMobile extends React.Component<Props, State> {
  render() {
    return(
      <Link to={'/subscription/' + this.props.subscription.id}>
        <Grid container>
          <Grid item xs={4} sm={4} md={1} lg={1} xl={1} className='marginAuto'>
            <div className='imageSubcriptionMobile'>
            <ImageTemplate
              format={'big'}
              nameFile={this.props.subscription.product.nameFile}
            />
            </div>

          </Grid>
          <Grid item xs={4} sm={4} md={2} lg={1} xl={1} className='marginAuto tal textSize10'>
            {this.props.subscription.product.name}
          </Grid>

          <Grid item xs={4} sm={4} md={2} lg={2} xl={2} className='marginAuto'>
              <Button>
                <Icon>keyboard_arrow_right</Icon>
              </Button>
          </Grid>
        </Grid>
      </Link>    
    )
  }
}

export default  SingleSubscriptionListMobile
