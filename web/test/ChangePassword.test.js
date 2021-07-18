import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import "./setup"
import sinon from 'sinon'
import { ChangePassword } from '../src/view/ChangePassword'
import NotificationService from '../src/core/NotificationService'
import * as postUsers from '../src/api/users'

describe('<ChangePassword />', () => {
  let sandbox = null

  beforeEach(function () {
    sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render component', () => {
    const t = t => t
    const props = { t }
    const wrapper = shallow(<ChangePassword {...props} />)
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    expect(wrapper.find('p.h6').text()).to.equal('forgot-password-title')
    expect(wrapper.find('p').at(1).text()).to.equal('change-password')
  })

  it('should translate textkeys', () => {
    const t = t => t + '-translated'
    const props = { t }
    const wrapper = shallow(<ChangePassword {...props} />)
    expect(wrapper.find('p.h6').text()).to.equal('forgot-password-title-translated')
    expect(wrapper.find('p').at(1).text()).to.equal('change-password-translated')
  })

  it('should enable/disable button when passwords not match', () => {
    const t = t => t
    const props = { t }
    const wrapper = shallow(<ChangePassword {...props} />)
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    wrapper.instance().handlePassword({ target: { value: '1234' } })
    expect(wrapper.state().password).to.equal('1234')
    wrapper.instance().handleConfirmPassword({ target: { value: '1234' } })
    expect(wrapper.state().confirmPassword).to.equal('1234')
    expect(wrapper.find('Button').prop('disabled')).to.equal(false)
    wrapper.instance().handleConfirmPassword({ target: { value: '12345' } })
    expect(wrapper.state().confirmPassword).to.equal('12345')
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    expect(wrapper.find('Button').prop('onClick')).to.deep.equal(wrapper.instance().handleSubmit)
  })

  it('should handle error when new password failed', done => {
    const t = t => t
    const props = {
      t,
      match: {
        params: {
          language: sinon.spy()
        }
      }
    }
    sandbox.stub(postUsers, 'postUsers').returns(Promise.reject({}))
    const notificationStub = sandbox.stub(NotificationService, 'pushErrorNotification')
    const wrapper = shallow(<ChangePassword {...props} />)
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    wrapper.instance().handlePassword({ target: { value: '1234' } })
    expect(wrapper.state().password).to.equal('1234')
    wrapper.instance().handleConfirmPassword({ target: { value: '1234' } })
    expect(wrapper.state().confirmPassword).to.equal('1234')
    wrapper.instance().handleConfirmPassword({ target: { value: '12345' } })
    expect(wrapper.state().confirmPassword).to.equal('12345')
    wrapper.find('Button').simulate('click')
    setTimeout(() => {
      expect(notificationStub.calledOnce).to.equal(true)
      expect(notificationStub.getCall(0).args[0]).to.equal('password-not-changed')
      done()
    })
  })

  it('should handle success when changing new password', done => {
    const t = t => t
    const props = {
      t,
      history: { push: sandbox.spy() },
      match: {
        params: {
          language: sinon.spy()
        }
      }
    }
    sandbox.stub(postUsers, 'postUsers').returns(Promise.resolve({}))
    const wrapper = shallow(<ChangePassword {...props} />)
    expect(wrapper.find('Button').prop('disabled')).to.equal(true)
    wrapper.instance().handlePassword({ target: { value: '1234' } })
    expect(wrapper.state().password).to.equal('1234')
    wrapper.instance().handleConfirmPassword({ target: { value: '1234' } })
    expect(wrapper.state().confirmPassword).to.equal('1234')
    wrapper.instance().handleConfirmPassword({ target: { value: '12345' } })
    expect(wrapper.state().confirmPassword).to.equal('12345')
    wrapper.find('Button').simulate('click')
    setTimeout(() => {
      expect(props.history.push.calledOnce).to.equal(true)
      expect(props.history.push.getCall(0).args[0]).to.equal('/spy/success-changed')
      done()
    })
  })
})
