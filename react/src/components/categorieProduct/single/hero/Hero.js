// @flow
import React from 'react'
import './Hero.css'
import { URL_SERVER_MEDIA } from '../../../../constants/constants'
import Button from '@material-ui/core/Button'
import {withContext} from '../../../withContext'

type State = {}

type Props = {
  title: string,
  nameFile: string,
  nameFileMobile: string,
  subTitle1: string,
  subTitle2: string,
  alwaysShowTextInPicture: boolean,
  isMobile: boolean,
  showCallToAction: boolean
}

class Hero extends React.Component<Props, State> {
  render() {
    const divStyle = {
      background: 'url("' + URL_SERVER_MEDIA + '/' + this.props.nameFile + '") no-repeat',
    }
    const divStyleMobile = {
      background: 'url("' + URL_SERVER_MEDIA + '/' + this.props.nameFileMobile + '") no-repeat',
    }

    return (
      <React.Fragment>
        <div className='backgroundHero' style={this.props.isMobile ? divStyleMobile : divStyle}>
          <div className="contentHeroCateg">
            <div>
              <h1 className='titleHeroCateg margin0 textSize13'>
              <span>{this.props.title}</span>
              </h1>
              <div className={this.props.alwaysShowTextInPicture ? '' : 'hideMobile'}>
                <h2 className='subtitleHeroCateg fontWeight14 textSize11'>
                  <span>{this.props.subTitle1}</span>
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
      </React.Fragment>
    )
  }
}

export default withContext(Hero)
