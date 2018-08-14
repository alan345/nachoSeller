// @flow
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './ImageTemplate.css'
import { URL_SERVER_MEDIA } from '../../constants/constants'

export default class ImageTemplate extends React.Component<Props, State> {
  render() {
    var urlFile = URL_SERVER_MEDIA + '/public/no-files.png'
    if(this.props.format === 'avatar') {
      urlFile = URL_SERVER_MEDIA + '/public/avatar.jpg'
    }
    if(this.props.nameFile) {
      urlFile = URL_SERVER_MEDIA + '/' + this.props.nameFile
    }
    return (
      <div>
        {this.props.format === 'avatar' && (
          <div>
            <Avatar src={urlFile}/>
          </div>
        )}
        {this.props.format === 'big' && (
          <div>
            {this.props.nameFile && (
              <img src={urlFile} alt='img' />
            )}
          </div>
        )}
        {!this.props.format && (
          <div className='crop'>
            {this.props.nameFile && (
              <img src={urlFile} alt='img' />
            )}
          </div>
        )}
      </div>
    )
  }
}
