import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Signup from '../user/auth/Signup'
import LoginPage from '../user/auth/LoginPage'

configure({ adapter: new Adapter() })

it('Signup', () => {
  const wrapper = shallow(
    <Signup/>
  )
  expect(wrapper).toMatchSnapshot()
})

it('Login', () => {
  const wrapper = shallow(
    <LoginPage/>
  )
  expect(wrapper).toMatchSnapshot()
})

it('renders a email input', () => {
  const wrapper = shallow(<LoginPage />)
  expect(wrapper.find('#email').length).toEqual(1)
})

it('email input', () => {
  const wrapper = shallow(<LoginPage />)
  wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}})
  expect(wrapper.state('email')).toEqual('blah@gmail.com')
})

describe('Password input', () => {
  it('should respond to change event and change the state of the Login Component', () => {
    const wrapper = shallow(<LoginPage />)
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}})
    expect(wrapper.state('password')).toEqual('cats')
  })
})
