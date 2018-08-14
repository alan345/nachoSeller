// @flow
import React from 'react'
import ImageTemplate from './ImageTemplate'
import { AUTH_TOKEN, URL_SERVER_MEDIA } from '../../constants/constants'

type State = {
  imageURL: string,
  isEditMode: boolean
}

type Props = {

}

class UploadFile extends React.Component<Props, State> {
  state = {
    isEditMode: true,
    imageURL: '',
  }
  constructor(props) {
    super(props)
    this.handleUploadImage = this.handleUploadImage.bind(this)
  }
  UNSAFE_componentWillReceiveProps(newProps){
    this.setState({ isEditMode: newProps.isEditMode })
  }

  UNSAFE_componentWillMount(){
    this.setState({ isEditMode: this.props.isEditMode })
    if(this.props.nameFile) {
      this.setState({ imageURL: this.props.nameFile })
    }
  }

  handleUploadImage(ev) {
    ev.preventDefault()
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const data = new FormData()
    data.append('file', this.uploadInput.files[0])

    fetch(URL_SERVER_MEDIA + '/upload', {
      method: 'POST',
      body: data,
      headers: new Headers({
        'Authorization': 'Bearer '+ authToken
      }),
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: body.file })
        this.props.onSelectFile(body.file)
      })
    })
  }

  render() {
    return (
        <div>
          {this.state.isEditMode && (
            <form onSubmit={this.handleUploadImage}>
              <input
                className='f6 pv2'
                ref={(ref) => { this.uploadInput = ref }}
                onChange={this.handleUploadImage}
                type='file' />

            </form>
          )}
        <br/>
        {this.state.imageURL && (
          <ImageTemplate
            nameFile={this.state.imageURL}
          />
        )}
    </div>
    )
  }
}

export default UploadFile
