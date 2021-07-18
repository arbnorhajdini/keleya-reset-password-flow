import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { SuccessChanged } from '../src/view/SuccessChanged'
import Logo from '../src/assets/images/keleya-logo.png'

describe('<SuccessChanged />', () => {
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
    const wrapper = shallow(<SuccessChanged {...props} />)
    expect(wrapper.find('p.h5').text()).to.equal('success')
    expect(wrapper.find('p').at(1).text()).to.equal('changed-password-success')
    expect(wrapper.find('img').prop('src')).to.equal(Logo)
  })
})