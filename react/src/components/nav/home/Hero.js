// @flow
import React from 'react'
import './Hero.css'
import { URL_SERVER_MEDIA } from '../../../constants/constants'
import Button from '@material-ui/core/Button'
import {withContext} from '../../withContext'

type State = {}

type Props = {
  title: string,
  namePicture: string,
  subTitle1: string,
  subTitle2: string,
  alwaysShowTextInPicture: boolean,
  isMobile: boolean,
  showCallToAction: boolean
}

class Hero extends React.Component<Props, State> {
  render() {
    const divStyle = {
      background: 'url("' + URL_SERVER_MEDIA + '/' + this.props.namePicture + '") no-repeat',
    }
    const divStyleMobile = {
      background: 'url("' + URL_SERVER_MEDIA + '/' + this.props.namePicture + '") no-repeat',
    }

    return (
      <React.Fragment>
        <div className='backgroundHero' style={this.props.isMobile ? divStyleMobile : divStyle}>
          <div className="contentHero hero-section-text">
            <div>
              <h1 className='titleHero margin0 textSize13'>{this.props.title}</h1>
              <div className={this.props.alwaysShowTextInPicture ? '' : 'hideMobile'}>
                <h2 className='subtitleHero fontWeight14 textSize11'>
                  {this.props.subTitle1}
                  <p>{this.props.subTitle2}</p>
                </h2>
              
              </div>
              {this.props.showCallToAction && (
                <div className='callToAction'>
                  <a href='/#products'>
                    <Button color="primary" size="large" variant="contained">Start Shopping</Button>
                  </a>
                </div>
                
              )}
                
            </div>
          </div>
        </div>
        <div className={this.props.alwaysShowTextInPicture ? 'hideDesktop hideMobile' : 'hideDesktop'}>
          <div className="margin5">
            <h2 className='fontWeight1 textSize10 grey7'>
              {this.props.subTitle1}
              <p>{this.props.subTitle2}</p>
            </h2>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withContext(Hero)
