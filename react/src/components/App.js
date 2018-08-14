// @flow
import React from 'react'
import SubApp from './SubApp'
import { ME_QUERY_ROLE } from './GraphQL'
import {AppContext} from './AppContext'
import { graphql, compose } from 'react-apollo'
import SnackBarCustom from './nav/SnackBarCustom'

type Props = {
  me: any
}

type State = {
  isSideBarOpen: boolean
}

class App extends React.Component<Props, State> {
  state = {
    isSideBarOpen: false,
    isMobile: false
  }
  
  child: any

  toggleDrawer = (isSideBarOpen) => () => {
    this.setState({isSideBarOpen: isSideBarOpen})
  }

  openSnackBar = (message: string) => {
    this.child._openSnackBar(message)
  }

  refetchMe = async () => {
    try {
      await this.props.me.refetch({v: Math.random()})
      await this.props.me.refetch({v: Math.random()})
    } catch (e) {
      throw e
    }
  }

  componentDidMount() {
    // console.log(this.isMobile())
    window.addEventListener('resize', this.resize)
    this.setState({
      isMobile: this.isMobile(),
    })
  }

  resize = () => {
    this.setState({
      isMobile: this.isMobile(),
    })
  }

  isMobile = () => window.innerWidth < 960 ? true : false

  render() {
    return (
      <React.Fragment>
        <AppContext.Provider
          value={{
            state: this.state,
            isMobile: this.state.isMobile,
            isSideBarOpen: this.state.isSideBarOpen,
            me: this.props.me.me,
            toggleDrawer: this.toggleDrawer,
            openSnackBar: this.openSnackBar,
            refetchMe: this.refetchMe
          }}>
          <SubApp />
          <SnackBarCustom ref={instance => { this.child = instance }}/>
        </AppContext.Provider>
      </React.Fragment>
    )
  }
}

export default compose(graphql(ME_QUERY_ROLE, {
  name: 'me',
  }))(App)
