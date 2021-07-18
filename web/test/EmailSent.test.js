import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { EmailSent } from '../src/view/EmailSent'
import Logo from '../src/assets/images/keleya-logo.png'

describe('<EmailSent />', () => {
  const t = t => t
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    const props = {
      t,
      history: {}
    }
    const wrapper = shallow(<EmailSent {...props} />)
    expect(wrapper.find('p.h6').text()).to.equal('email-sent-title')
    expect(wrapper.find('p').at(1).text()).to.equal('email-sent-copy')
    expect(wrapper.find('img').prop('src')).to.equal(Logo)
  })

  it('should render an anchor tag', () => {
    const props = {
      t,
      history: {
        goBack: sinon.spy()
      }
    }
    const wrapper = shallow(<EmailSent {...props} />)
    wrapper.find('StyledIcon').simulate('click')
    expect(props.history.goBack.calledOnce).to.equal(true)
  })
})