import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { App } from '../src/App'
import i18n from './i18nTestConfig'

describe('<App />', () => {
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    const props = { i18n }
    const wrapper = shallow(<App {...props} />)
    expect(wrapper.find('Route')).to.have.length(4)
    expect(wrapper.find('Route').at(0).prop('path')).to.equal('/:language')
    expect(wrapper.find('Route').at(1).prop('path')).to.equal('/:language/email-sent')
    expect(wrapper.find('Route').at(2).prop('path')).to.equal('/:language/change-password')
    expect(wrapper.find('Route').at(3).prop('path')).to.equal('/:language/success-changed')
  })

  it('should call i18n change language', () => {
    const props = {
      i18n: {
        changeLanguage: sinon.spy()
      }
    }
    shallow(<App {...props}/>)
    expect(props.i18n.changeLanguage.calledOnce).to.equal(true)
  })
})