// @flow
import React from 'react'
import Hero from './Hero'
import CategorieProductListHome from '../../categorieProduct/list/CategorieProductListHome'

type State = {

}

type Props = {

}

export default class Home extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <Hero
          alwaysShowTextInPicture={false}
          height={'60vh'}
          showCallToAction={true}
          namePicture={'hero_music.png'}
          title={'All your subscriptions in one place!'}
          subTitle1={'Save up to 40% on your subscriptions. The more you subscribe, the more you save.'}
          subTitle2={'Cancel the ones you don\'t use. Discover new and exciting ones.'}
          />
        <div className='content'>
          <CategorieProductListHome />
        </div>
      </React.Fragment>
    )
  }
}
