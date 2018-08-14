// @flow
import React from 'react'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import './Footer.css'

type Props = {}
type State = {}

class Footer extends React.Component<Props, State> {
  render() {
    return (
      <div className='grey contentFooter'>
        <Grid container >
          <Grid item xs={12} sm={6}>
            <h3 className='white fontWeight12 textSize11 margin2'>About</h3>
            <ul className='ulFooter'>
              <li className='margin2'>
                <Link className='cursor textTransparencyWhite2' to='/page/about'>
                  About NachoNacho
                </Link>
              </li>
              <li className='margin2'>
                <Link className='cursor textTransparencyWhite2' to='/page/howItWorks'>
                  How it works
                </Link>
              </li>
              <li className='margin2'>
                <Link className='cursor textTransparencyWhite2' to='/page/FAQ'>
                  FAQs
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3 className='white fontWeight12 textSize11 margin2'>Help</h3>
            <ul className='ulFooter'>
              <li className='margin2'>
                <Link className='cursor textTransparencyWhite2' to='/page/contact'>
                  Contact Us
                </Link>
              </li>
              <li className='margin2'>
                <Link className='cursor textTransparencyWhite2' to='/page/terms'>
                  Terms of Use
                </Link>
              </li>
              <li className='margin2'>
                <Link className='cursor textTransparencyWhite2' to='/page/privacy'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} >
            <Divider />
            <p className='textSize8 textTransparencyWhite2'>© 2018, NachoNacho</p>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Footer)
